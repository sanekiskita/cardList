<script setup lang="ts">
    import { ref, watch } from 'vue';

    const selectedTheme = ref('light');

    watch(selectedTheme, (newEl) => {
        document.documentElement.setAttribute('main-theme', newEl);
    });
</script>

<template>
    <select id="theme" v-model="selectedTheme">
        <option value="light">Светалая тема</option>
        <option value="dark">Темная тема</option>
    </select>
</template>