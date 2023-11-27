<script setup>
import LateralePage from '@/views/partials/LateralePage.vue'
import ModelDiagramme from '../../components/tools/ModelDiagramme.vue';
import ModalView from '@/components/tools/ModalView.vue';
import { ref } from 'vue'

const modalTitle = ref()

const openModal = (modalTitre) => {
  modalTitle.value = modalTitre
  // eslint-disable-next-line no-undef
  $('#exampleModalLong').modal('show')
}
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

  <div class="row mt-4 center">
    <div class="">
      <button class="btn  btn-primary" @click="openModal('Charger un fichier')">
        Charger votre fichier json
      </button>
    </div>
  </div>
  
  <modal-view tailleModalDialog="modal-lg" :modal-title="modalTitle">
    <template v-slot:body>
      <div class="row">
        <div class="col-lg-4">
          <button class="btn btn-sm btn-icon btn-info">
            <i class="fas fa-file"></i>
            Charger le fichier
          </button>
        </div>
      </div>
    </template>
</modal-view>
<laterale-page></laterale-page></template>