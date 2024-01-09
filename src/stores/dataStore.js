import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('bulles', () => {
  const dataBulle = ref([])

  function addDataStore(val){
    dataBulle.value.push(val)

    return dataBulle.value
  }

  async function initData(value){
     dataBulle.value = value
  }

  function updateFormeBulle(id, color) {
    let copie = [...dataBulle.value]
    copie.map((item) => {
        if(item.id == id){
          item.forme = "diamond"
          item.couleur = color
        }
    })
  
    dataBulle.value = copie

    return dataBulle.value
  }

  return {dataBulle, addDataStore, initData, updateFormeBulle}
})
