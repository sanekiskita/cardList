import { ref } from 'vue';
import { defineStore } from 'pinia';

const useCounterStore = defineStore('load', () => {
  const load = ref(false);
  
  function loadStart() {
    load.value = true;
  }

  function loadStop() {
    load.value = false;
  }

  return { load, loadStart, loadStop };
})

export default useCounterStore;
