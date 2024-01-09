import { defineStore } from 'pinia'
import { getAllDiagramme } from '@/services/diagramme.service'

import { ref } from 'vue'

export const useDiagrammeStore = defineStore('diagramme', () => {
    const diagramme = ref([])
    const diagrammeModel = ref([])

    async function getDiagramme() {
        diagramme.value = await getAllDiagramme()
    }

    function initDiagrammeModel(model) {
        diagrammeModel.value = model
    }

    return { diagramme, diagrammeModel, getDiagramme, initDiagrammeModel}
})