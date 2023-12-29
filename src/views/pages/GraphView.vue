<script setup>
import * as echarts from 'echarts'

import { onMounted, ref, computed } from 'vue';
import { useDataStore } from '@/stores/dataBulles'
import { storeToRefs } from 'pinia'

import SettingBulle from '@/components/customeBulle/SettingBulle.vue'
// import CheckIcon from '@/components/customeBulle/CheckIcon.vue'
import ColorChoice from '@/components/customeBulle/ColorChoice.vue'
// import ModifGraph from '@/views/pages/includes/ModifGraph.vue'
// import NotificationView from '@/components/tools/NotificationView.vue';
// import ModalView from '@/components/tools/ModalView.vue'
import ModalFile from '@/views/partials/ModalFile.vue';
import ModalBulle from '@/views/partials/ModalBulle.vue';


/**
 * 
 * Variable 
 */
const dataStore = useDataStore()
const { dataBulle, getDataBulle } = storeToRefs(dataStore)
const { addDataStore, updateFormeBulle } = dataStore

const diagrammeName = ref('Diagramme à bulle')
const switchTab = ref('parent')
const switchTabModif = ref('general')
const switchStyleEnfant = ref('translate3d(90%, 0px, 0px)')
const switchStyleParent = ref('translate3d(5%, 0px, 0px)')
const globalColor = ref('#000080')
const applyGlobalColor = ref(false)
const initGraphBool = ref(false)
const isLoading = ref(true)
const messageNotification = ref('')
const classNotification = ref('')
const hasNotification = ref(false)
const isActiveGraph = ref(true)
const dataGraph = ref([])
const edgesUse = ref([])
const edges = ref([])
const saveDataInFile = ref([])

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
    if(getDataBulle.value == null || getDataBulle.value.length == 0){
        return false;
    }else{
        return true;
    }
})

const getGraphBulle = computed(() => dataGraph.value)


/**
 *  Méthode 
 * 
 */
const switchTabFunction = (typeBulle) => {
    switchTab.value = typeBulle
}

const openModal = (idModal) => {
  // eslint-disable-next-line no-undef
  $('#'+idModal).modal('show')
}


const modifierFormBulle = (parametre) => {
    if (switchTab.value == "parent") {
        dataGraph.value.map((item) => {
            if (item.isParent) {
                item[parametre[1]] = parametre[0]
            }
        })
    } else {
        dataGraph.value.map((item) => {
            if (!item.isParent) {
                item[parametre[1]] = parametre[0]
            }
        })
    }
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
}

const modifierBulleSpecifique = (key, item) => {
    if (item['id'] != item['parent']) {
        dataGraph.value[key] = item
        //data.value[key] = item
    } else {
        hasNotification.value = true
        messageNotification.value = "Une bulle ne peut pointer sur elle-même"
        classNotification.value = 'alert-danger'
    }

    createLinkBettweenData()
}

// const changeVisibility = (element) => {
//     let resulte = true;
//     data.value.map((item) => {
//         if (item.id == element.id) {
//             item.visibility = !element.visibility
//             resulte = item.visibility
//         }
//     })

//     return resulte
// }

const createFileTextSaveModification = (type) => {   
    // Création d'un objet Blob
    const blob = new Blob([JSON.stringify(saveDataInFile.value)], { type: type });

    // Création d'un objet URL pour le Blob
    const url = window.URL.createObjectURL(blob);

    // Création d'un élément d'ancre pour le téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.txt';

    // Ajout de l'élément d'ancre à la page
    document.body.appendChild(a);

    // Simuler un clic sur l'élément d'ancre pour déclencher le téléchargement
    a.click();

    // Supprimer l'élément d'ancre après le téléchargement
    document.body.removeChild(a);
}

