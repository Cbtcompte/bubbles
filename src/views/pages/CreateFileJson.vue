<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { toastSuccess } from '@/assets/helpers/toastHelper.js'


const contenuFile = ref([
    {
        "id": 1,
        "data": "",
        "couleur": "",
        "tailleBulle": "",
        "tailleLabel": "",
        "fontFamily": "",
        "forme": "",
        "isParent": false,
        "parent": 0
    }
])


const openSweetAlert = () => {
    Swal.mixin({
        customClass: {
            confirmButton: "btn-sm btn btn-success ms-2",
            cancelButton: "btn-sm btn btn-primary"
        },
        buttonsStyling: false
    }).fire({
        title: "Entrer le nom du fichier",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        preConfirm: (fileName) => {
            if (fileName.length != 0) {
                saveModificationInNewFile(fileName)
            } else {
                Swal.showValidationMessage("Ce champ ne doit pas être vide");
            }
        },
        showCancelButton: true,
        confirmButtonText: "Créer mon fichier",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            toastSuccess('Votre fichier à bien été télécharger')
        }
    });
}


const controlAndSave = () => {
    let error = 0;
    contenuFile.value.map((item) => {
        if (item.data.length == 0) {
            error = 1
        }
    })

    if (error == 1) {
        Swal.mixin({
            customClass: {
                confirmButton: "btn-sm btn btn-danger",
            },
            buttonsStyling: false
        }).fire({
            title: "Erreur",
            text: "Oops! Il y a une erreur. Vérifier si les champs marqué de * sont bien remplis",
            icon: "error",
            backdrop: false,
            confirmButtonText: `<i class="fa fa-times"></i> Ok!`
        })
    } else {
        openSweetAlert()
    }

}

const saveModificationInNewFile = (fileName) => {
    // Création d'un objet Blob
    const blob = new Blob([JSON.stringify(contenuFile.value)], { type: 'application/json' });

    // Création d'un objet URL pour le Blob
    const url = window.URL.createObjectURL(blob);

    // Création d'un élément d'ancre pour le téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`;

    // Ajout de l'élément d'ancre à la page
    document.body.appendChild(a);

    // Simuler un clic sur l'élément d'ancre pour déclencher le téléchargement
    a.click();

    // Supprimer l'élément d'ancre après le téléchargement
    document.body.removeChild(a);
}

const addDataToFile = () => {
    contenuFile.value.push({
        "id": contenuFile.value.length + 1,
        "data": "",
        "couleur": "",
        "tailleBulle": "",
        "tailleLabel": "",
        "fontFamily": "",
        "forme": "",
        "isParent": false,
        "parent": 0
    })
}

const deleteToContenu = (key) => {
    contenuFile.value = contenuFile.value.filter((item, index) => index != key)
    contenuFile.value.map((item, key) => {
        item.id = key + 1
    })
}
</script>

