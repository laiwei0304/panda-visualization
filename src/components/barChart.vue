<template>
    <div class="bar" id="bar"></div>
</template>

<script>
import { inject, onMounted, reactive, ref, setBlockTracking, watch } from "vue";
export default {
    props: {
        type: String, // 声明 type 为 String 类型的 prop
    },
    setup() {
        // let $http = inject("axios");
        let $echarts = inject("echarts");

        onMounted(() => {
            console.log('Type in BarChart:', props.type);
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
            let icon = 'image://' + './public/icon/test.svg';
            var pandas = ["双双", "欣欣", "大毛", "顺顺", "加盼盼", "加悦悦", "乐乐", "丫丫", "洋洋", "伦伦", "雅伦", "喜伦", "添添", "美香", "小奇迹"];

            //动物园 每3只熊猫在一个动物园的话应写为 “动物园1”,“”,“”
            var zoos = ["Chapultepec", "", "", "Calgary", "", "", "Memphis", "", "", "Atlanta", "", "", "", "Simithsonian's National", ""]; // 分组显示的标签（组内如果是偶数加上偏移{offset|}，如果是计数放正中间）
            //动物园类分割线
            var groupSeparates = [true, false, true, false, false, false, true, false, false, false, true, false, false, true];

            var ages = [36, 33, 15, 16, 0, 0, 25, 23, 26, 26, 0, 0, 26, 25, 0];
            var babyAges = [0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 7, 7, 0, 0, 3];

            var outAges = [0, 0, 4, 5, 0, 0, 4, 2, 2, 2, 0, 0, 3, 2, 0];
            var returnAges = [];


            let myChart = $echarts.init(document.getElementById("bar"));

            updateChart(); // 初始渲染

            // 监听 type 的变化，当父组件中 type 发生变化时，更新图表
            watch(() => props.type, () => {
                updateChart();
            });

            let option;

            const updateChart = () => {
                // 在这里使用 props.type 来根据不同的类型加载不同的图表配置
                // 例如，可以使用条件语句，根据 type 的值加载不同的配置项

                let option;

                // 示例：根据不同的 type 加载不同的配置项
                if (props.type === "1") {
                    option = {
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
                            right: '1%',
                            top: '8%',
                            bottom: '-0.1%',

                            //根据X轴标签的长度自适应调整整个画布的高度, 首先会优先保证标签的显示完整
                            containLabel: true
                        },

                        xAxis: [

                            //    { position: "bottom",
                            //     data: pandas,
                            //     axisTick: {
                            //         length: 10 // 刻度线的长度
                            //     },
                            //     axisLabel: {
                            //         margin: 10 // 标签到轴线的距离
                            //     }
                            // }, 
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
                                    margin: 10 // 标签到轴线的距离
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
                                    margin: 30,
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
                            //去掉网格线
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
                                symbol: 'image://' + './public/icon/leaf.svg',// 标记的图形
                                symbolSize: [50, 100],
                                // itemStyle: {
                                //     color: '#24DEF3'
                                // },
                                z: 3,
                                // barGap: '50%',
                                // hoverAnimation: true // 是否开启 hover 在拐点标志上的提示动画效果
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
                                symbolMargin: 17.2, // 小格子的高
                                symbol: "rect",
                                symbolClip: true,
                                symbolSize: [20, 3],
                                symbolPosition: "start",
                                symbolOffset: [0, -35.2],
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
                } else if (props.type === "2") {
                    option = {
                        // 配置项2
                        // ...
                    };
                } else if (props.type === "3") {
                    option = {
                        // 配置项3
                        // ...
                    };
                }

                // 使用刚指定的配置项和数据显示图表
                myChart.value.setOption(option);
            };

        });
        return {
            myChart,
        };
    },
};
</script>

<style>
.bar {
    width: 100%;
    height: 40vh;
    /* background-color: #ffffff; */
}
</style>