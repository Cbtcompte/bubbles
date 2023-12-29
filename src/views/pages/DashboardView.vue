<script setup>
// import {useToast} from 'primevue/usetoast';
import { ref } from 'vue'

import LateralePage from '@/views/partials/LateralePage.vue'
import ModelDiagramme from '@/components/tools/ModelDiagramme.vue';
import ModalFile from '@/views/partials/ModalFile.vue';
//import UploadFile from '@/components/tools/UploaddFile.vue'


const modalTitle = ref()
const labelButton = ref()


const openModal = (modalTitre, labelText) => {
  modalTitle.value = modalTitre
  // eslint-disable-next-line no-undef
  $('#modalFile').modal('show')
  labelButton.value = labelText
}

// const toast = useToast();
// const onUpload = () => {
//     toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 100 });
// };



</script>

<template>
  <h4>Modèles de diagrammes</h4>
  <div class="row mt-4">
    <model-diagramme background-class="bg-gradient-primary shadow-primary" title="Diagramme 1"
      subtitle="Présentation"></model-diagramme>
    <model-diagramme background-class="bg-gradient-success shadow-success" title="Diagramme 2"
      subtitle="Présentation"></model-diagramme>
    <model-diagramme background-class="bg-gradient-dark shadow-dark" title="Diagramme 3"
      subtitle="Présentation"></model-diagramme>
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
