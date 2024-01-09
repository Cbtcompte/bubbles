import * as echarts from 'echarts'

export const initGraphWithEvent = (idElement, data, edges, global, saveDataInFile, eventInit) => {
    try {
        const myChart = echarts.init(document.getElementById(idElement), null, {
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
                    data: data,
                    // animation: false,
                    roam: true,
                    links: edges,
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
                        // color: global.value.globalColor, //Générale
                        borderColor: global.value.globalColor
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

        return myChart;
        
    }catch (error) {
        console.log('Un problème '+error)
    }

}

export const initGraphWithoutEvent = (idElement, data, edges, globalColor) => {
    try {
        const myChart = echarts.init(document.getElementById(idElement), null, {
            width: 'auto',
            height: '170',
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
                    data: data,
                    // animation: false,
                    roam: true,
                    links: edges,
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [5, 10],
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    },
                    label: {
                        show: true
                    },
                    itemStyle: {
                        color: globalColor, //Générale
                        borderColor: globalColor // Générale
                    },
                    force: {
                        initLayout: 'circular',
                        repulsion: 100,
                        edgeLength: 100,
                    },
                    edgeLabel: {
                        fontSize: 20,
                        // show : true
                    },
                },
            ]
        });
        
    }catch (error) {
        console.log('Un problème '+error)
    }
}


export const initGraphSelect = (idElement, data, edges) => {
    try {
        const myChart = echarts.init(document.getElementById(idElement), null, {
            width: 'auto',
            height: '900',
        })

        myChart.setOption({
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    draggable: true,
                    data: data,
                    // animation: false,
                    roam: true,
                    links: edges,
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [5, 10],
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    },
                    label: {
                        show: true
                    },
                    force: {
                        initLayout: 'circular',
                        repulsion: 100,
                        edgeLength: 100,
                    },
                },
            ]
        });

        return { myChart }
        
    }catch (error) {
        console.log('Un problème '+error)
    }
}