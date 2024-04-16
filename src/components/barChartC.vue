<template>
    <div class="bar" id="bar"></div>
</template>

<script>
import { inject, onMounted, reactive, ref, setBlockTracking, watchEffect } from "vue";
import test from "@/assets/icon/test.svg"
import leaf from "@/assets/icon/leaf.svg"
export default {
    props: {
        type: String, // 声明 type 为 String 类型的 prop
    },
    setup() {
        // let $http = inject("axios");
        let $echarts = inject("echarts");

        onMounted(() => {
            // 监听 type 的变化
            // watchEffect(() => props.type, (newType, oldType) => {
            //     console.log('Type changed in BarChart:', newType);

            //     // 在这里可以根据新的 type 执行相应的逻辑，例如重新渲染图表等
            // });
            // let myChart = $echarts.init(document.getElementById("bar"));

            // var xAxisData = ["长裤", "短裤", "衬衣", "羊毛衫", "背心", "皮鞋"];
            // //var xAxisGroupData =  [ "裤子", "裤子", "衣服", "衣服", "衣服" , "鞋子" ];
            // var xAxisGroupData = ["{offset|}裤子", "", "", "{offset|}衣服", "", "鞋子"]; // 分组显示的标签（组内如果是偶数加上偏移{offset|}，如果是计数放正中间）
            // var seriesData = [15, 20, 10, 5, 15, 10];

            // var groupSeparates = [true, false, true, false, false, true]; // 分组分隔线

            // // 指定图表的配置项和数据
            // var option = {
            //     title: {
            //         text: 'echarts自定义分组-静态'
            //     },
            //     tooltip: {},
            //     xAxis: [{
            //         position: "bottom",
            //         data: xAxisData,
            //         axisTick: {
            //             length: 20 // 刻度线的长度
            //         },
            //         axisLabel: {
            //             margin: 10 // 标签到轴线的距离
            //         }
            //     }, {
            //         position: "bottom",
            //         data: xAxisGroupData,
            //         axisTick: {
            //             length: 40,
            //             interval: function (index, value) {
            //                 return groupSeparates[index]; // 根据标识分组的刻度线
            //             }
            //         },
            //         axisLabel: {
            //             margin: 30,
            //             interval: 0, // 显示所有标签
            //             rich: {
            //                 offset: {
            //                     width: 0
            //                 }
            //             }
            //         }
            //     }],
            //     yAxis: {},
            //     series: [{
            //         type: 'bar',
            //         data: seriesData
            //     }]
            // };
            let icon = 'image://' + test;
            var pandas = ["伦伦", "喜伦", "雅伦", "洋洋"];
            //动物园 每3只熊猫在一个动物园的话应写为 “动物园1”,“”,“”
            var zoos = ["哥伦比亚动物园"]; // 分组显示的标签（组内如果是偶数加上偏移{offset|}，如果是计数放正中间）
            //动物园类分割线
            var groupSeparates = [true, false, false, false, true];

            var ages = [24, 0, 0, 24];
            var babyAges = [0, 7, 7, 0];

            var outAges = [[0, 2], [3, 6]];
            var returnAges = [];

            let myChart = $echarts.init(document.getElementById("bar"));

            let option = {

                // tooltip: {
                //     trigger: 'axis',
                //     axisPointer: {
                //         type: 'shadow'
                //     }
                // },

                //横轴伸缩功能
                // dataZoom: [
                //     {
                //         type: 'inside',
                //         start: 0,
                //         end: 10
                //     },
                //     {
                //         start: 0,
                //         end: 10
                //     }
                // ],
                grid: {
                    //调整在容器中位置
                    left: '1%',
                    right: '75%',
                    top: '9%',
                    bottom: '0%',

                    //根据X轴标签的长度自适应调整整个画布的高度, 首先会优先保证标签的显示完整
                    containLabel: true
                },

                xAxis: [

                    {
                        position: "bottom",
                        data: pandas,
                        axisTick: {
                            length: 10 // 刻度线的长度
                        },
                        axisLabel: {
                            margin: 10 // 标签到轴线的距离
                        }
                    },
                    {
                        position: "bottom",
                        data: zoos,
                        axisTick: {
                            length: 10,
                            interval: function (index, value) {
                                return groupSeparates[index]; // 根据标识分组的刻度线
                            }
                        },
                        axisLabel: {
                            margin: 30 // 标签到轴线的距离
                        },
                        //该坐标分区背景的颜色
                        // splitArea: {
                        //     show: true,
                        //     areaStyle: {
                        //         color: ['rgba(204,232,207,0.8)'
                        //             , 'rgba(250,250,250,0.3)', 'rgba(250,250,250,0.3)'
                        //             , 'rgba(204,232,207,0.8)', 'rgba(204,232,207,0.8)'
                        //             , 'rgba(250,250,250,0.3)', 'rgba(250,250,250,0.3)'
                        //             , 'rgba(204,232,207,0.8)', 'rgba(204,232,207,0.8)', 'rgba(204,232,207,0.8)'
                        //             , 'rgba(250,250,250,0.3)', 'rgba(250,250,250,0.3)', 'rgba(250,250,250,0.3)'
                        //         ]
                        //     }
                        // },

                        //设置坐标不重叠
                        axisLabel: {
                            margin: 25,
                            interval: 0, // 显示所有标签
                            rich: {
                                offset: {
                                    width: 0,
                                }
                            }
                        }
                    }],
                yAxis: {
                    type: 'value',
                    name: '年龄',

                    interval: 5,
                    // //去掉网格线
                    // splitLine: {
                    //     show: false
                    // },
                },
                series: [
                    {
                        name: '熊猫出国年龄',
                        type: 'scatter',

                        //目前都在竹子上部
                        data: outAges,
                        symbol: 'image://' + leaf,// 标记的图形
                        symbolSize: [50, 100],
                        // itemStyle: {
                        //     color: '#24DEF3'
                        // },
                        z: 3,
                        // barGap: '50%',
                        hoverAnimation: true, // 是否开启 hover 在拐点标志上的提示动画效果
                        tooltip: {
                            trigger: 'axis',
                            show: false,
                        },
                    },
                    {
                        type: 'bar',
                        barGap: '-100%',
                        symbol: 'rect',
                        symbolPosition: "start",
                        symbolOffset: [0, 0],
                        data: ages,
                        // barWidth: '50%',
                        z: 1,
                        barWidth: '25%',
                        tooltip: {
                            trigger: 'axis',
                            show: false,
                        },
                        silent: true, //禁用地图的hover事件
                        itemStyle: {
                            normal: {
                                //这里是重点
                                color: function (params) {
                                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                    var colorList = ['#248067', '#248067', '#69a794', '#69a794', '#69a794', '#69a794',
                                        '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840',
                                        '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840',
                                        '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840', '#1a6840'];
                                    return colorList[params.dataIndex]
                                }
                            }
                        }
                    },
                    {
                        type: "pictorialBar",
                        // itemStyle: {
                        //     normal: {
                        //         color: '#2ea043',
                        //     }
                        // },
                        symbol: icon,
                        symbolSize: ['50%', '100%'],
                        // symbolClip: true,
                        // symbolPosition: "start",
                        // symbolBoundingData: 30000,
                        data: babyAges,
                        z: 1,
                        animationDuration: 3000,
                        // animationEasing: "elasticOut"
                    },
                    {
                        type: "pictorialBar",
                        itemStyle: {
                            normal: {
                                color: "#ffffff"
                            }
                        },
                        symbolRepeat: "fixed",
                        symbolMargin: 26.3, // 小格子的高
                        symbol: "rect",
                        symbolClip: true,
                        symbolSize: [20, 3],
                        symbolPosition: "start",
                        symbolOffset: [0, -51.5],
                        symbolBoundingData: 30000,
                        data: ages,
                        z: 2,
                        animationDuration: 3000,
                        tooltip: {
                            trigger: 'axis',
                            show: false,
                        },
                        // animationEasing: "elasticOut"
                    },

                ],

            };

            // 使用刚指定的配置项和数据显示图表
            myChart.setOption(option);


            // option && myChart.setOption(Newoption);
            // myChart.lastBandWidth = 0;

            // // 监听渲染事件，只要bandWidth发生变化，重新设置标签偏移的值
            // myChart.on('rendered', function () {
            //     var bandWidth = myChart._chartsViews[0].renderTask.context.outputData._layout.bandWidth;

            //     // 假设 yAxisIndex 为 0，表示第一个 y 轴
            //     var yAxisIndex = 0;
            //     // 获取 y 轴实例
            //     var yAxis = myChart.getModel().getComponent('yAxis', yAxisIndex);
            //     // 获取 y 轴长度
            //     var yAxisLength = myChart.getCoordinateSystem().getAxis(yAxisIndex).getAxisLength();
            //     // 获取 y 轴刻度数
            //     var yAxisTickCount = yAxis.getTicks().length;
            //     // 计算每个刻度值之间的长度
            //     var intervalLength = yAxisLength / (yAxisTickCount - 1);
            //     if (myChart.lastBandWidth != bandWidth) {
            //         myChart.lastBandWidth = bandWidth;
            //         // 延时执行否则echarts渲染异常
            //         setTimeout(() => {
            //             // 加上偏移后重新绘制
            //             var optionNew = { xAxis: [{}, {}], series: [{}, {}, {}] };
            //             // 增量更新偏移值
            //             optionNew.xAxis[1] = { axisLabel: { rich: { offset: { width: myChart.lastBandWidth } } } };
            //             optionNew.series[2] = {
            //                 symbolMargin: intervalLength, symbolOffset: [0, intervalLength]
            //             };
            //             //console.info(optionNew);
            //             myChart.setOption(optionNew);
            //         }, 0);
            //     }

            // });

        });
    },
};
</script>

<style>
.bar {
    /* position: absolute;
    top: 55vh;
    left: 1rem; */
    width: 100%;
    height: 100%;
    /* background-color: #ffffff; */
}
</style>