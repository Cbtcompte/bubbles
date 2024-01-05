import { defineStore } from 'pinia'
import { getAllDiagramme } from '@/services/diagramme.service'

import { ref } from 'vue'

export const useDiagrammeStore = defineStore('diagramme', () => {
    const diagramme = ref([])

    async function getDiagramme() {
        diagramme.value = await getAllDiagramme()
    }

    return { diagramme, getDiagramme}
})