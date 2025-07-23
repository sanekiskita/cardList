<script setup lang="ts">
    import TheCard from './TheCard.vue';
    import type { Todo } from '../interface/ITodos';

    const { card } = defineProps<{
        card: Todo,
    }>();
</script>

<template>
    <TheCard class="card_todo"
        :class="{
            __completed: card.completed,
        }"
    >
        <template #header>
            <h3>Задача {{card.id}}</h3>
            <p>Пользователь: {{card.userId}}</p>
            <p>Статус: {{card.completed ? 'Завершена' : 'В процессе'}}</p>
        </template>
        <template #content>
            <p>{{card.todo}}</p>
            
        </template>
    </TheCard>
</template>

<style scoped lang="css">
    .card_todo {
        border: solid thin;
    }

    .card_todo.__completed {
        background-color: var(--bg-completed);
    }
</style>