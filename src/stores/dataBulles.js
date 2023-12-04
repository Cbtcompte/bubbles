import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
  const dataBulle = ref({})
  const getDataBulle = computed(() => { 
    return dataBulle.value
  })
  function modificationData(value) {
    dataBulle.value = value
  }

  return { dataBulle, getDataBulle, modificationData }
})
