<script setup>
const props = defineProps({
    tailleModalDialog : {type : String, default : "modal-dialog-centered modal-sm"},
    modalTitle : {type : String},
    classNotification : {type : String},
    messageNotification : {type : String},
    labelButton : {type :  String},
    idModal : {type :  String, default : "modalFile"},
})

const emits = defineEmits('functionSave')

const executeFunction = () => {
    emits('functionSave')
}

</script>

<template>
    <Teleport to='#mode'>
        
        <div class="row">
            <div class="col-md-4">
                <!-- Modal -->
                <div class="modal fade" data-backdrop="static" data-keyboard="false" :id="idModal" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" :class="[props.tailleModalDialog]" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title font-weight-normal" id="exampleModalLongTitle">{{ modalTitle }}</h5>
                                <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body font-weight-light">
                                <slot name="body"></slot>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class=" btn-sm btn bg-gradient-danger" data-bs-dismiss="modal">
                                    <i class="fas fa-times" style="font-size: 10px;"></i>                                    
                                    Fermer
                                </button>
                                <button type="button" class=" btn-sm btn bg-gradient-info" @click="executeFunction">
                                    <i class="fas fa-check" style="font-size: 10px;"></i>                                    
                                    {{labelButton}}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>