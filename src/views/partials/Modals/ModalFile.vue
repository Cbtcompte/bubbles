<script setup>
import ModalView from '@/components/tools/ModalView.vue';
import NotificationView from '@/components/tools/NotificationView.vue';
import Swal from 'sweetalert2'


import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/dataStore'
import { useDiagrammeStore } from '@/stores/diagrammeStore'

const props = defineProps({
    modalTitle: { type: String },
    labelButton: { type: String },
    modeToCall: { type: String },
    idModal: { type: String },
    modelName: { type: String },
    modelSelected: { type: Object },
    functionCall: { type: Function },

})

const emits = defineEmits(["actualiser", "init"])

const hasMessage = ref("")
const fileupload = ref(null)
const dataFile = ref({})
const dataStore = useDataStore()
const diagrammeStore = useDiagrammeStore()
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
    diagrammeStore.initDiagrammeModel([])
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
            await diagrammeStore.initDiagrammeModel(props.modelSelected)
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
                if (result.isConfirmed) {
                    error.value = 0
                }
            })
        }
    }
    readFile.readAsText(fileupload);
}

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
        if (props.modeToCall != "graphFile") { 
            router.push({ name: 'graph' }) 
        } else { 
            if(props.functionCall){
                emits("init")
            }else{
                emits("actualiser")
            } 
        }
    }
}

const displayDetails = () => {
    Swal.mixin({
        customClass: {
            confirmButton: "btn-sm btn btn-success",
        },
        buttonsStyling: false
    }).fire({
        title: "<strong>Contenu du modèle</strong>",
        icon: "info",
        html: `<pre>${JSON.stringify(props.modelSelected)}</pre>`,
        focusConfirm: false,
        confirmButtonText: `<i class="fa fa-thumbs-up"></i> Ok!`,
    });
}

onMounted(() => {
    // eslint-disable-next-line no-undef
    $("#"+props.idModal).on('hidden.bs.modal', () => {
        dataFile.value = {}
        fileupload.value = null
        console.log(fileupload.value)
    })
})

</script>

<template>
    <modal-view :idModal="idModal" :label-button="props.labelButton" @function-save="sendFile" tailleModalDialog="modal-lg"
        :modal-title="props.modalTitle">
        <template v-slot:body>
            <div class="row mb-2" v-if="(props.modelSelected != null || props.modelSelected != undefined)">
                <div class="col-12" style="text-align: center;">
                    <h6 class="my-3">
                        <span class="alert alert-info opacity-7" style="color: black;">
                            <i class="fa fa-info-circle"></i> Vous aviez choisir le modèle {{ modelName }}. <span @click="displayDetails" class="text-color cursor-pointer">Voir le modèle...</span>
                        </span>
                    </h6>
                </div>
            </div>
            <div class="row mb-2" v-else>
                <div class="col-12" style="text-align: center;">
                    <h6 class="my-3">
                        <span class="alert alert-warning opacity-7" style="color: black;">
                            <i class="fa fa-info-circle"></i> Vous n'aviez pas choisir de modèle.
                        </span>
                    </h6>
                </div>
            </div>
            <div class="row">
                <div class="col-12" style="text-align: center;">
                    <div v-if="hasMessage != ''">
                        <notification-view :messageNotification="hasMessage"
                            classNotification="alert-danger"></notification-view>
                    </div>
                    <input type="file" mode="basic" name="demo[]" class="btn-sm btn btn-primary" @change="select" />
                </div>
            </div>
            <div>
                <template v-if="fileupload != null || fileupload != undefined">
                    <div style="height: 500px;">
                        <div class="card" style="height: 500px;">
                            <div class="card-header" style="height: 60px;">
                                <h6>
                                    <i class="fa fa-eye"></i>
                                    Contenu de mon fichier
                                </h6>
                            </div>
                            <pre class="card-body bg-gray-200 overflow-y-scroll">
                                {{ dataFile }}
                            </pre>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </modal-view>
</template>