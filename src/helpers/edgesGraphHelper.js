import {ref} from 'vue'

export const edgesH = (dataGraph) => {
    const edgesUse = ref([])
    const edges = ref([])
    dataGraph.forEach((items) => {
        if (items.parent != null) {
            edges.value.push({
                source: items.parent-1,
                target: items.id-1,
                lineStyle: {
                    type: 'dotted',
                    width: 1,
                }
            });

            edgesUse.value.push({
                source: items.parent -1,
                target: items.id-1,
                lineStyle: {
                    type: 'dotted',
                    width: 1,
                }
            });
        }
    });

    return { edgesUse, edges }
}

// dataGraph.filter((element) => element.id == items.parent)[0].name

export const edgesHome = (dataGraph) => {
    const edgesUse = []
    dataGraph.forEach((items, key) => {
        edgesUse[key] = []
        items.forEach((element) => {
            if (element.parent != null) {
                edgesUse[key].push({
                    source: element.parent -1,
                    target: element.id-1,
                    lineStyle: {
                        type: 'solid',
                        width: 1,
                        color : '#ffff'
                    }
                });
            }
        })
    });

    return edgesUse
}