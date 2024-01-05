<script setup>
import * as echarts from 'echarts'

import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/dataStore'
import { onMounted, ref, computed, watch } from 'vue';

import SettingBulle from '@/components/customeBulle/SettingBulle.vue'
import ColorChoice from '@/components/customeBulle/ColorChoice.vue'
import NotificationView from '@/components/tools/NotificationView.vue';
import Swal from 'sweetalert2'

import { toastSuccess, toastWarning, toastDanger } from '@/assets/helpers/toastHelper.js'
import ModalFile from '@/views/partials/Modals/ModalFile.vue';
import ModalBulle from '@/views/partials/Modals/ModalBulle.vue';


/**
 * 
 * Variable 
 */
const store = useDataStore()
const { dataBulle } = storeToRefs(store)

const diagrammeName = ref('Diagramme à bulle')

const switchTab = ref('parent')
const switchTabModif = ref('general')
const isActiveGraph = ref(true)

const switchStyleEnfant = ref('translate3d(90%, 0px, 0px)')
const switchStyleParent = ref('translate3d(5%, 0px, 0px)')
const globalColor = ref('#000080')
const globalSymbolParent = ref('diamond')
const globalSymbolEnfant = ref('circle')

const applyGlobalColor = ref(false)
const initGraphBool = ref(false)
const eventInit = ref(true)

const messageNotification = ref('')
const classNotification = ref('')
const hasNotification = ref(false)

const dataGraph = ref([])
const edgesUse = ref([])
const edges = ref([])
const idParentTab = ref([])
const saveDataInFile = ref([])


/**
 * Watch
 */

watch(dataGraph, (newDataGraph, oldDataGraph) => {
    if(!eventInit.value){
        initDomForGraph()
    }
}, { deep: true })


/**
 * Computed methodes
 * 
 */
const computedNameDiagrame = computed(() => {
    return diagrammeName.value
})

const computedActiveGraph = computed(() => {
    return isActiveGraph.value
})

const dataIsEmpty = computed(() => {
    // || !initGraphBool.value
    if(dataBulle.value == null || dataBulle.value.length == 0){
        return false;
    }else{
        return true;
    }
})

const computedDataGraph = computed(() => dataGraph.value)


/**
 *  Changer de tab 
 * 
 */
const openPanelBulle = (tab) => {
    switchTabModif.value = tab
}

const changeActiveGraph = async (value) => {
    isActiveGraph.value = value
    if(isActiveGraph.value){
        setTimeout(async () => {
            await initDomForGraph()
        }, 100)
    }
}

const switchTabFunction = (typeBulle) => {
    switchTab.value = typeBulle
}

/**
 * Open Modal
 * 
 *
 */
const modalFunctionInitGraph = async () => {
    initGraphBool.value =  true
    await initGraph()
}

const openModal = (idModal) => {
  // eslint-disable-next-line no-undef
  $('#'+idModal).modal('show')
}

 /**
  * Modification Global du Graph
  * 
  * @param {Object} parametre 
  */
const modifierFormBulle = (parametre) => {
    if (switchTab.value == "parent") {
        globalSymbolParent.value = parametre[0]
        dataGraph.value.map((item) => {
            if (item.isParent) {
                item[parametre[1]] = parametre[0]
            }
        })
    } else {
        globalSymbolEnfant.value = parametre[0]
        dataGraph.value.map((item) => {
            if (!item.isParent) {
                item[parametre[1]] = parametre[0]
            }
        })
    }
    initDomForGraph()
}

const modifierLabelText = (parametre) => {
    if (switchTab.value == "parent") {
        dataGraph.value.map((item) => {
            if (item.isParent) {
                item.label[parametre[1]] = parametre[0]
            }
        })
    } else {
        dataGraph.value.map((item) => {
            if (!item.isParent) {
                item.label[parametre[1]] = parametre[0]
            }
        })
    }
    initDomForGraph()
}

const modifierColorBulle = (parametre) => {
    if (switchTab.value == "parent") {
        dataGraph.value.map((item) => {
            if (item.isParent) {
                item.itemStyle.color = parametre
                item.itemStyle.borderColor = parametre
            }
        })
    } else {
        dataGraph.value.map((item) => {
            if (!item.isParent) {
                item.itemStyle.color = parametre
                item.itemStyle.borderColor = parametre
            }
        })
    }
    initDomForGraph()
}

