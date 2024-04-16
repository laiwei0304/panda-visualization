<template>
    <div class="my" id="my"></div>
</template>

<script>
import { inject, onMounted, reactive, ref, setBlockTracking } from "vue";
export default {
    setup() {
        // let $http = inject("axios");
        let $echarts = inject("echarts");

        onMounted(() => {

            let icon = 'image://' + './public/icon/test.svg';
            var pandas = ["双双", "欣欣", "大毛", "顺顺", "加盼盼", "加悦悦", "乐乐", "丫丫", "洋洋", "伦伦", "雅伦", "喜伦", "添添", "美香", "小奇迹"];

            //动物园 每3只熊猫在一个动物园的话应写为 “动物园1”,“”,“”
            var zoos = ["{offset|}Chapultepec", "", "", "Calgary", "", "", "Memphis", "", "", "Atlanta", "", "", "", "Simithsonian's National", ""]; // 分组显示的标签（组内如果是偶数加上偏移{offset|}，如果是计数放正中间）
            //动物园类分割线
            var groupSeparates = [true, false, true, false, false, false, true, false, false, false, true, false, false, true];

            var ages = [36, 33, 15, 16, 0, 0, 25, 23, 26, 26, 0, 0, 26, 25, 0];
            var babyAges = [0, 0, 0, 0, 8, 8, 0, 0, 0, 0, 7, 7, 0, 0, 3];

            var outAges = [0, 0, 4, 5, 0, 0, 4, 2, 2, 2, 0, 0, 3, 2, 0];
            var returnAges = [];


            var data = [
                { value: [0, 20], symbol: icon },
                { value: [1, 30], symbol: icon },
                // 添加更多散点数据
            ];

            let chart = $echarts.init(document.getElementById("my"));

            var groupSeparates = [true, false, true, false, false, false, true, false, false, false, true, false, false, true];

            // 指定图表的配置项和数据
            var option = {
                // title: {
                //     text: 'echarts自定义分组-静态'
                // },
                tooltip: {},
                xAxis: [{
                    position: "bottom",
                    data: pandas,
                    axisTick: {
                        length: 20 // 刻度线的长度
                    },
                    axisLabel: {
                        margin: 10 // 标签到轴线的距离
                    }
                }, {
                    position: "bottom",
                    data: zoos,
                    axisTick: {
                        length: 40,
                        interval: function (index, value) {
                            return groupSeparates[index]; // 根据标识分组的刻度线
                        }
                    },
                    axisLabel: {
                        margin: 30,
                        interval: 0, // 显示所有标签
                        rich: {
                            offset: {
                                width: 66,
                            }
                        }
                    }
                }],
                yAxis: {},
                series: [
                    //竹叶

                    {
                        name: '熊猫出国年龄',
                        type: 'scatter',

                        //目前都在竹子上部
                        data: outAges,
                        symbol: 'image://' + './public/icon/test.svg',// 标记的图形
                        symbolSize: 50,
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
                    //竹子
                    // {
                    //     type: 'scatter',

                    //     //目前都在竹子上部
                    //     data: data,
                    // },
                    {
                        type: 'bar',
                        data: ages,
                        z: 1,
                        barWidth: '25%',
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
                    //竹节
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
                        symbolSize: [20, 2],
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
                    //竹笋
                    {
                        type: "pictorialBar",
                        // itemStyle: {
                        //     normal: {
                        //         color: '#2ea043',
                        //     }
                        // },
                        symbol: icon,
                        // symbolClip: true,
                        // symbolPosition: "start",
                        // symbolBoundingData: 30000,
                        data: babyAges,
                        z: 1,
                        animationDuration: 3000,
                        // animationEasing: "elasticOut"
                    },]
            };
            chart.setOption(option);

            // chart.lastBandWidth = 0;
            // // 监听渲染事件，只要bandWidth发生变化，重新设置标签偏移的值
            // chart.on('rendered', function () {
            //     console.log('OK');

            //     // 假设 x 轴的 index 为 0
            //     // const xAxis = chart.getModel().getComponent('xAxis', 0);
            //     // const axisLength = xAxis.getAxisLength();
            //     // console.log(axisLength);
            //     var bandWidth = chart._chartsViews[0].renderTask.context.outputData._layout.bandWidth;
            //     if (chart.lastBandWidth != bandWidth) {
            //         chart.lastBandWidth = bandWidth;
            //         // 延时执行否则echarts渲染异常
            //         setTimeout(() => {
            //             // 加上偏移后重新绘制
            //             var optionNew = { xAxis: [{}, {}] };
            //             // 增量更新偏移值

            //             var test = chart.lastBandWidth;
            //             console.log(test);
            //             optionNew.xAxis[1] = { axisLabel: { rich: { offset: { width: chart.lastBandWidth } } } };
            //             //console.info(optionNew);
            //             chart.setOption(optionNew);
            //             console.log('No');
            //         }, 0);
            //     }
            // });

            // 绘制


        });
    },
};
</script>

<style>
.my {
    width: 100%;
    height: 100%;
    float: left;
    padding: 0.2rem;
    /* background-color: #ffffff; */
}
</style>
