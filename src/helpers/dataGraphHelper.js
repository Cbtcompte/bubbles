import {ref} from 'vue'
import { toastWarning } from '@/helpers/toastHelper.js'


const dataGraphVa = ref([])
const resultDataGraph = ref([])
const idParentTab = ref([])

export const dataGraphH = (dataStart, global, applyGlobalColor, diagrammeStore) => {
    dataGraphVa.value = []
    idParentTab.value = []
    dataStart.forEach((element) => {

        if(element.parent == element.id){
            toastWarning("Une bulle ne peut pointer sur elle-même")
        }

        idParentTab.value.push((element.parent == element.id) ? null : element.parent)
        if(element.isParent){
            dataGraphVa.value.push({
                id: element.id,
                name: element.data,
                fixed: true,
                symbol: ((diagrammeStore.diagrammeModel != undefined && diagrammeStore.diagrammeModel.length != 0) || applyGlobalColor.value.globalSymbolEnfant) ? global.value.globalSymbolParent : element.forme, // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
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
                    color:  (diagrammeStore.diagrammeModel != undefined && diagrammeStore.diagrammeModel.length != 0) ? global.value.globalCouleurParent  : ((applyGlobalColor.value.globalCouleurParent) ? global.value.globalCouleurParent : element.couleur), //Générale
                    borderColor: (diagrammeStore.diagrammeModel != undefined && diagrammeStore.diagrammeModel.length != 0) ? global.value.globalCouleurParent : ((applyGlobalColor.value.globalCouleurParent) ? global.value.globalCouleurParent : element.couleur), // Générale
                },
            },)
        }else{
            dataGraphVa.value.push({
                id: element.id,
                name: element.data,
                fixed: true,
                symbol: ((diagrammeStore.diagrammeModel != undefined && diagrammeStore.diagrammeModel.length != 0) || applyGlobalColor.value.globalSymbolEnfant) ? global.value.globalSymbolEnfant : element.forme, // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
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
                    color:  (diagrammeStore.diagrammeModel != undefined && diagrammeStore.diagrammeModel.length != 0) ? global.value.globalCouleurEnfant  : ((applyGlobalColor.value.globalCouleurEnfant) ? global.value.globalCouleurEnfant : element.couleur), //Générale
                    borderColor: (diagrammeStore.diagrammeModel != undefined && diagrammeStore.diagrammeModel.length != 0) ? global.value.globalCouleurEnfant  : ((applyGlobalColor.value.globalCouleurEnfant) ? global.value.globalCouleurEnfant : element.couleur), // Générale
                },
            },)
        }
    })

    return { dataGraphVa, idParentTab };
}

export const dataGraphHome = (graphConfig, dataStart) => {
    graphConfig.forEach((item, key) => {
        resultDataGraph.value[key] = []
        dataStart.forEach((element) => {
            resultDataGraph.value[key].push({
                id: element.id,
                name: element.data,
                fixed: true,
                symbol: (element.isParent) ? item.formeParent : item.formeEnfant, // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                symbolSize: item.tailleBulle, // [width, height]
                visibility: true,
                parent: (element.parent == element.id) ? null : element.parent,
                isParent:  element.isParent,
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: item.fontSize,
                    fontFamily: item.fontFamily,
                    fontStyle: 'normal',
                    fontWeigth: 'normal'
                },
                itemStyle: {
                    color:  graphConfig.couleur, //Générale
                    borderColor: graphConfig.couleur // Générale
                },
            },)
        })
    })
    

    return resultDataGraph.value ;
}