const choiceGlobalOrNot = (value) => {
    if (value == 'Non') {
        dataGraph.value.map((item) => {
            item['itemStyle'] = {
                color: '#000080', //Générale
                borderColor: '#000080' // Générale
            }
        })
        applyGlobalColor.value = false
    } else {
        dataGraph.value.map((item) => {
            item['itemStyle'] = null
        })
        applyGlobalColor.value = true
    }    
}

const globalColorFunction = (color) => {
    globalColor.value = color
    initDomForGraph()
}


/**
 * Save the modification in new file
 * 
 * @param {String} type 
 */
const saveModificationInNewFile = (fileName, type) => {   
    // Création d'un objet Blob
    const blob = new Blob([JSON.stringify(transformDataToOriginalFile(saveDataInFile.value))], { type: type });

    // Création d'un objet URL pour le Blob
    const url = window.URL.createObjectURL(blob);

    // Création d'un élément d'ancre pour le téléchargement
    const a = document.createElement('a');
    a.href = url;
    switch (type) {
        case 'application/json':
            a.download = `${fileName}.json`;
            break;
        case 'text/plain':
            a.download = `${fileName}.text`;
            break;
        default:
            a.download = `${fileName}.png`;
            break;
    }

    // Ajout de l'élément d'ancre à la page
    document.body.appendChild(a);

    // Simuler un clic sur l'élément d'ancre pour déclencher le téléchargement
    a.click();

    // Supprimer l'élément d'ancre après le téléchargement
    document.body.removeChild(a);
}

const transformDataToOriginalFile = (listGraphSave) => {
    let originalDataForme = []
    listGraphSave.forEach((item) => {
        originalDataForme.push(
            {
                "id": item.id,
                "data": item.name,
                "couleur": item.itemStyle.color,
                "tailleBubble": item.symbolSize,
                "tailleLabel": item.label.fontSize,
                "fontFamily": item.label.fontFamily,
                "forme": item.symbol,
                "isParent": item.isParent,
                "parent": item.parent
            },
        )
    })

    return originalDataForme
}

const openSweetAlert = (type) => {
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
        preConfirm : (fileName) => {
            if(fileName.length != 0){
                saveModificationInNewFile(fileName, type)
            }else{
                Swal.showValidationMessage("Ce champ ne doit pas être vide"); 
            }
        },
        showCancelButton: true,
        confirmButtonText: "Créer mon fichier",
        reverseButtons : true,
    }).then((result) => {
        if (result.isConfirmed) {
            toastSuccess('Votre fichier à bien été télécharger')
        }
    });
}

/**
 * Création du graphe sur le dom
 * 
 */
const visualisation = async () => {
    dataGraph.value = []
    idParentTab.value = []

    store.dataBulle.forEach((element) => {
        if(element.parent == element.id){
            toastWarning("Une bulle ne peut pointer sur elle-même")
        }
        idParentTab.value.push((element.parent == element.id) ? null : element.parent)
        dataGraph.value.push({
            id: element.id,
            name: element.data,
            fixed: true,
            symbol: (element.isParent) ? "diamond" : element.forme, // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            symbolSize: element.tailleBubble, // [width, height]
            visibility: true,
            parent: (element.parent == element.id) ? null : element.parent,
            isParent:  element.isParent,
            label: {
                show: true,
                color: '#fff',
                fontSize: element.tailleLabel,
                fontFamily: element.fontFamily,
                fontStyle: 'normal',
                fontWeigth: 'normal'
            },
            itemStyle: {
                color:  globalColor.value, //Générale
                borderColor: globalColor.value // Générale
            },
        },)
    })
}

const createLinkBettweenData = async () => {
    edges.value = []
    edgesUse.value = []
    dataGraph.value.forEach(element => {
        if (element.parent != null) {
            edges.value.push({
                source: element.parent-1,
                target: element.id-1,
                lineStyle: {
                    type: 'dotted',
                    width: 1,
                }
            });

            edgesUse.value.push({
                source: element.parent -1,
                target: element.id-1,
                lineStyle: {
                    type: 'dotted',
                    width: 1,
                }
            });
        }
    });
}

