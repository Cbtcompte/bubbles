<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, computed } from 'vue';
import SettingBulle from '@/components/customeBulle/SettingBulle.vue'
// import CheckIcon from '@/components/customeBulle/CheckIcon.vue'
import ColorChoice from '@/components/customeBulle/ColorChoice.vue'
// import ModifGraph from '@/views/pages/includes/ModifGraph.vue'
import NotificationView from '@/components/tools/NotificationView.vue';
import ModalView from '@/components/tools/ModalView.vue'


/**
 * 
 * Variable
*/
const diagrammeName = ref('Diagramme à bulle')
const switchTab = ref('parent')
const switchStyleEnfant = ref('translate3d(100%, 0px, 0px)')
const switchStyleParent = ref('translate3d(5%, 0px, 0px)')
const globalColor = ref('#000080')
const applyGlobalColor = ref(false)
const messageNotification = ref('')
const classNotification = ref('')
const hasNotification = ref(false)
const dataUse = ref([])
const edgesUse = ref([])
const edges = ref([])
const modalTitle = ref()
//const parentConfig = ref()
const data = ref([
    {
        id: 1,
        name: "data",
        fixed: true,
        symbol: 'diamond', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        symbolSize: 100, // [width, height]
        visibility: true,
        parent: null,
        isParent: true,
        label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeigth: 'normal'
        },
        itemStyle: {
            color: globalColor.value, //Générale
            borderColor: globalColor.value // Générale
        },
    },
    {
        id: 2,
        name: "data_fils_1",
        symbol: 'diamond',
        symbolSize: 100,
        fixed: true,
        visibility: true,
        parent: 1,
        isParent: true,
        label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeigth: 'normal'
        },
        itemStyle: {
            color: globalColor.value, //Générale
            borderColor: globalColor.value // Générale
        },
    },
    {
        id: 3,
        name: "data_fils_2",
        symbolSize: 100,
        symbol: 'circle',
        fixed: true,
        visibility: true,
        parent: 1,
        isParent: false,
        label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeigth: 'normal'
        },
        itemStyle: {
            color: globalColor.value, //Générale
            borderColor: globalColor.value // Générale
        },
    },
    {
        id: 4,
        name: "data_fils_3",
        fixed: true,
        symbolSize: 100,
        visibility: true,
        symbol: 'circle',
        parent: 1,
        isParent: false,
        label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeigth: 'normal'
        },
        itemStyle: {
            color: globalColor.value, //Générale
            borderColor: globalColor.value // Générale
        },
    },
    {
        id: 5,
        name: "data_fils_4",
        fixed: true,
        symbol: 'circle',
        symbolSize: 100,
        visibility: true,
        parent: 2,
        isParent: false,
        label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeigth: 'normal'
        },
        itemStyle: {
            color: globalColor.value, //Générale
            borderColor: globalColor.value // Générale
        },

    },
    {
        id: 6,
        name: "data_fils_5",
        fixed: true,
        symbol: 'circle',
        symbolSize: 100,
        visibility: true,
        parent: 2,
        isParent: false,
        label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeigth: 'normal'
        },
        itemStyle: {
            color: globalColor.value, //Générale
            borderColor: globalColor.value // Générale
        },
    },
    {
        id: 7,
        name: "data_fils_6",
        symbol: 'diamond',
        fixed: true,
        symbolSize: 100,
        visibility: true,
        parent: null,
        isParent: true,
        label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeigth: 'normal'
        },
        itemStyle: {
            color: globalColor.value, //Générale
            borderColor: globalColor.value // Générale
        },
    },
    {
        id: 8,
        name: "data_fils_7",
        fixed: true,
        symbolSize: 100,
        symbol: 'circle',
        visibility: true,
        parent: 7,
        isParent: false,
        label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeigth: 'normal'
        },
        itemStyle: {
            color: globalColor.value, //Générale
            borderColor: globalColor.value // Générale
        },
    },
])


/**
 * Computed methodes
 * 
 */
const computedNameDiagrame = computed(() => {
    return diagrammeName.value
})


/**
 *  Méthode 
 * 
 */
const switchTabFunction = (typeBulle) => {
    switchTab.value = typeBulle
}

const modifierFormBulle = (parametre) => {
    if (switchTab.value == "parent") {
        dataUse.value.map((item) => {
            if (item.isParent) {
                item[parametre[1]] = parametre[0]
            }
        })
    } else {
        dataUse.value.map((item) => {
            if (!item.isParent) {
                item[parametre[1]] = parametre[0]
            }
        })
    }
}

const modifierLabelText = (parametre) => {
    if (switchTab.value == "parent") {
        dataUse.value.map((item) => {
            if (item.isParent) {
                item.label[parametre[1]] = parametre[0]
            }
        })
    } else {
        dataUse.value.map((item) => {
            if (!item.isParent) {
                item.label[parametre[1]] = parametre[0]
            }
        })
    }
}

const modifierColorBulle = (parametre) => {
    if (switchTab.value == "parent") {
        dataUse.value.map((item) => {
            if (item.isParent) {
                item.itemStyle.color = parametre
                item.itemStyle.borderColor = parametre
            }
        })
    } else {
        dataUse.value.map((item) => {
            if (!item.isParent) {
                item.itemStyle.color = parametre
                item.itemStyle.borderColor = parametre
            }
        })
    }
}

const choiceGlobalOrNot = (value) => {
    if (value == 'Non') {
        dataUse.value.map((item) => {
            item['itemStyle'] = {
                color: '#000080', //Générale
                borderColor: '#000080' // Générale
            }
        })
        applyGlobalColor.value = false
    } else {
        dataUse.value.map((item) => {
            item['itemStyle'] = null
        })
        applyGlobalColor.value = true
    }
}

