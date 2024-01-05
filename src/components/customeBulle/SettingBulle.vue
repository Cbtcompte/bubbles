<script setup>
const props = defineProps({switchTab : {type : String}})
const emit = defineEmits(['modifierFormBulle', 'modifierLabelText'])

const executeFunction = (event, attribut, fonction) => {
    if(event.target.value != ""){
        fonction(event, attribut)
    }
}

const changeBulleValue = (event, attribut) => {
    if(event.target.value != ""){
        emit('modifierFormBulle', [event.target.value, attribut])
    }
}

const changeTexteValue = (event, attribut) => {
    if(event.target.value != ""){
        emit('modifierLabelText', [event.target.value, attribut])
    }
}


</script>

<template>
    <div class="mb-4">
        <div>
            <h6 class="form-label text-bold">Taille et forme des bulles {{ (props.switchTab == "enfant") ? " enfants" : "" }}</h6>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <label class="form-label">Forme de la bulle</label>
                <div class="input-group input-group-outline">
                    <select @change="executeFunction($event,'symbol', changeBulleValue)"  class="form-control">
                        <option value="">-- Choisir une forme -- </option>
                        <option value="circle">Cercle</option>
                        <option value="rect">Rectangle</option>
                        <option value="roundRect">Rectangle arrondis</option>
                        <option value="triangle">Triangle</option>
                        <option value="diamond">Losange</option>
                        <option value="pin">Pin</option>
                        <option value="arrow">Arrow</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <label class="form-label">Taille de la bulle </label>
                <div class="input-group input-group-outline">
                    <input type="number" value="60" min="60" @keyup="executeFunction($event,'symbolSize', changeBulleValue)" class="form-control">
                </div>
            </div>

        </div>
    </div>
    <div class="mb-4">
        <div>
            <h6 class="form-label text-bold">Texte des bulles {{ (switchTab == "enfant") ? " enfants" : "" }}</h6>
        </div>
        <div class="row mb-2">
            <div class="col-lg-6 col-md-6">
                <label class="form-label">Couleur du texte</label>
                <div class="input-group input-group-outline">
                    <select @change="executeFunction($event,'color', changeTexteValue)"  class="form-control">
                        <option value="">-- Choisir une couleur -- </option>
                        <option value="#ffff">Blanche</option>
                        <option value="#000080">Bleu foncé</option>
                        <option value="#000000">Noir</option>
                        <option value="#4CAF50">Vert</option>
                        <option value="#7b809a">Grise</option>
                        <option value="#1A73E8">Bleu clair</option>
                        <option value="#fb8c00">Orange</option>
                        <option value="#F44335">Rouge</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <label class="form-label">Style du texte</label>
                <div class="input-group input-group-outline">
                    <select @change="executeFunction($event,'fontStyle', changeTexteValue)" class="form-control">
                        <option value="">-- Choisir un style -- </option>
                        <option value="normal">Normal</option>
                        <option value="italic">Oblique</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <label class="form-label">Taille du texte</label>
                <div class="input-group input-group-outline">
                    <input @keyup="executeFunction($event,'fontSize', changeTexteValue)" min="0" value="12" type="number" class="form-control">
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <label class="form-label">Police du texte</label>
                <div class="input-group input-group-outline">
                    <select @change="executeFunction($event,'fontFamily', changeTexteValue)" class="form-control">
                        <option value="">-- Choisir une police -- </option>
                        <option value="serif" style="font-family: serif;">Serif</option>
                        <option value="sans-serif" style="font-family: sans-serif;">Sans-Serif</option>
                        <option value="monospace" style="font-family: monospace;">Monospace</option>
                    </select>            
                </div>
        </div>
    </div>
</div></template>