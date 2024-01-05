<script setup>
import CheckIcon from '@/components/customeBulle/CheckIcon.vue'
import { ref } from 'vue';


const props = defineProps({
    globalColor : {type : String},
    global : {type : Boolean}
})

const globalColorRef = ref(props.globalColor)

const emit = defineEmits(['globalColorFunction', 'modifierColorBulle'])

const changeColorGlobal = (color) => {
    if(props.global){
        emit('globalColorFunction', color)
    }else{
        emit('modifierColorBulle', color)
    }
    globalColorRef.value = color

}  


</script>
<template>
    <div class="badge-colors my-2 text-start">
        <span @click="changeColorGlobal('#000080')" class="badge filter mb-2"
            style="margin-right: 5px; background-color: #000080;" data-color="primary">
            <template v-if="globalColorRef == '#000080'">
                <check-icon></check-icon>
            </template>
            Bleu foncé
        </span>
        <span @click="changeColorGlobal('#000000')" class="badge filter mb-2 bg-gradient-dark " style="margin-right: 5px;"
            data-color="dark">
            <template v-if="globalColorRef == '#000000'">
                <check-icon></check-icon>
            </template>
            Noir
        </span>
        <span @click="changeColorGlobal('#7b809a')" class="badge filter mb-2 bg-gradient-secondary"
            style="margin-right: 5px;" data-color="info">
            <template v-if="globalColorRef == '#7b809a'">
                <check-icon></check-icon>
            </template>
            Grise
        </span>
        <span @click="changeColorGlobal('#1A73E8')" class="badge filter mb-2 bg-gradient-info" style="margin-right: 5px;"
            data-color="info">
            <template v-if="globalColorRef == '#1A73E8'">
                <check-icon></check-icon>
            </template>
            Bleu clair
        </span>
        <span @click="changeColorGlobal('#4CAF50')" class="badge filter mb-2 bg-gradient-success"
            style="margin-right: 5px;" data-color="success">
            <template v-if="globalColorRef == '#4CAF50'">
                <check-icon></check-icon>
            </template>
            Vert
        </span>
        <span @click="changeColorGlobal('#fb8c00')" class="badge filter mb-2 bg-gradient-warning"
            style="margin-right: 5px;" data-color="warning">
            <template v-if="globalColorRef == '#fb8c00'">
                <check-icon></check-icon>
            </template>
            Orange
        </span>
        <span @click="changeColorGlobal('#F44335')" class="badge filter mb-2 bg-gradient-danger" data-color="danger">
            <template v-if="globalColorRef == '#F44335'">
                <check-icon></check-icon>
            </template>
            Rouge
        </span>
    </div>
</template>