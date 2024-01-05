<script setup>
// import {usetoast2cbt} from 'primevue/usetoast2cbt';
import { ref, onMounted } from 'vue'

import { useDiagrammeStore } from '@/stores/diagrammeStore';
import LateralePage from '@/views/partials/LateralePage.vue'
import ModelDiagramme from '@/components/tools/ModelDiagramme.vue';
import ModalFile from '@/views/partials/Modals/ModalFile.vue';

import { dataGraphHome } from '@/assets/helpers/dataGraphHelper';
import { initGraphWithoutEvent } from '@/assets/helpers/graphHelper'
import { edgesHome } from '@/assets/helpers/edgesGraphHelper'
import { data } from '@/assets/helpers/dataHelper';
//import UploadFile from '@/components/tools/UploaddFile.vue'


const modalTitle = ref()
const labelButton = ref()
const model_1 = ref(false)
const model_2 = ref(false)
const model_3 = ref(false)
const diagrammeStore = useDiagrammeStore()
const modelChoice = ref();

const openModal = (modalTitre, labelText) => {
  modalTitle.value = modalTitre
  // eslint-disable-next-line no-undef
  $('#modalFile').modal('show')
  labelButton.value = labelText
}

const modelSelect1 = (data) => {
  modelChoice.value = (!model_1.value) ? data : []
  model_1.value = !model_1.value
  model_2.value = false
  model_3.value = false
}

const modelSelect2 = (data) => {
  modelChoice.value = (!model_2.value) ? data : []
  model_1.value = false
  model_2.value = !model_2.value
  model_3.value = false
}

const modelSelect3 = (data) => {
  modelChoice.value = (!model_3.value) ? data : []
  model_1.value = false
  model_2.value = false
  model_3.value = !model_3.value
}

onMounted(async () => {
  await diagrammeStore.getDiagramme()
  const dataValue = data
  const dataGraph = dataGraphHome(diagrammeStore.diagramme, dataValue)
  const edges = edgesHome(dataGraph)
  dataGraph.forEach((item, key) => {
      let id = "idDiagramme_"+(key+1)
      initGraphWithoutEvent(id, item, edges[key], diagrammeStore.diagramme[key].couleur)
  });
})

</script>

<template>
  <h4>Modèles de diagrammes</h4>
  <p class="">Vous avez la possibilité de sélectionner un modèle de diagramme parmi ceux que nous vous proposons</p>
  <div class="row mt-4">
    <model-diagramme class="cursor-pointer" @select-diagramme="modelSelect1(diagrammeStore.diagramme[0])" :model="model_1" :dataGlobal="diagrammeStore.diagramme[0]" idDiagramme="idDiagramme_1" background-class="bg-gradient-primary shadow-primary" title="Diagramme 1"
      subtitle="Ce modèle vous propose de mettre les données enfants dans une bulle circulaire. Tandis que les données parents sont dans une bulle de forme losange. Aussi la couleur global ici est le vert. "></model-diagramme>
    <model-diagramme class="cursor-pointer" @select-diagramme="modelSelect2(diagrammeStore.diagramme[1])" :model="model_2" :dataGlobal="diagrammeStore.diagramme[1]" idDiagramme="idDiagramme_2" background-class="bg-gradient-success shadow-success" title="Diagramme 2"
      subtitle='Ce modèle vous propose de mettre les données enfants dans une bulle rectangulaire. Tandis que les données parents sont dans une bulle de forme triangulaire. Aussi la couleur global ici est le bleu. '></model-diagramme>
    <model-diagramme class="cursor-pointer" @select-diagramme="modelSelect3(diagrammeStore.diagramme[2])" :model="model_3" :dataGlobal="diagrammeStore.diagramme[2]" idDiagramme="idDiagramme_3" background-class="bg-gradient-dark shadow-dark" title="Diagramme 3"
      subtitle="Ce modèle vous propose de mettre les données enfants dans une bulle rectangulaire avec des bords arrondis. Tandis que les données parents sont représentées par une flèche. Aussi la couleur global ici est le rouge. "></model-diagramme>
  </div>
  
  <div class="row mt-4">
    <div class="col-lg-4"></div>
    <div class="justify-content-center col-lg-4">
      <button class="btn btn-sm btn-primary" @click="openModal('Charger un fichier', 'Importer le fichier')">
        <i class="fas fa-file-alt" style="font-size: 15px;"></i>
        Charger votre fichier json
      </button>
    </div>
  </div>

  <modal-file id-modal="modalFile" modeToCall="dashboard" label-button="Importer le fichier" modal-title="Charger un fichier"></modal-file>

<laterale-page></laterale-page></template>
