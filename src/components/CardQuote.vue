<script setup lang="ts">
    import TheCard from './TheCard.vue';
    import type { Quote } from '../interface/IQuotes';

    const { card } = defineProps<{
        card: Quote,
    }>();
</script>

<template>
    <TheCard class="card_qoute">
        <template #header>
            <h3>Цитата {{card.id}}</h3>
            <p>Автор: {{card.author}}</p>
        </template>
        <template #content>
            <p>{{card.quote}}</p>
        </template>
    </TheCard>
</template>