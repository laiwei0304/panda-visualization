<template>
    <!--绘制echarts-->
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import { getNowChartData } from '@/api/data/orderChart'

export default {
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '500px'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        type: {   //此处为接收父类传递的参数，进行点击切换数据，默认值为1
            type: String,
            default: '1',
            required: true,
        }
    },
    data() {
        return {
            chart: null,
            sidebarElm: null,
            chartData: {  //此处为各个坐标需要的数据的字段
                channel: [],     //渠道
                xdCounts: [],   //下单量
                successCounts: [],  //成功量
                failCounts: [],    //失败量
                closeCounts: []   //关闭量
            },
        }
    },
    watch: {  //此处为关键，监听type值得变化，进行echarts渲染
        type: {
            handler(newValue, oldValue) {
                this.type = newValue;
                this.initChart(); //值发生改变则渲染一次echarts
            }
        }
    },
    mounted() {
        this.initChart();  //初始化echarts

        //监听侧边栏
        if (this.autoResize) {
            this.__resizeHandler = debounce(() => {
                if (this.chart) {
                    this.chart.resize()
                }
            }, 100)
            window.addEventListener('resize', this.__resizeHandler)
        }

        // 监听侧边栏的变化
        this.sidebarElm = document.getElementsByClassName('sidebar	container')[0]
        this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        if (this.autoResize) {
            window.removeEventListener('resize', this.__resizeHandler)
        }

        this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

        this.chart.dispose()
        this.chart = null
    },
    methods: {
        sidebarResizeHandler(e) {
            if (e.propertyName === 'width') {
                this.__resizeHandler()
            }
        },
        //给echarts各个坐标赋值
        setOptions({ channel, xdCounts, successCounts, failCounts, closeCounts } = {}) {
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {

                },
                xAxis: {
                    type: 'category',
                    data: this.chartData.channel,
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                yAxis: [{
                    type: 'value',
                    name: '订单量',
                    yAxisIndex: 0,
                    axisLabel: {
                        formatter: '{value}',
                    },
                }],
                legend: {
                    data: ['下单量', '完工量', '失败量', '关闭量']
                },
                series: [
                    {
                        name: '下单量',
                        type: 'bar',
                        data: this.chartData.xdCounts,
                        itemStyle: {
                            normal: {
                                color: '#00BFFF'
                            }
                        }
                    },
                    {
                        name: '完工量',
                        type: 'bar',
                        data: this.chartData.successCounts,
                        itemStyle: {
                            normal: {
                                color: '#3CB371'
                            }
                        }
                    },
                    {
                        name: '失败量',
                        type: 'bar',
                        data: this.chartData.failCounts,
                        itemStyle: {
                            normal: {
                                color: '	#DB7093'
                            }
                        }
                    },
                    {
                        name: '关闭量',
                        type: 'bar',
                        data: this.chartData.closeCounts,
                        itemStyle: {
                            normal: {
                                color: '#7B68EE'
                            }
                        }
                    }
                ]
            })
        },
        //渲染echarts方法
        initChart() {
            //调用后端接口，获取对应得数据
            getNowChartData().then(re => {
                //此处根据type切换对应得值。根据后端接口来，我这里是将所以得值带过来了取不同得字段
                if (this.type == 1) {
                    //当日数据
                    this.chartData.channel = re.channel;
                    this.chartData.xdCounts = re.xdCounts;
                    this.chartData.successCounts = re.successCounts;
                    this.chartData.failCounts = re.failCounts;
                    this.chartData.closeCounts = re.closeCounts;
                } else {
                    this.chartData.channel = re.channel;
                    this.chartData.xdCounts = re.sumOrder;
                    this.chartData.successCounts = re.sumSuccess;
                    this.chartData.failCounts = re.sumFail;
                    this.chartData.closeCounts = re.sumClose;
                }
                //关键代码，渲染
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions(this.chartData)
            })

        }
    }
}
</script>