const initDomForGraph = async () => {
    if(dataIsEmpty.value){
        try {
            const myChart = echarts.init(document.getElementById('chart-container'), null, {
                width: 'auto',
                height: '900',
            })

            // Option de visualisation
            setInterval(() => {
            }, 1000)
            myChart.setOption({
                // animationDurationUpdate: 3000,
                // animationEasingUpdate: 'quinticOutIn',
                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        draggable: true,
                        data: computedDataGraph.value,
                        // animation: false,
                        roam: true,
                        links: edgesUse.value,
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [5, 10],
                        selectedMode: "multiple",
                        lineStyle: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        },
                        label: {
                            show: true
                        },
                        itemStyle: {
                            color: globalColor.value, //Générale
                            borderColor: globalColor.value // Générale
                        },
                        force: {
                            initLayout: 'circular',
                            repulsion: 300,
                            edgeLength: 300,
                        },
                        edgeLabel: {
                            fontSize: 20,
                            // show : true
                        },
                        select: {
                            itemStyle: {
                                color: 'rgb(255,0,0)',
                                borderColor: 'rgb(255,0,0)'
                            },
                            edgeLabel: {
                                show: true
                            }
                        }
                    },
                ]
            });

            myChart.on('click', function (params) {
                let countPresenceData = null
                saveDataInFile.value.map((element) => {
                    if(params.data.id == element.id){
                        countPresenceData = element.id
                    }
                })

                if(countPresenceData == null){
                    saveDataInFile.value.push(params.data)
                }else{
                    saveDataInFile.value = saveDataInFile.value.filter((item) => item.id != countPresenceData)
                }
                eventInit.value = false
            });
            
        }catch (error) {
            console.log('Un problème '+error)
        }
    }
}

const initGraph = async () => {
    if (dataIsEmpty.value) {
      await visualisation()
      await createLinkBettweenData()
      await initDomForGraph()
    }
}


/**
 * Gestion du graph (ajout, modification et suppression)
 * 
 * @param {int} key 
 * @param {Object} item 
 */

 const changeVisibility = (element) => {
    let resulte = true;
    dataGraph.value.map((item) => {
        if (item.id == element.id) {
            item.visibility = !element.visibility
            resulte = item.visibility
        }
    })

    return resulte
}

const cacheAllChildGraph = (element, visibility) => {
    console.log(element)
    // let boole = changeVisibility(element)
    // if (boole) {
    //     edgesUse.value = edges.value
    //     //dataGraph.value = data.value
    //     dataGraph.value.map((item, index) => {
    //         // item.symbol = saveSymbol[index].symbol
    //         // if (item.parent == element.id) {
    //         //     // saveSymbol.value.push({
    //         //     //     key : index,
    //         //     //     symbol : item.symbol,
    //         //     //     parent : item.parent
    //         //     // })
    //         //     item.symbol = 'none'
    //         // }
    //     })
    // } else {
    //     edgesUse.value = edges.value.filter(item => item.source !== (element.id - 1))
    //     dataGraph.value.map((item, index) => {
    //         if (item.parent == element.id) {
    //             saveSymbol.value.push({
    //                 key: index,
    //                 symbol: item.symbol,
    //                 parent: item.parent
    //             })
    //             item.symbol = 'none'
    //         }
    //     })
    // }
}

const modifierBulleSpecifique = (key, item) => {   
    if (item['id'] != item['parent']) {
        let idOldParent = idParentTab.value[key]
        let dataOfChildToOldParent = dataGraph.value.filter((val) => val.parent == idOldParent)

        if(dataOfChildToOldParent.length == 0){
            let parent = dataGraph.value.filter((value) => value.id == idOldParent)[0]
            parent.isParent = false
            parent.symbol = globalSymbolEnfant
        }
        if(item['parent'] != ""){
            let parent = dataGraph.value.filter((value) => value.id == item['parent'])[0]
            parent.isParent = true
            parent.symbol = globalSymbolParent
        }
        dataGraph.value[key] = item
        idParentTab.value[key] = item['parent']
        createLinkBettweenData()
        initDomForGraph()
    } else {
        hasNotification.value = true
        messageNotification.value = "Une bulle ne peut pointer sur elle-même"
        classNotification.value = 'alert-danger'
    }
}

