<script setup lang="ts">
  import { ref, onMounted, watch, computed, defineAsyncComponent, type Ref, type Component } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  import type { responseQuotes, Quote } from '../interface/IQuotes';
  import type { responseTodos,  Todo} from '../interface/ITodos';

  import api from '../services/api';
  import config from '../configs/config';
  import loadStore from '../stores/load'

  import cardList from '../components/CardList.vue';

  const CardTodo = defineAsyncComponent(() =>
    import('../components/CardTodo.vue')
  )
  const CardQuote = defineAsyncComponent(() =>
    import('../components/CardQuote.vue')
  )

  const curRoute = useRoute();
  const router = useRouter();
  const load = loadStore();

  const type: Ref<string|'todos'|'quotes'> = ref('todos');
  const total = ref(0);
  const maxPage = ref(1);
  const selectedPage = ref(1);
  const source: Ref<null|responseTodos|responseQuotes> = ref(null);

  const setSourse = async () => {
    const { CARD_LIMIT } = config

    load.loadStart();
    try {
      source.value = await api.get(type.value, selectedPage.value);
    } catch (errorCode) {
      alert(errorCode);
      return;
    }
    total.value = source.value.total;
    maxPage.value = CARD_LIMIT > 0
        ? Math.ceil(total.value / CARD_LIMIT)
        : 1;
    load.loadStop();
  };

  watch(type, () => {
    selectedPage.value = +curRoute.params?.page || 1;
    source.value = null;
    setSourse();
  });

  watch(selectedPage, (newVal) => {
    setSourse();
    router.push({params: {page: `${newVal}`}});
  });

  watch(curRoute, () => {
    type.value = String(curRoute.name);
  });

  onMounted(() => {
    type.value = String(curRoute.name);
    
    setSourse().then(() => {
      selectedPage.value = +(+curRoute.params?.page > +maxPage.value ? maxPage.value : (curRoute.params?.page || 1))
    });
  });

  const sourceElements = computed(() => {
    if (source.value === null) {
      return {};
    }

    if (type.value === 'todos' && type.value in source.value) {
      return {
        comp: CardTodo as Component<{ card: Todo }>,
        items: source.value.todos
      };
    }

    if (type.value === 'quotes' && 'quotes' in source.value) {
      return {
        comp: CardQuote as Component<{ card: Quote }>,
        items: source.value.quotes
      };
    }

    return {};
  });
</script>

<template>
  <main v-if="source" class="source">
    <p>Записей всего: {{total}}</p>
    <card-list class="source__content" :max-page="maxPage" v-model="selectedPage">
      <template v-if="sourceElements.items?.length">
        <component v-for="card in sourceElements.items"
          class="card"
          :is="sourceElements.comp"
          :key="card.id"
          :card="card"
        />
      </template>
      <div v-else
        class="__empty"
      >
        нет записей на текущей странице
      </div>
    </card-list>
  </main>
</template>

<style scoped lang="css">
    .source {
      display: flex;
      flex-direction: column;
    }

    .source > *:not(:last-child) {
      margin-bottom: var(--gap-elements-block);
    }

    .source__content {
      flex: 1;
    }

    .__empty {
      grid-column: 1 / -1;
      text-align: center;
    }
</style>