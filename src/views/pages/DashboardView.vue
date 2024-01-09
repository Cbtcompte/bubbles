<script setup>
// import {usetoast2cbt} from 'primevue/usetoast2cbt';
import { ref, onMounted } from 'vue'

import { useDiagrammeStore } from '@/stores/diagrammeStore';
import ModelDiagramme from '@/components/tools/ModelDiagramme.vue';
import ModalFile from '@/views/partials/Modals/ModalFile.vue';

import { dataGraphHome } from '@/helpers/dataGraphHelper';
import { initGraphWithoutEvent } from '@/helpers/graphHelper'
import { edgesHome } from '@/helpers/edgesGraphHelper'
import { data } from '@/helpers/dataHelper';
//import UploadFile from '@/components/tools/UploaddFile.vue'


const modalTitle = ref()
const labelButton = ref()
const modelName = ref("")
const model_1 = ref(false)
const model_2 = ref(false)
const model_3 = ref(false)
const diagrammeStore = useDiagrammeStore()
const modelChoice = ref(null);

const openModal = (modalTitre, labelText) => {
  modalTitle.value = modalTitre
  // eslint-disable-next-line no-undef
  $('#modalFile').modal('show')
  labelButton.value = labelText
}

const modelSelect1 = (data) => {
  modelChoice.value = (!model_1.value) ? data : null
  modelName.value = "Diagramme 1"
  model_1.value = !model_1.value
  model_2.value = false
  model_3.value = false
}

const modelSelect2 = (data) => {
  modelChoice.value = (!model_2.value) ? data : null
  modelName.value = "Diagramme 2"
  model_1.value = false
  model_2.value = !model_2.value
  model_3.value = false
}

const modelSelect3 = (data) => {
  modelChoice.value = (!model_3.value) ? data : null
  modelName.value = "Diagramme 3"
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
  <div class="row">
    <div class="col-12" style="text-align: center;">
      <h6 class="alert alert-info opacity-6">
        <div class="my-3" style="color: black;">
          <i class="fa fa-info-circle"></i> Assurez-vous que la structure de votre fichier respecte la structure recommandé. Pour ce fait : 
          <ul style="list-style-type:none;">
            <li>
                - Soit vous créez le fichier à partir de notre logiciel en vous rendant <router-link class="text-color" :to="{name : 'json'}">ici</router-link>.
            </li>
            <li>
                - Soit vous téléchargez le modèle de fichier JSON à suivre. <a href="../../../public/example.json" download="example.json" class="text-color" :to="{name : 'json'}">Télécharger</a>
            </li>
          </ul>
        </div>
      </h6>
    </div>
  </div>
  <h4>Modèles de diagrammes</h4>
  <p class="">Vous avez la possibilité de sélectionner un modèle de diagramme parmi ceux que nous vous proposons</p>
  <div class="row mt-4">
    <model-diagramme class="cursor-pointer" @select-diagramme="modelSelect1(diagrammeStore.diagramme[0])" :model="model_1" :dataGlobal="diagrammeStore.diagramme[0]" idDiagramme="idDiagramme_1" background-class="bg-gradient-primary shadow-primary" title="Diagramme 1"
      subtitle="Ce modèle vous propose de mettre les données enfants dans une bulle circulaire. Tandis que les données parents sont dans une bulle de forme losange. Aussi la couleur globale ici est le vert. "></model-diagramme>
    <model-diagramme class="cursor-pointer" @select-diagramme="modelSelect2(diagrammeStore.diagramme[1])" :model="model_2" :dataGlobal="diagrammeStore.diagramme[1]" idDiagramme="idDiagramme_2" background-class="bg-gradient-success shadow-success" title="Diagramme 2"
      subtitle='Ce modèle vous propose de mettre les données enfants dans une bulle rectangulaire. Tandis que les données parents sont dans une bulle de forme triangulaire. Aussi la couleur globale ici est le bleu. '></model-diagramme>
    <model-diagramme class="cursor-pointer" @select-diagramme="modelSelect3(diagrammeStore.diagramme[2])" :model="model_3" :dataGlobal="diagrammeStore.diagramme[2]" idDiagramme="idDiagramme_3" background-class="bg-gradient-dark shadow-dark" title="Diagramme 3"
      subtitle="Ce modèle vous propose de mettre les données enfants dans une bulle rectangulaire avec des bords arrondis. Tandis que les données parents sont représentées par une flèche. Aussi la couleur globale ici est le rouge. "></model-diagramme>
  </div>
  
  <div class="row mt-4">
    <div class="col-12" style="text-align: center;">
      <button class="btn btn-sm btn-primary" @click="openModal('Charger un fichier', 'Importer le fichier')">
        <i class="fas fa-file-alt" style="font-size: 15px;"></i>
        Charger votre fichier json
      </button>
    </div>
  </div>

  <modal-file :model-name="modelName" :modelSelected="modelChoice" id-modal="modalFile" modeToCall="dashboard" label-button="Importer le fichier" modal-title="Charger un fichier"></modal-file>

</template>
