<script setup lang="ts">
    import type { Quote } from '../interface/IQuotes';

    const { card } = defineProps<{
        card: Quote,
    }>();
</script>

<template>
    <div class="card_qoute">
        <div class="card_qoute__header">
            <h3>Цитата {{card.id}}</h3>
            <p>Автор: {{card.author}}</p>
        </div>
        <div class="card_qoute__content">
            <p>{{card.quote}}</p>
        </div>
    </div>
</template>

<style scoped lang="css">
    .card_qoute {
        border: thick double;
    }
</style>