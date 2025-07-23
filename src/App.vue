<script setup lang="ts">
  import { watch } from 'vue';
  import { RouterView } from 'vue-router'
  import SourceSelected from './components/SourceSelected.vue';
  import ThemeSelected from './components/ThemeSelected.vue';
  import loadStore from './stores/load';

  const load = loadStore();

  watch(load, ({load}) => {
    const container = document.querySelector('body');

    if (!container) {
      return;
    }

    if (!load) {
      container.classList.remove('__background');
      return;
    }

    container.classList.add('__background');
  })

</script>

<template>
  <header>
    <div class="wrapper">
      <div class="wrapper_left">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="20" height="20" />
      </div>
      <div class="wrapper_center">
        <div>
          <Source-selected/>
        </div>
      </div>
      <div class="wrapper_right">
          <Theme-selected/>
      </div>
    </div>
  </header>

  <router-view/>

  <div v-if="load.load" class="loader">
    <div class="loader__content">
      ↻
    </div>
  </div>
</template>

<style scoped>
  header {
    line-height: 1.5;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1em;
  }

  .wrapper  > * {
    text-align: center;
  }

  .loader {
    background-color: var(--bg-dark);
    position: fixed;
    width: 100dvw;
    height: 100dvh;
    left: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .loader .loader__content {
    position: absolute;
    font-size: 15em;
    top: 50%;
    right: 50%;
    animation: spin 2s linear infinite;
  }

  @media (max-width: 500px) {
    .wrapper {
      flex-direction: column;
      align-items: center;
    }
  }

  @keyframes spin {
      0% { transform: translate(50%, -50%) rotate(0deg); }
      100% { transform: translate(50%, -50%) rotate(360deg); }
  }
</style>
