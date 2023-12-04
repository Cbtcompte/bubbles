<script setup>
// import {useToast} from 'primevue/usetoast';
import { XlsxRead, XlsxJson } from 'vue3-xlsx/dist/vue3-xlsx.cjs.prod.js';
import { ref } from 'vue'
import { useDataStore } from '@/stores/dataBulles'
import { useRouter } from 'vue-router'

import ModalView from '@/components/tools/ModalView.vue';
import LateralePage from '@/views/partials/LateralePage.vue'
import ModelDiagramme from '@/components/tools/ModelDiagramme.vue';
//import UploadFile from '@/components/tools/UploaddFile.vue'


const modalTitle = ref()
const hasMessage = ref("")
const fileupload = ref(null)
const dataFile = ref({})
const labelButton = ref()
const dataStore = useDataStore()
const router = useRouter()

const openModal = (modalTitre, labelText) => {
  modalTitle.value = modalTitre
  // eslint-disable-next-line no-undef
  $('#exampleModalLong').modal('show')
  labelButton.value = labelText
}

// const toast = useToast();
// const onUpload = () => {
//     toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 100 });
// };

const readFileJson = (fileupload) => {
  let readFile = new FileReader();
  readFile.onload = (data) => {
    dataFile.value = JSON.parse(data.target.result)
    dataStore.modificationData(dataFile.value)
  }
  readFile.readAsText(fileupload);
}

const convertToJson = (collection, fileupload) => {
  readFileJson(fileupload[0])
  return dataFile.value
}

const select = (e) => {
  hasMessage.value = ""
  if(e.target.files == null || e.target.files == undefined){
    hasMessage.value = "Sélectionner un fichier json svp!"
  }else{
    console.log(e.target.files[0])
    fileupload.value = e.target.files
  }

  //TODO::Controler le type de fichier
}

const sendFile = async () => {
  if(fileupload.value == null || fileupload.value == undefined){
    hasMessage.value = "Sélectionner un fichier json svp!"
  }else{
    // eslint-disable-next-line no-undef
    $('#exampleModalLong').modal('hide')
    router.push({name : 'graph'})
  }

  // let jsonData = fileupload.value.json();
  // console.log(jsonData)
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
  
  <div class="row mt-4">
    <div class="col-lg-4"></div>
    <div class="justify-content-center col-lg-4">
      <button class="btn  btn-primary" @click="openModal('Charger un fichier', 'Importer le fichier')">
        Charger votre fichier json
      </button>
    </div>
  </div>
  
  <modal-view :label-button="labelButton" @function-save="sendFile" tailleModalDialog="modal-lg" :modal-title="modalTitle">
    <template v-slot:body>
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-6">
            <div class="bg-danger mb-1 d-flex">
              <i class="fas fa-times"></i>
              <h6 style="margin-left: 5px; color: white;">{{ hasMessage }}</h6>
            </div>
            <input type="file" mode="basic" name="demo[]"  class="btn-sm btn btn-primary" @change="select"/>
        </div>
      </div>
      <div>
      <template v-if="fileupload != null || fileupload != undefined">          
          <xlsx-read :file="fileupload[0]">
            <xlsx-json>
              <template #default="{collection}">
                <div>
                  <pre>
                    {{convertToJson(collection, fileupload)}}
                  </pre> 
                </div>
              </template>
            </xlsx-json>
          </xlsx-read>
      </template>
      </div>
    </template>
</modal-view>
<laterale-page></laterale-page></template>
