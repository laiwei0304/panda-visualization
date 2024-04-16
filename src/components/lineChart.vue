<template>
    <div class="line" id="line"></div>
</template>

<script>
import { inject, onMounted, reactive, ref, setBlockTracking } from "vue";
export default {
    setup() {
        // let $http = inject("axios");
        let $echarts = inject("echarts");

        onMounted(() => {

            let myChart = $echarts.init(document.getElementById("line"));

            let option = {
                //     grid: {
                //         //调整在容器中位置
                //         left: '1%',
                //         right: '1%',
                //         top: '8%',
                //         bottom: '0%',

                //         //根据X轴标签的长度自适应调整整个画布的高度, 首先会优先保证标签的显示完整
                //         containLabel: true
                //     },
                grid: {
                    //调整在容器中位置
                    left: '1%',
                    right: '1%',
                    top: '25%',
                    bottom: '1%',
                    //根据X轴标签的长度自适应调整整个画布的高度, 首先会优先保证标签的显示完整
                    containLabel: true
                },
                title: {
                    text: '熊猫平均年龄',
                    left: 'left',
                    top: 0,
                    textStyle: {
                        color: '#000',
                        fontSize: 15
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                xAxis: {
                    type: 'category',
                    data: ['出国年龄', '回国年龄', '寿命']
                },
                yAxis: {
                    name: '年龄',
                    type: 'value'
                },
                series: [
                    {
                        data: [3, 26, 30],
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#fe3965', //改变折线点的颜色
                                lineStyle: {
                                    color: '#fc9d9a' //改变折线颜色
                                }
                            }
                        },
                    }
                ]
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
.line {
    width: 50%;
    height: 40vh;
    float: left;
    padding: 0.2rem;
    /* background-color: #ffffff; */
}
</style>