const addDataGraph = async (data) =>  {
    let val = {
        id : dataBulle.value.length+1,
        data : data.libelle,
        couleur : "#41D55",
        tailleBubble : 50,
        tailleLabel : 15,
        fontFamily : "sans-serif",
        forme : (data.isParent) ? "diamond" : "circle",
        isParent : data.isParent,
        parent : data.parentId,
    }

    store.addDataStore(val)

    if(!data.parentId || data.parentId != "#"){
        store.updateFormeBulle(data.parentId)
    }

    toastSuccess('La donnée à bien été ajouter')
    changeActiveGraph(false)
    await visualisation()
    await createLinkBettweenData()
    saveDataInFile.value = []
    // Swal.fire({
    //     title: "Rafraichir le graph",
    //     text: "Pour pouvoir visualiser le nouveau graph, veuillez le rafraichir",
    //     icon: "info",
    //     backdrop : false,
    //     confirmButtonText : `<i class="fa fa-refresh"></i> Actualiser!`
    // }).then(async (result) => {
    //     console.log(result.isConfirmed)
    //     if (result.isConfirmed) {

    //     }
    // })
}

const deleteData = (key, item) => {
    Swal.mixin({
        customClass: {
            confirmButton: "btn-sm btn-icon btn btn-danger ms-2",
            cancelButton: "btn-sm btn-icon btn btn-primary"
        },
        buttonsStyling: false
    }).fire({
        title: "Suppression",
        text: `Voulez-vous vraiment supprimer la donnée ${item.name}`,
        icon: "question",
        backdrop : true,
        showCancelButton: true,
        confirmButtonText : `<i class="fa fa-trash"></i> Supprimer!`,
        cancelButtonText:  `<i class="fa fa-times"></i> Annuler!`,
        reverseButtons : true,
    }).then(async (result) => {
        console.log(result.isConfirmed)
        if (result.isConfirmed) {
            dataGraph.value = dataGraph.value.filter((val) => val.id != item.id)
            // createLinkBettweenData()
            initDomForGraph()
        }
    })
    
}

/**
 * Cycle de vie 
 * 
 */
onMounted(async () => {
    await initGraph()
})

</script>

