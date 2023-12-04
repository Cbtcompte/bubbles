<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue';

onMounted(() => {
    var myChart = echarts.init(document.getElementById('chart-container'), null, {
        width: '900' ,
        height:'600' ,
    })
    myChart.on('click', function (params) {
        console.log(params);
    });
    myChart.setOption({
        title: {
            text: 'Basic Graph'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'cubicOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                draggable : true,
                label: {
                    show: true
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [6, 10],
                edgeLabel: {
                    fontSize: 20
                },
                data: [
                    {
                        name: 'Node 1',
                        x: 300,
                        y: 300
                    },
                    {
                        name: 'Node 2',
                        x: 800,
                        y: 300
                    },
                    {
                        name: 'Node 3',
                        x: 550,
                        y: 100
                    },
                    {
                        name: 'Node 4',
                        x: 550,
                        y: 500
                    },
                    {
                        name: 'Node 5',
                        x: 600,
                        y: 600
                    },
                    {
                        name: 'Node 6',
                        x: 500,
                        y: 600
                    }
                ],

                links: [
                    {
                        source: 'Node 1',
                        target: 'Node 2',
                        symbolSize: [5, 20],
                        label: {
                            show: true
                        },
                        lineStyle: {
                            width: 5,
                            curveness: 0.2
                        }
                    },
                    {
                        source: 'Node 2',
                        target: 'Node 1',
                        label: {
                            show: true
                        },
                        lineStyle: {
                            curveness: 0.2
                        }
                    },
                    {
                        source: 'Node 1',
                        target: 'Node 3'
                    },
                    {
                        source: 'Node 2',
                        target: 'Node 3'
                    },
                    {
                        source: 'Node 2',
                        target: 'Node 4'
                    },
                    {
                        source: 'Node 1',
                        target: 'Node 6'
                    },
                    {
                        source: 'Node 1',
                        target: 'Node 4'
                    }
                ],
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                },
                selectedMode : true,
                select : {
                    itemStyle : {
                        color : 'rgb(255,255,0)'
                    },
                    edgeLabel : {
                        show : true
                    }
                }
            }
    ]
    });
})

</script>

<template>
    <div id="chart-container"></div>
</template>