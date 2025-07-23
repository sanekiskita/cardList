<script setup lang="ts">
    import pageList from './ThePagination.vue';

    const {maxPage, modelValue: selectedPage, } = defineProps<{
        maxPage: number,
        modelValue: number,
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: number): void
    }>()
</script>

<template>
    <div class="card_list">
        <div class="card_list_pagination" >
            <page-list
                :max-page="maxPage"
                :modelValue="selectedPage"
                @update:model-value="emit('update:modelValue', $event)"
            />
        </div>
        <div class="card_list__content">
            <slot></slot>
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