<template>
    <div class="row">
        <div :class="[!dataIsEmpty ? 'col-lg-12 col-md-12 ' : 'col-lg-7 col-md-7']">
            <div class="row">
                <h4 class="col-9">
                    <i class="fas fa-bullseye"></i>
                    {{ computedNameDiagrame }}
                </h4>
                <!-- <button @click.prevent="openModal('modalFile')" class="btn btn-primary btn-sm col-3">
                    <i class="fas fa-file-import" style="font-size: 12px;"></i>
                    Importer un fichier
                </button> -->
                <div class="col-3">
                    <div class="">
                        <button @click="changeActiveGraph(true)" class="col-6 btn btn-sm btn-outline-secondary btn-icon" :class="{'bg-primary text-white' : isActiveGraph}">
                            <i class="fa fa-code-fork fs-6"></i> Graph
                        </button>
                        <button @click="changeActiveGraph(false)" class="col-6 btn btn-sm btn-outline-secondary btn-icon" :class="{'bg-primary text-white' : !isActiveGraph}">
                            <i class="fa fa-code fs-6"></i> JSON
                        </button>
                    </div>
                </div>
            </div>
            <div class="border border-radius-xl bg-gray-200" :class="{'overflow-y-scroll' : !isActiveGraph}" style="height: 900px;">
                <div id="" class="py-4">
                    <template v-if="dataIsEmpty">
                        <template v-if="computedActiveGraph">
                            <div id="chart-container">
                                <div style="text-align: center; margin-top: 40%;">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only"></span> Chargement....
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div>
                               <pre>
                                    {{ dataBulle }}
                               </pre>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div class="">
                            <div class="col-lg-4"></div>
                            <div class="py-5 mt-9" style="text-align: center;">
                                <i class="fas fa-times-circle text-primary" style="font-size: 30px"></i>
                                <h6 style="text-align: center;">Aucun fichier importé. Veuillez sélectionner un fichier</h6>
                                <button @click.prevent="openModal('modalFile')" class="btn btn-primary btn-sm">
                                    <i class="fas fa-file-import" style="font-size: 12px;"></i>
                                    Importer le fichier
                                </button>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div v-if="dataIsEmpty" class="col-lg-5 col-md-5">
            <div class="card bg-gray-100" style="height: auto">
                <div class="card-header" style="height: auto;">
                    <div class="d-flex">
                        <div class="col-lg-6 col-md-4">
                            <h6 class="mb-0 ">
                                <i class="fas fa-cogs"></i>
                                Configuration du diagramme
                            </h6>
                        </div>          
                        <div class="col-lg-6 col-md-4" style="text-align: right;">
                            <div class="btn-group dropdown" >
                                <button type="button" class="btn btn-sm btn-icon bg-gradient-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-file-export fs-6"></i>
                                    Enregistrer une sélection
                                </button>
                                <ul class="dropdown-menu px-2 py-3" aria-labelledby="dropdownMenuButton">
                                    <li><a class="dropdown-item border-radius-md" href="javascript:;" @click.prevent="openSweetAlert('text/plain')">Format texte (.txt)</a></li>
                                    <li><a class="dropdown-item border-radius-md" href="javascript:;" @click.prevent="openSweetAlert('application/json')">Format json (.json)</a></li>
                                    <li><a class="dropdown-item border-radius-md" href="javascript:;" @click.prevent="openSweetAlert('image/*')">Format image (.png)</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    Modifier votre diagramme
                </div>
               
                <div class="card-body overflow-y-scroll">
                    <Transition name="slide-fade">
                        <div v-if="switchTabModif == 'general'">
                            <div class="row">
                                <div class="col-6 col-xs-12">
                                    <h6>Générale</h6>
                                </div>
                                <div class="col-6 col-xs-12" style="text-align: right;">
                                    <button @click.prevent="openModal('modalBulle')" class="btn btn-icon btn-sm btn-primary">
                                        <i class="fas fa-plus-circle fs-6"></i>
                                        Ajouter une donnée
                                    </button>
                                </div>
                            </div>
                            <div class="">
                                <label class="form-label">Titre du diagramme</label>
                                <div class="input-group input-group-outline mb-3">
                                    <input type="text" class="form-control" v-model="diagrammeName">
                                </div>
                                <template v-if="applyGlobalColor">
                                    <div class="">
                                        <div>
                                            <h6 class="form-label">Couleur globale du diagramme</h6>
                                        </div>
                                        <a href="javascript:;" class="switch-trigger background-color">
                                            <color-choice @global-color-function="globalColorFunction"
                                                :global="applyGlobalColor" :globalColor="globalColor"></color-choice>
                                        </a>
                                    </div>

                                </template>
                                <div>
                                    <h6>Voulez-vous appliquer les couleurs de façon global ?</h6>
                                    <div>
                                        <input id="non" type="radio" @click="choiceGlobalOrNot('Non')" checked
                                            class="form-radio" name="color" value="oui">
                                        <label for="non">Non</label>
                                    </div>
                                    <div>
                                        <input id="oui" type="radio" @click="choiceGlobalOrNot('Oui')" class="form-radio"
                                            name="color" value="oui">
                                        <label for="oui">Oui</label>
                                    </div>
                                </div>
                            </div>
                            <hr class="dark horizontal">
                            <div class="row">
                                <div class="col-6 col-xs-12">
                                    <h6>Bulles</h6>
                                </div>
                                <div class="col-6 col-xs-12" style="text-align: right;">
                                    <button @click.prevent="openPanelBulle('bulle')" class="btn btn-icon btn-sm btn-primary">
                                        <i class="fa fa-exchange fs-6"></i>
                                        Manipuler les bulles
                                    </button>
                                </div>
                            </div>
                            <hr class="dark horizontal">
                            <div class="mb-3">
                                <div class="nav-wrapper position-relative end-0">
                                    <ul class="nav nav-pills nav-fill p-1  bg-gray-400" role="tablist">
                                        <li class="nav-item">
                                            <a @click="switchTabFunction('parent')" class="nav-link mb-0 px-0 py-1 "
                                                data-bs-toggle="tab" href="#" role="tab" aria-selected="true">
                                                <i class="fas fa-bolt"></i>
                                                <span class="ms-1">Parent</span>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a @click="switchTabFunction('enfant')" class="nav-link mb-0 px-0 py-1 active"
                                                data-bs-toggle="tab" href="#" role="tab" aria-selected="false">
                                                <i class="fas fa-child"></i>
                                                <span class="ms-1">Enfant</span>
                                            </a>
                                        </li>

                                        <div class="moving-tab position-absolute nav-link"
                                            style="padding: 0px; transition: all 0.5s ease 0s; width: 50%;"
                                            :style="{ transform: ((switchTab == 'parent') ? switchStyleParent : switchStyleEnfant) }">
                                            <a class="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab"
                                                href="javascript:;" role="tab" aria-selected="true">-</a>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="mt-2">
                                <template v-if="!applyGlobalColor">
                                    <div class="mb-4">
                                        <div>
                                            <h6 class="form-label text-bold">Couleur des bulles {{ (switchTab == "enfant") ? " enfants" : "" }}</h6>
                                        </div>
                                        <a href="javascript:void(0)" class="switch-trigger background-color">
                                            <color-choice @modifier-color-bulle="modifierColorBulle"
                                                @global-color-function="globalColorFunction" :global="applyGlobalColor"
                                                :globalColor="globalColor"></color-choice>
                                        </a>
                                    </div>
                                </template>
                                <setting-bulle :switch-tab="switchTab" @modifier-form-bulle="modifierFormBulle"
                                    @modifier-label-text="modifierLabelText" :key="switchTab"></setting-bulle>
                            </div>
                        </div>
                        <div v-else>
                            <div>
                                <div class="row">
                                    <div class="col-6 col-xs-12">
                                        <button @click.prevent="openModal('modalBulle')" class="btn btn-icon btn-sm btn-primary">
                                            <i class="fas fa-plus-circle fs-6"></i>
                                            Ajouter une donnée
                                        </button>
                                    </div>
                                    <div class="col-6 col-xs-12" style="text-align: right;">
                                        <button @click.prevent="openPanelBulle('general')" class="btn btn-sm  btn-primary btn-icon-only">
                                            <i class="fa fa-times-circle fs-6"></i>
                                        </button>
                                    </div>
                                </div>
                                <div v-if="hasNotification">
                                    <notification-view :messageNotification="messageNotification" :classNotification="classNotification"></notification-view>
                                </div>
                                <div class="table-responsive">
                                    <table class="table align-items-center mb-0">
                                        <thead class="bg-dark text-white">
                                            <tr>
                                                <th></th>
                                                <th>ID</th>
                                                <th>Libelle</th>
                                                <th>Parent ID</th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(item, key) in computedDataGraph" :key="key">
                                                <tr>
                                                    <td>
                                                        <input type="checkbox" :name="'isParent_' + key"
                                                            v-model="item.isParent" :checked="item.isParent">
                                                    </td>
                                                    <td>
                                                        <p>{{ item.id }}</p>
                                                    </td>
                                                    <td class="">
                                                        <input type="text" :name="'libelle_' + key" id="libelle" v-model="item.name"/>
                                                    </td>
                                                    <td>
                                                        <input type="number" style="width: 50%;" :name="'parent_' + key"
                                                            id="parent" v-model="item.parent">
                                                    </td>
                                                    <td>
                                                        <button @click="cacheAllChildGraph(item, item.visibility)"
                                                            class="btn btn-sm btn-warning">
                                                            <i :class="[!item.visibility ? 'fa fa-eye' : 'fa fa-eye-slash']"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button @click="modifierBulleSpecifique(key, item)"
                                                            class="btn btn-sm btn-success">
                                                            <i class="fas fa-check"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button @click="deleteData(key, item)"
                                                            class="btn btn-sm btn-danger">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
    <modal-file @actualiser="modalFunctionInitGraph" modeToCall="graphFile" label-button="Afficher le graph" modal-title="Charger un fichier"></modal-file>
    <modal-bulle @ajouter-bulle="addDataGraph" label-button="Ajouter la donnée" modal-title="Ajouter une donnée"></modal-bulle>
</template>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}</style>