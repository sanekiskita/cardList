<script setup lang="ts">
  import { ref, watch, type Ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  import cardList from '../components/CardList.vue';

  const curRoute = useRoute();
  const router = useRouter();

  const type: Ref<string|'todos'|'quotes'> = ref(String(curRoute.name));
  const selectedPage = ref(+curRoute.params?.page || 1);

  watch(selectedPage, (newVal) => {
    router.push({params: {page: `${newVal}`}});
  });

  watch(curRoute, () => {
    type.value = String(curRoute.name);
    selectedPage.value = +curRoute.params?.page || 1;
  });
</script>

<template>
  <main class="source">
    <card-list
      v-if="type === 'todos' || type === 'quotes'"
      class="source__content"
      :type="type"
      v-model="selectedPage"
    />
  </main>
</template>

<style scoped lang="css">
    .source {
      display: flex;
      flex-direction: column;
    }

    .source__content {
      flex: 1;
    }
</style>