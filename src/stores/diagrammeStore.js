import { defineStore } from 'pinia'
// import { getAllDiagramme } from '@/services/diagramme.service'

import { ref } from 'vue'

export const useDiagrammeStore = defineStore('diagramme', () => {
    const diagramme = ref([
        { "id": 1, "couleur": "#4CAF50", "tailleBulle": 20, "formeParent": "diamond", "formeEnfant": "circle", "fontFamily": "sans-serif", "fontSize": 20},
        {"id":2,"couleur":"#000080","tailleBulle":20,"formeParent":"triangle","formeEnfant":"rect","fontFamily":"sans-serif","fontSize":200},
        {"id":3,"couleur":"#F44335","tailleBulle":20,"formeParent":"arrow","formeEnfant":"roundRect","fontFamily":"sans-serif","fontSize":20}
    ])
    const diagrammeModel = ref([])

    async function getDiagramme() {
        return diagramme
    }

    function initDiagrammeModel(model) {
        diagrammeModel.value = model
    }

    return { diagramme, diagrammeModel, getDiagramme, initDiagrammeModel }
})