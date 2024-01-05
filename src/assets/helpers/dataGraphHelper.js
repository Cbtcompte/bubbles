import {ref} from 'vue'
import { toastWarning } from '@/assets/helpers/toastHelper.js'


const dataGraphVa = ref([])
const resultDataGraph = ref([])
const idParentTab = ref([])

export const dataGraph = (dataStart, globalColor) => {

    dataStart.forEach((element) => {

        if(element.parent == element.id){
            toastWarning("Une bulle ne peut pointer sur elle-même")
        }

        idParentTab.value.push((element.parent == element.id) ? null : element.parent)

        dataGraphVa.value.push({
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
                color:  globalColor, //Générale
                borderColor: globalColor // Générale
            },
        },)
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