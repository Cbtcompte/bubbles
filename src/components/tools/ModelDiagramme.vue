<script setup>
const props = defineProps({
    backgroundClass: { type: String },
    title: { type: String },
    subtitle: { type: String }
})
</script>
<template>
    <div class="col-lg-4 col-md-6 mt-4 mb-4">
        <div class="card z-index-2 ">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div class="border-radius-lg py-3 pe-1" :class="props.backgroundClass">
                    <div class="chart">
                        <canvas id="chart-bars" class="chart-canvas" height="170"></canvas>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h6 class="mb-0 ">{{ props.title }}</h6>
                <p class="text-sm ">{{ props.subtitle }}</p>
                <hr class="dark horizontal">
                <!-- <div class="d-flex ">
                    <i class="material-icons text-sm my-auto me-1">schedule</i>
                    <p class="mb-0 text-sm"> (<span class="font-weight-bolder">+15%</span>) personnes ont utilisé ce
                        diagramme
                    </p>
                </div> -->
                <button class="btn btn-info">
                    Utilser ce modèle
                </button> 
            </div>
        </div>
    </div>
</template>