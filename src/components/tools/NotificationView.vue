<script setup>
const props = defineProps({
    messageNotification : {type : String},
    classNotification : {type :String}
})
</script>

<template>
    <div class="alert alert-dismissible text-white" :class="props.classNotification" role="alert">
        <span class="text-sm">{{ props.messageNotification }}</span>
        <button type="button" class="btn-close text-lg py-3 opacity-10" data-bs-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
        </button>
    </div>
</template>