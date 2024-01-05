<script setup>

import Swal from 'sweetalert2'

const props = defineProps({
    backgroundClass: { type: String },
    title: { type: String },
    subtitle: { type: String },
    idDiagramme: { type: String },
    dataGlobal: { type: Object },
    model: { type: Boolean }
})

const emits = defineEmits(["selectDiagramme"])

const displayDetails = () => {
    Swal.mixin({
        customClass: {
            confirmButton: "btn-sm btn btn-success",
        },
        buttonsStyling: false
    }).fire({
        title: "<strong>Contenu du modèle</strong>",
        icon: "info",
        html: `<pre>${JSON.stringify(props.dataGlobal)}</pre>`,
        focusConfirm: false,
        confirmButtonText: `<i class="fa fa-thumbs-up"></i> Ok!`,
    });
}

const selectDiagramme = () => {
    emits("selectDiagramme")
}

</script>
<template>
    <div class="col-lg-4 col-md-4 col-xs-12 col-sm-4 mt-4 mb-4">
        <div class="card z-index-2" @click.prevent="selectDiagramme" :class="{'shadow-color' : props.model}">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div class="border-radius-lg py-3 pe-1 bg-primary" :class="props.backgroundClass">
                    <div class="chart">
                        <div :id="props.idDiagramme"></div>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <h6 class="mb-0 ">{{ props.title }}</h6>
                <p class="text-sm ">{{ props.subtitle }} <span @click="displayDetails" class="text-info cursor-pointer">Voir
                        plus de
                        détails...</span></p>
                <hr class="dark horizontal">
                <div class="row">
                    <div class="col-12" style="text-align: right;" v-if="model">
                        <i class="fa fa-check-circle fs-2  z-index-3 text-success"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>