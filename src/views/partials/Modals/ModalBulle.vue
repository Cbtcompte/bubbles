<script setup>
import ModalView from '@/components/tools/ModalView.vue';
import FormBulle from '@/views/partials/FormBulle.vue';

import { ref } from 'vue'

const props = defineProps({
    modalTitle : {type:String},
    labelButton : {type:String},
})

const emits = defineEmits(["ajouterBulle"])

const libelle = ref('')
const parentId = ref("#")
const isParent = ref(false)
const isInvalid = ref(false)

const modifLibelle = (value) => {
    libelle.value = value
}

const modifParent = (value) => {
    parentId.value = value
}

const modifisParent = (value) => {
    isParent.value = value
}

const ajouterBulle = () => {
    if(libelle.value.length <= 0){
        isInvalid.value = true
    }else{
        let data = {
            libelle : libelle.value,
            parentId : parentId.value,
            isParent : isParent.value
        }
        // eslint-disable-next-line no-undef
        $('#modalBulle').modal('hide')
        emits('ajouterBulle', data)

        libelle.value = ""
        parentId.value = ""
        isParent.value = ""
    }
}

</script>

<template>
    <modal-view idModal="modalBulle" :label-button="props.labelButton" @function-save="ajouterBulle" tailleModalDialog="modal-lg" :modal-title="props.modalTitle">
        <template v-slot:body>
            <form-bulle :key="$route.fullPath" :is-invalid="isInvalid" @actualise-is-parent-id="modifisParent" @actualise-libelle="modifLibelle" @actualise-parent-id="modifParent"></form-bulle>
        </template>
    </modal-view>
</template>