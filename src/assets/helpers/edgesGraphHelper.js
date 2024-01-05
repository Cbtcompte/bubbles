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