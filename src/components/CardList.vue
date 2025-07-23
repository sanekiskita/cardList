<script setup lang="ts">
    import { ref, onMounted, watch, computed, defineAsyncComponent, type Ref, type Component } from 'vue';

    import type { responseQuotes, Quote } from '../interface/IQuotes';
    import type { responseTodos,  Todo} from '../interface/ITodos';

    import ApiDummyjson from '../services/ApiDummyjson';
    import config from '../configs/config';
    import loadStore from '../stores/load'

    import pageList from './ThePagination.vue';

    const CardTodo = defineAsyncComponent(() =>
        import('../components/CardTodo.vue')
    );
    const CardQuote = defineAsyncComponent(() =>
        import('../components/CardQuote.vue')
    );

    const {type, modelValue: selectedPage, } = defineProps<{
        type: 'todos'|'quotes',
        modelValue: number,
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: number): void,
    }>();

    const load = loadStore();

    const total = ref(0);
    const maxPage = ref(1);
    const source: Ref<null|responseTodos|responseQuotes> = ref(null);

    const Api = new ApiDummyjson();

    const setCardInfo = async () => {
        const { CARD_LIMIT } = config

        load.loadStart();

        try {
            source.value = await Api.get(ApiDummyjson.getUrlForGet(type, selectedPage));
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

    watch(() => type, () => {
        source.value = null;
        setCardInfo();
    });

    watch(() => selectedPage, () => {
        source.value = null;
        setCardInfo();
    });

    onMounted(() => {
        setCardInfo();
    });

    const cardElements = computed(() => {
        if (source.value === null) {
            return {};
        }

        if (type === 'todos' && type in source.value) {
            return {
                comp: CardTodo as Component<{ card: Todo }>,
                items: source.value.todos
            };
        }

        if (type === 'quotes' && type in source.value) {
            return {
                comp: CardQuote as Component<{ card: Quote }>,
                items: source.value.quotes
            };
        }

        return {};
    });
</script>

<template>
    <div class="card_list">
        <p>Записей всего: {{total}}</p>
        <div class="card_list_pagination" >
            <page-list
                :max-page="maxPage"
                :modelValue="selectedPage"
                @update:model-value="emit('update:modelValue', $event)"
            />
        </div>
        <div class="card_list__content">
            <template v-if="cardElements.items?.length">
                <component v-for="card in cardElements.items"
                    class="card"
                    :is="cardElements.comp"
                    :key="card.id"
                    :card="card"
                />
            </template>
            <div v-else
                class="__empty"
            >
                {{cardElements.items ? 'нет записей на текущей странице' : 'обновление...'}}
            </div>
        </div>
        <div class="card_list_pagination">
            <page-list
                :max-page="maxPage"
                :modelValue="selectedPage"
                @update:model-value="emit('update:modelValue', $event)"
            />
        </div>
    </div>
</template>

<style scoped lang="css">
    .card_list {
        display: flex;
        flex-direction: column;
        gap: var(--gap-elements-block);
    }

    .card_list__content {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--gap-elements-block);
    }

    .__empty {
      grid-column: 1 / -1;
      text-align: center;
    }

    @media (max-width: 900px) {
        .card_list__content {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 500px) {
        .card_list__content {
            grid-template-columns: 1fr;
        }
    }
</style>