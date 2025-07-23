<script setup lang="ts">
    import type { Todo } from '../interface/ITodos';

    const { card } = defineProps<{
        card: Todo,
    }>();
</script>

<template>
    <div class="card_todo"
        :class="{
            __completed: card.completed
        }"
    >
        <div class="card_todo__header">
            <h3>Задача {{card.id}}</h3>
            <p>Пользователь: {{card.userId}}</p>
            <p>Статус: {{card.completed ? 'Завершена' : 'В процессе'}}</p>
        </div>
        <div class="card_todo__content">
            <p>{{card.todo}}</p>
            
        </div>
    </div>
</template>

<style scoped lang="css">
    .card_todo {
        border: solid thin;
    }

    .card_todo.__completed {
        background-color: var(--bg-completed);
    }
</style>