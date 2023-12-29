<script setup>
import { useDataStore } from '@/stores/dataBulles'
import { ref } from 'vue'

const emits = defineEmits(["actualiseParentId",  "actualiseLibelle", "actualiseIsParentId"])

const props = defineProps({
    isInvalid : {type : Boolean}
})

const dataStore = useDataStore()
const libelle = ref('')
const parentId = ref("#")
const isParent = ref(false)


const changeValue = () => {
    emits("actualiseLibelle", libelle.value)
}

const changeParentId = () => {
    emits("actualiseParentId", parentId.value)
}

const changeIsParentId = () => {
    emits("actualiseIsParentId", isParent.value)
}

</script>

<template>
    <div>
        <form>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group input-group-outline my-1">
                        <select @change="changeParentId" class="form-control" name="parent_id" id="" v-model="parentId">
                            <option value="#"> ------------------ Choisir l'ID du parent ------------------ </option>
                            <template v-for="(element, key) in dataStore.getDataBulle" :key="key">
                                <option :value="element.id">{{ element.id }} - {{ element.data }}</option>
                            </template>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group input-group-outline my-1" :class="{'is-invalid' : props.isInvalid}">
                        <input @keyup="changeValue" v-model="libelle" placeholder="Entrer le libellé" type="texte" class="form-control" :class="{'border-danger' : props.isInvalid}">
                    </div>
                    <span v-if="props.isInvalid" class="text-danger fw-bold">Entrer le libelle de la donnée</span>
                </div>
            </div>
            <div class="form-check">
                <input @change="changeIsParentId" class="form-check-input" type="checkbox" value="" id="fcustomCheck1" checked="" v-model="isParent">
                <label class="custom-control-label" for="customCheck1">Est un noeud parent ?</label>
            </div>
            <div>
                <p class="d-flex">
                    <i class="fas fa-info-circle text-danger mt-1"></i>
                    <h6 class="ms-1"> Les champs contenant <span class="text-danger">*</span> sont obligatoire </h6>
                </p>
            </div>
            <!-- <div class="row">
                <div class="col-md-6">
                    <div class="input-group input-group-outline is-valid my-3">
                        <label class="form-label">Success</label>
                        <input type="email" class="form-control">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group input-group-outline is-invalid my-3">
                        <label class="form-label">Error</label>
                        <input type="email" class="form-control">
                    </div>
                </div>
            </div> -->

        </form>
    </div>
</template>