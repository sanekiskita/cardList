<script setup lang="ts">
    import { useRouter, useRoute } from 'vue-router'
    import { ref, watch } from 'vue';

    const route = useRoute();
    const router = useRouter();
    const selectedSource = ref('home');

    watch(route, () => {
        selectedSource.value = String(route.name);
    });

    watch(selectedSource, (newEl: string ) => {
        router.push({name: newEl, params: {page: route.params.page || 1}});
    });
</script>

<template>
    <label for="resource">Источник: </label>
    <select id="resource" v-model="selectedSource">
        <option value="home">---</option>
        <option value="quotes">Цитаты</option>
        <option value="todos">Задачи</option>
    </select>
</template>