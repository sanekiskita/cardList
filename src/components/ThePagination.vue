<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';

    const {maxPage, modelValue: selectedPage, countViewPageXs = 0, countViewPageS = 1, countViewPageM = 3 } = defineProps<{
        maxPage: number,
        modelValue: number,
        countViewPageXs?: number,
        countViewPageS?: number,
        countViewPageM?: number,
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: number): void
    }>()

    const FIRST_CHAR = '<<';
    const LEFT_CHAR = '<';
    const LAST_CHAR = '>>'
    const RIGHT_CHAR = '>';

    const viewPage = ref(0);
    const setCountViewPage = () => {
        if (window.innerWidth <= 500) {
            viewPage.value = countViewPageXs;
            return;
        }

        viewPage.value = window.innerWidth > 900 ? countViewPageM : countViewPageS
    }

    setCountViewPage();

    onMounted(() => {
      window.addEventListener('resize', setCountViewPage);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', setCountViewPage);
    })


    const viewPageList = computed(() => {

        if (selectedPage === 1) {
            return Array.from({ length: viewPage.value || 1 })
                .fill(null)
                .map((elm, index) => index + 1);
        }

        const view = {
            max: (() => {
                const max = selectedPage + viewPage.value;

                return max >= maxPage ? maxPage : max;
            })(),
            min: (() => {
                const min = Math.min(maxPage, selectedPage - viewPage.value) - 1;

                return min >= 0 ? min : 0;
            })(),
        }

        const count = (view.max - view.min) || 1;

        return Array.from({ length: count })
            .fill(null)
            .map((elm, index) => view.min + index + 1);
    });
    
    
</script>

<template>
    <nav class="pagination">
        <div v-if="selectedPage > 1"
            class="page"
            @click="emit('update:modelValue', 1)"
        >
            {{FIRST_CHAR}}
        </div>
        <div v-if="selectedPage - 1 >= 1"
            class="page"
            @click="emit('update:modelValue', selectedPage - 1)"
        >
            {{LEFT_CHAR}}
        </div>
        <div v-for="page in viewPageList"
            :key="page"
            :class="{
                page: true,
                _selected: selectedPage === page
            }"

            @click="emit('update:modelValue', page)"
        >
            {{page}}
        </div>
        <div v-if="selectedPage + 1 <= maxPage"
            class="page"
            @click="emit('update:modelValue', selectedPage + 1)"
        >
            {{RIGHT_CHAR}}
        </div>
        <div v-if="selectedPage < maxPage"
            class="page"
            @click="emit('update:modelValue', maxPage)"
        >
            {{LAST_CHAR}}
        </div>
    </nav>
</template>

<style scoped lang="css">
    .pagination {
        display: flex;
        gap: var(--gap-elements);
        justify-content: space-between;
        max-width: 80%;
        margin: 0 auto;
    }

    .page {
        cursor: pointer;
        text-align: center;
        border-radius: 15px;
        border: solid thin var(--bg-dop);
        background-color: var(--bg-dop);
        padding: 0.2em 0.8em;
        box-shadow: 5px 5px 5px var(--bg-dark);
        transition: all 0.3s ease;
        min-width: 4em;
    }

    @media (max-width: 800px) {
        .page {
            min-width: 3em;
        }
    }

    .page._selected {
        background-color: var(--bg-accent);
        border-color: var(--bg-accent);
    }

    .page:hover {
        background-color: var(--bg-hover);
        border-color: var(--bg-hover);
        transform: translateY(-2px) translateX(-2px);
        box-shadow: 10px 10px 10px var(--bg-dark);
    }

</style>