const globalColorFunction = (color) => {
    globalColor.value = color
}

const openModal = (modalTitre) => {
    modalTitle.value = modalTitre
    // eslint-disable-next-line no-undef
    $('#exampleModalLong').modal('show')
}

const createLinkBettweenData = () => {
    data.value.forEach(element => {
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

const modifierBulleSpecifique = (key, item) => {
    if(item['id'] != item['parent']){
        dataUse.value[key] = item
        console.log(dataUse.value[key])
    }else{
        hasNotification.value = true
        messageNotification.value = "Une bulle ne peut pointer sur elle-même"
        classNotification.value = 'alert-danger'
    }

    createLinkBettweenData()
}

const changeVisibility = (element) => {
    let resulte = true;
    data.value.map((item) => {
        if (item.id == element.id) {
            item.visibility = !element.visibility
            resulte = item.visibility
        }
    })

    return resulte
}

/**
 * Cycle de vie 
 * 
 */
onMounted(() => {
    dataUse.value = data.value
    const myChart = echarts.init(document.getElementById('chart-container'), null, {
        width: 'auto',
        height: '500',
    })

    createLinkBettweenData()

    setInterval(() => {
        myChart.setOption({
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    draggable: true,
                    data: dataUse.value,
                    roam: true,
                    edges: edgesUse.value,
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [5, 10],
                    selectedMode: true,
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
                        repulsion: 200,
                        edgeLength: 200,
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
    }, 200)

    myChart.on('click', function (params) {
        let element = params.data
        let boole = changeVisibility(element)
        if (boole) {
            edgesUse.value = edges.value
            dataUse.value = data.value
        } else {
            edgesUse.value = edges.value.filter(item => item.source !== (element.id - 1))
            dataUse.value.map((item) => {
                if (item.parent == element.id) {
                    item.symbol = 'none'
                }
            })
        }
    });

})

</script>

<template>
    <h4>
        <i class="fas fa-bullseye"></i>
        {{ computedNameDiagrame }}
    </h4>
    <div class="row">
        <div class="col-lg-7 col-md-7 border border-radius-xl border-bottom-primary">
            <div id="chart-container" class="py-4"></div>
            <div class="row mt-2">
                <div class="col-lg-4 col-md-4 mb-1">
                    <button @click="openModal('Modifier/Ajouter/Retirer une bulle')" class="btn btn-sm btn-primary">Ajouter
                        ou retirer des bulles</button>
                </div>
                <div class="col-lg-4 col-md-4 mb-1">
                    <button class="btn btn-sm btn-primary">Exporter sous forme d'un fichier texte (.txt)</button>
                </div>
                <div class="col-lg-4 col-md-4 mb-1">
                    <button class="btn btn-sm btn-primary">Exporter sous forme d'image</button>
                </div>
            </div>
        </div>
        <div class="col-lg-5 col-md-5">
            <div class="card bg-gray-100" style="height: 650px">
                <div class="card-header" style="height: 90px;">
                    <h6 class="mb-0 ">
                        <i class="fas fa-cogs"></i>
                        Configuration du diagramme
                    </h6>
                    <p class="text-sm ">Appliquer des modifications à votre diagramme</p>
                    <hr class="dark horizontal">
                </div>
                <div class="card-body overflow-y-scroll">
                    <h6>Générale</h6>
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
                                    <color-choice @global-color-function="globalColorFunction" :global="applyGlobalColor"
                                        :globalColor="globalColor"></color-choice>
                                </a>
                            </div>

                        </template>
                        <div>
                            <h6>Voulez-vous appliquer les couleurs de façon global ?</h6>
                            <div>
                                <input id="non" type="radio" @click="choiceGlobalOrNot('Non')" checked class="form-radio"
                                    name="color" value="oui">
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
                                    <a class="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab" href="javascript:;"
                                        role="tab" aria-selected="true">-</a>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-2">
                        <template v-if="!applyGlobalColor">
                            <div class="mb-4">
                                <div>
                                    <h6 class="form-label text-bold">Couleur des bulles</h6>
                                </div>
                                <a href="javascript:void(0)" class="switch-trigger background-color">
                                    <color-choice @modifier-color-bulle="modifierColorBulle"
                                        @global-color-function="globalColorFunction" :global="applyGlobalColor"
                                        :globalColor="globalColor"></color-choice>
                                </a>
                            </div>
                        </template>
                        <setting-bulle @modifier-form-bulle="modifierFormBulle" @modifier-label-text="modifierLabelText"
                            :key="switchTab"></setting-bulle>
                    </div>
                    <!-- <div class="d-flex ">
                        <i class="material-icons text-sm my-auto me-1">edit</i>
                        <p class="mb-0 text-sm"> campaign sent 2 days ago </p>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <!-- <modif-graph></modif-graph> -->
    <modal-view tailleModalDialog="modal-lg" :modal-title="modalTitle">
        <template v-slot:body>
            <template v-if="hasNotification">
                <div class="row">
                    <notification-view :class-notification="classNotification" :message-notification="messageNotification"></notification-view> 
                </div>
            </template>
            <div class="table-responsive">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Libelle</th>
                            <th>Parent ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, key) in data" :key="key">
                            <tr>
                                <td>
                                    <input type="checkbox" :name="'isParent_'+key" v-model="item.isParent" :checked="item.isParent">
                                </td>
                                <td>
                                    <p>{{ item.id }}</p>
                                </td>
                                <td>
                                    <input type="text" :name="'libelle_'+key" id="libelle" v-model="item.name">
                                </td>
                                <td>
                                    <input type="number" :name="'parent_'+key" id="parent" v-model="item.parent">
                                </td>
                                <td>
                                    <button @click="modifierBulleSpecifique(key, item)" class="btn btn-sm btn-info">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </template>
    </modal-view>
</template>