<script setup>
import { XlsxRead, XlsxJson } from 'vue3-xlsx/dist/vue3-xlsx.cjs.prod.js';
import ModalView from '@/components/tools/ModalView.vue';
import NotificationView from '@/components/tools/NotificationView.vue';


import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/dataBulles'

const props = defineProps({
    modalTitle : {type:String},
    labelButton : {type:String},
    modeToCall : {type:String},
    idModal : {type:String},
})

const emits = defineEmits(["actualiser"])

const hasMessage = ref("")
const fileupload = ref(null)
const dataFile = ref({})
const dataStore = useDataStore()
const router = useRouter()

const readFileJson = (fileupload) => {
  let readFile = new FileReader();
  readFile.onload = (data) => {
    dataFile.value = JSON.parse(data.target.result)
    dataStore.initData(dataFile.value)
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
    fileupload.value = e.target.files
  }

  //TODO::Controler le type de fichier
}

const sendFile = async () => {
    if(fileupload.value == null || fileupload.value == undefined){
        hasMessage.value = "Sélectionner un fichier json svp!"
    }else{
        // eslint-disable-next-line no-undef
        $('#modalFile').modal('hide')
        if(props.modeToCall != "graphFile"){ router.push({name : 'graph'}) }else{ emits("actualiser") }
    }

    // let jsonData = fileupload.value.json();
    // console.log(jsonData)
}
</script>

<template>
    <modal-view :idModal="idModal" :label-button="props.labelButton" @function-save="sendFile" tailleModalDialog="modal-lg" :modal-title="props.modalTitle">
        <template v-slot:body>
        <div class="row">
            <div class="col-lg-4"></div>
            <div class="col-lg-6">
                <div v-if="hasMessage != ''">
                    <notification-view :messageNotification="hasMessage" classNotification="alert-danger"></notification-view>
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
</template>