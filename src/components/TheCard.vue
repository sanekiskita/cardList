
<template>
    <div class="card">
        <div class="card__header">
            <slot name="header"></slot>
        </div>
        <div class="card__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped>
    .card {
      border-radius: 20px;
      padding: 1em 0.5em;
      border-color: var(--bg-revert);
      background-color: var(--bg-dop);
      box-shadow: 5px 5px 5px var(--bg-dark);
      transition: all 0.3s ease;
      transform: translateY(0);
    }

    .card:hover {
      transform: translateY(-2px) translateX(-2px);
      border-color: var(--bg-hover);
      box-shadow: 10px 10px 10px var(--bg-dark);
    }
</style>