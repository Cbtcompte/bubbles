<script setup>
import { XlsxRead, XlsxJson } from 'vue3-xlsx/dist/vue3-xlsx.cjs.prod.js';
import ModalView from '@/components/tools/ModalView.vue';
import NotificationView from '@/components/tools/NotificationView.vue';
import Swal from 'sweetalert2'


import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/dataStore'

const props = defineProps({
    modalTitle: { type: String },
    labelButton: { type: String },
    modeToCall: { type: String },
    idModal: { type: String },
})

const emits = defineEmits(["actualiser"])

const hasMessage = ref("")
const fileupload = ref(null)
const dataFile = ref({})
const dataStore = useDataStore()
const router = useRouter()

const keyForData = [
    "id",
    "data",
    "couleur",
    "tailleBubble",
    "tailleLabel",
    "fontFamily",
    "forme",
    "isParent",
    "parent"
]

const error = ref(0)

const readFileJson = async (fileupload) => {
    dataFile.value = []
    dataStore.initData([])
    let readFile = new FileReader();
    readFile.onload = async (data) => {
        let dataTemp = JSON.parse(data.target.result)

        dataTemp.forEach((item) => {
            keyForData.forEach((key) => {
                if (!Object.prototype.hasOwnProperty.call(item, key)) {
                    error.value = 1
                }
            })
        })

        if (error.value == 0) {
            dataFile.value = dataTemp
            await dataStore.initData(dataFile.value)
        } else {
            Swal.mixin({
                customClass: {
                    confirmButton: "btn-sm btn btn-danger",
                },
                buttonsStyling: false
            }).fire({
                title: "Erreur",
                text: "Oops! Les données du fichier ne sont pas valide",
                icon: "error",
                backdrop: false,
                confirmButtonText: `<i class="fa fa-times"></i> Ok!`
            }).then((result) => {
                if(result.isConfirmed) {
                    error.value = 0
                }
            })
        }
    }
    readFile.readAsText(fileupload);
}

// const convertToJson = (fileupload) => {
//   readFileJson(fileupload[0])
//   return dataFile.value
// }

const select = (e) => {
    hasMessage.value = ""
    if (e.target.files == null || e.target.files == undefined) {
        hasMessage.value = "Sélectionner un fichier json svp!"
    } else {
        fileupload.value = e.target.files

        if (fileupload.value[0].type != "application/json") {
            Swal.mixin({
                customClass: {
                    confirmButton: "btn-sm btn btn-danger",
                },
                buttonsStyling: false
            }).fire({
                title: "Erreur",
                text: "Oops! Vérifier si le fichier est json (extension .json)",
                icon: "error",
                backdrop: false,
                confirmButtonText: `<i class="fa fa-times"></i> Ok!`
            })
        } else {
            readFileJson(fileupload.value[0])
        }
    }
}

const sendFile = async () => {
    if (fileupload.value == null || fileupload.value == undefined) {
        hasMessage.value = "Sélectionner un fichier json svp!"
    } else {
        // eslint-disable-next-line no-undef
        $('#modalFile').modal('hide')
        if (props.modeToCall != "graphFile") { router.push({ name: 'graph' }) } else { emits("actualiser") }
    }

    // let jsonData = fileupload.value.json();
    // console.log(jsonData)
}

</script>

<template>
    <modal-view :idModal="idModal" :label-button="props.labelButton" @function-save="sendFile" tailleModalDialog="modal-lg"
        :modal-title="props.modalTitle">
        <template v-slot:body>
            <div class="row">
                <div class="col-lg-4"></div>
                <div class="col-lg-6">
                    <div v-if="hasMessage != ''">
                        <notification-view :messageNotification="hasMessage"
                            classNotification="alert-danger"></notification-view>
                    </div>
                    <input type="file" mode="basic" name="demo[]" class="btn-sm btn btn-primary" @change="select" />
                </div>
            </div>
            <div>
                <template v-if="fileupload != null || fileupload != undefined">
                    <xlsx-read :file="fileupload[0]">
                        <xlsx-json>
                            <template #default="{ }">
                                <div>
                                    <pre>
                        {{ dataFile }}
                    </pre>
                                </div>
                            </template>
                        </xlsx-json>
                    </xlsx-read>
                </template>
            </div>
        </template>
    </modal-view></template>