<template>
    <div class="row">
        <div class="col-6 col-xs-12">
            <div class="card bg-gray-100 ">
                <div class="card-header">
                    <div class=" d-flex">
                        <div class="col-lg-6 col-md-4">
                            <h6>
                                <i class="fas fa-bars"></i>
                                Créer mon fichier
                            </h6>
                        </div>
                        <div class="col-lg-6 col-md-4" style="text-align: right;">
                            <div class="btn-group">
                                <button @click="addDataToFile" type="button"
                                    class="btn btn-sm btn-icon bg-gradient-primary">
                                    <i class="fas fa-plus-circle fs-6"></i>
                                    Ajouter une ligne
                                </button>

                            </div>
                        </div>
                    </div>
                    Votre fichier sera créé à partir de ce formulaire. Veuillez bien le remplir

                </div>
                <div class="card-body">
                    <template v-for="(item, key) in contenuFile" :key="key">
                        <div class="row" v-if="key != 0">
                            <div class="col-12" style="text-align: right;">
                                <button @click.prevent="deleteToContenu(key)" class="btn btn-sm  btn-primary btn-icon-only">
                                    <i class="fa fa-times-circle fs-6"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <label for="">Libellé de la donnée <sup class="text-danger">*</sup></label>
                                <div class="input-group input-group-outline">
                                    <input type="text" placeholder="Entrez la donnée" class="form-control"
                                        v-model="item.data">
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="">Choisir la couleur de la bulle</label>
                                <div class="input-group input-group-outline">
                                    <select @change="changeParentId" class="form-control" name="parent_id" id=""
                                        v-model="item.couleur">
                                        <option value=""> --------- Choisir une couleur ---------</option>
                                        <option value="#000080" style="background-color: #000080;">
                                            Bleu foncé
                                        </option>
                                        <option value="#000000" style="background-color: #000000;"> Noir</option>
                                        <option value="#7b809a" style="background-color: #7b809a;"> Grise</option>
                                        <option value="#1A73E8" style="background-color: #1A73E8;"> Bleu clair</option>
                                        <option value="#4CAF50" style="background-color: #4CAF50;"> Vert</option>
                                        <option value="#fb8c00" style="background-color: #fb8c00;"> Orange</option>
                                        <option value="#F44335" style="background-color: #F44335;"> Rouge</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="">Taille des bulles </label>
                                <div class="input-group input-group-outline">
                                    <input type="number" v-model="item.tailleBulle" placeholder="Taille des bulles"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="">Taille du libellé </label>
                                <div class="input-group input-group-outline">
                                    <input type="number" v-model="item.tailleLabel" placeholder="Taille du libellé"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="">Style du texte</label>
                                <div class="input-group input-group-outline">
                                    <select placeholder="Style du texte" class="form-control" name="parent_id" id=""
                                        v-model="item.fontFamily">
                                        <option value=""> --------- Choisir le style du libellé --------- </option>
                                        <option value="serif" style="font-family: serif;">Serif</option>
                                        <option value="sans-serif" style="font-family: sans-serif;">Sans-Serif</option>
                                        <option value="monospace" style="font-family: monospace;">Monospace</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label for="">Choisir la forme des bulles</label>
                                <div class="input-group input-group-outline my-1">
                                    <select @change="changeParentId" class="form-control" name="parent_id" id=""
                                        v-model="item.forme">
                                        <option value=""> --------- Choisir la forme des bulles --------- </option>
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
                            <div class="col-md-6 mb-2 form-check">
                                <input class="form-check-input" type="checkbox" value="" id="fcustomCheck1" checked=""
                                    v-model="item.isParent">
                                <label class="custom-control-label" for="customCheck1">Est un noeud parent ?</label>

                            </div>
                            <div class="col-md-6 mb-2" v-if="item.isParent">
                                <label for="">Choisir l'ID du parent </label>
                                <div class="input-group input-group-outline my-1">
                                    <select class="form-control" name="parent_id" id="" v-model="item.parent">
                                        <option value="0"> --------- Choisir l'ID du parent --------- </option>
                                        <template v-for="(element, key) in contenuFile" :key="key">
                                            <option :value="element.id" v-if="item.id != element.id">{{ element.id }} - {{
                                                element.data }}</option>
                                        </template>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="col-6 col-xs-12">
            <div class="card bg-gray-100">
                <div class="card-header">
                    <div class="d-flex">
                        <div class="col-6">
                            <h6>
                                <i class="fa fa-eye"></i> Prévisualiser le contenu du fichier
                            </h6>
                        </div>
                        <div class="col-lg-6 col-md-4" style="text-align: right;">
                            <div class="btn-group">
                                <button @click="controlAndSave" type="button"
                                    class="btn btn-sm btn-icon bg-gradient-primary">
                                    <i class="fas fa-file-export fs-6"></i>
                                    Créer mon fichier
                                </button>
                            </div>
                        </div>
                    </div>
                    Visualisation du contenu de votre fichier. Ceci est fait au et à mesure de votre saisir
                </div>
                <div class="card-body">
                    <pre>
                        {{ contenuFile }}
                    </pre>
                </div>
            </div>
        </div>
    </div>
</template>