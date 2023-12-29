import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('bulles', () => {
  const dataBulle = ref([])

  const getDataBulle = computed(() => dataBulle.value)

  function addDataStore(val){
    let arrayData = [...dataBulle.value, val]
    dataBulle.value = arrayData
  }

  function initData(value){
    dataBulle.value = value
  }

  function updateFormData(id) {
    // let copie = [...dataBulle.value]
    dataBulle.value.map((item) => {
        if(item.id == id){
          item.forme = "diamond"
        }
    })

    // dataBulle.value = copie
  }

  return {dataBulle, getDataBulle, addDataStore, initData, updateFormData}
})