const createLinkBettweenData = async () => {
    edges.value = []
    edgesUse.value = []
    dataGraph.value.forEach(element => {
        if (element.parent != null) {
            edges.value.push({
                source: element.parent - 1,
                target: element.id - 1,
                lineStyle: {
                    type: 'dotted'
                }
            });

            edgesUse.value.push({
                source: element.parent - 1,
                target: element.id - 1,
                lineStyle: {
                    type: 'dotted',
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

             // eslint-disable-next-line no-undef
             $( "#chart-container").show(2000);

            // Option de visualisation
            setInterval(() => {
            }, 1000)
            myChart.setOption({
                animationDurationUpdate: 3000,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        draggable: true,
                        data: getGraphBulle.value,
                        animation: true,
                        roam: true,
                        edges: edgesUse.value,
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [5, 10],
                        selectedMode: "multiple",
                        links: [
                            {
                                lineStyle: {
                                    width: 5,
                                    curveness: 0.2
                                }
                            }
                        ],
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

            // isLoading.value = false

            //Ici je gère la visibilité et la disparution des enfants de la bulle selectionnée
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
                

                // let element = params.data
                //let boole = changeVisibility(element)
                // if (boole) {
                //     edgesUse.value = edges.value
                //     //dataGraph.value = data.value
                //     dataGraph.value.map((item, index) => {
                //         item.symbol = saveSymbol[index].symbol
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
            });
        }catch (error) {
            console.log('Un problème '+error)
        }
    }
}

const visualisation = async () => {
    dataGraph.value = []
    dataStore.getDataBulle.forEach((element) => {
        dataGraph.value.push({
            id: element.id,
            name: element.data,
            fixed: true,
            symbol: (element.isParent) ? "diamond" : element.forme, // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            symbolSize: element.tailleBulle, // [width, height]
            visibility: true,
            parent: element.parent,
            isParent: element.isParent,
            label: {
                show: true,
                color: '#fff',
                fontSize: element.tailleLabel,
                fontFamily: element.fontFamily,
                fontStyle: 'normal',
                fontWeigth: 'normal'
            },
            itemStyle: {
                color: globalColor.value, //Générale
                borderColor: globalColor.value // Générale
            },
        },)
    })
}

const addDataGraph = async (data) =>  {
    let val = {
        id : dataBulle.value.length+1,
        data : data.libelle,
        couleur : "#41D55",
        tailleBulle : 100,
        tailleLabel : 15,
        fontFamily : "sans-serif",
        forme : (data.isParent) ? "diamond" : "circle",
        isParent : data.isParent,
        parent : data.parentId,
    }

    addDataStore(val)

    if(!data.parentId || data.parentId != "#"){
        updateFormeBulle(data.parentId)
    }
    
    await visualisation()
    await createLinkBettweenData()
}

const initGraph = async () => {
    if (dataIsEmpty.value) {
      await visualisation()
      await createLinkBettweenData()
      await initDomForGraph()
    }
}

const changeActiveGraph = async (value) => {
    isActiveGraph.value = value
    if(isActiveGraph.value){
        setTimeout(async () => {
            await initDomForGraph()
        }, 100)
    }
}

const modalFunctionInitGraph = async () => {
    initGraphBool.value =  true
    await initGraph()
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
                <div class="col-3">
                    <div class="">
                        <button @click="changeActiveGraph(true)" class="col-6 btn btn-outline-secondary btn-icon" :class="{'bg-primary text-white' : isActiveGraph}">
                            <i class="fa fa-code-fork"></i> Graph
                        </button>
                        <button @click="changeActiveGraph(false)" class="col-6 btn btn-outline-secondary btn-icon" :class="{'bg-primary text-white' : !isActiveGraph}">
                            <i class="fa fa-code"></i> JSON
                        </button>
                    </div>
                </div>
            </div>
            <div class="border border-radius-xl bg-gray-200" :class="{'overflow-y-scroll' : !isActiveGraph}" style="height: 900px;">
                <div id="" class="py-4">
                    <template v-if="dataIsEmpty">
                        <template v-if="computedActiveGraph">
                            <div id="chart-container">
                                <div style="text-align: center; margin-top: 40%;" v-if="isLoading">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only"></span> Chargement....
                                    </div>
                                </div>
                                <template v-else></template>
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
                <div class="card-header d-flex" style="height: auto;">
                    <div class="col-lg-6 col-md-4">
                        <h6 class="mb-0 ">
                            <i class="fas fa-cogs"></i>
                            Configuration du diagramme
                        </h6>
                        <p class="" style="font-size: 12px;">Appliquer des modifications à votre diagramme</p>
                    </div>
                    <div class="col-lg-6 col-md-4 mb-1" style="text-align: right;">
                        <div class="btn-group dropup" >
                            <button type="button" class="btn btn-sm bttn-icon bg-gradient-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-file-export"></i>
                                Enregistrer
                            </button>
                            <ul class="dropdown-menu px-2 py-3" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item border-radius-md" href="javascript:;" @click.prevent="createFileTextSaveModification('text/plain')">Format texte (.txt)</a></li>
                                <li><a class="dropdown-item border-radius-md" href="javascript:;" @click.prevent="createFileTextSaveModification('image/*')">Format image</a></li>
                            </ul>
                        </div>
                    </div>
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
                                        <i class="fas fa-plus"></i>
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
                            <h6>Bulles</h6>
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
                            <!-- <div class="d-flex ">
                                <i class="material-icons text-sm my-auto me-1">edit</i>
                                <p class="mb-0 text-sm"> campaign sent 2 days ago </p>
                            </div> -->
                        </div>
                        <div v-else>
                            <div>
                                <div class="table-responsive">
                                    <table class="table align-items-center mb-0">
                                        <thead class="bg-dark text-white">
                                            <tr>
                                                <th></th>
                                                <th>ID</th>
                                                <th>Libelle</th>
                                                <th>Parent ID</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(item, key) in dataGraph" :key="key">
                                                <tr>
                                                    <td>
                                                        <input type="checkbox" :name="'isParent_' + key"
                                                            v-model="item.isParent" :checked="item.isParent">
                                                    </td>
                                                    <td>
                                                        <p>{{ item.id }}</p>
                                                    </td>
                                                    <td>
                                                        <input type="text" :name="'libelle_' + key" id="libelle"
                                                            v-model="item.name">
                                                    </td>
                                                    <td>
                                                        <input type="number" style="width: 50%;" :name="'parent_' + key"
                                                            id="parent" v-model="item.parent">
                                                    </td>
                                                    <td>
                                                        <button @click="modifierBulleSpecifique(key, item)"
                                                            class="btn btn-sm btn-info">
                                                            <i class="fas fa-check"></i>
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