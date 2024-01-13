<script setup>
const props = defineProps({
    libelle : {type : String},
    icon : {type : String},
    param : {type : String},
    classe : {type : String},
    style : {type : Object}
})

const emits = defineEmits(["action"])

const clickEvent = () => {
    emits('action', props.param)
}

</script>

<template>
    <div>
        <button @click.prevent="clickEvent()" :class="props.classe" :style="props.style">
            <i :class="props.icon"></i>
            {{ props.libelle }}
        </button>
    </div>
</template>