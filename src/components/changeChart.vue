<template>
    <div class="cc">
      <div class="content-container" v-if="isChart1Visible">
        <div class="chart1" ref="chart1"></div>
        <div class="text-container">
            <div class="text1">
                <div class="title" style="color: #b9dec9">赠送时期</div>
                <div class="title" style="color: #b9dec9">（1957年-1982年）</div>
                <p class="text-content">从1950年代起，至1982年止，熊猫外交模式一直是纯政治性的赠送模式，
                    既不和商业挂钩，又不采取租借的形式。1982年，为了响应保护濒危动物的全球性号召，
                    中华人民共和国政府宣布从1982年开始停止赠送大熊猫出国。
                    这标志着传统的政治性赠送模式下的“熊猫外交”宣告结束。</p>
            </div>
            <div class="text2">
                <div class="title" style="color:#45b787">巡展与商业性租借时期</div>
                <div class="title" style="color:#45b787">（1983年-1994年）</div>
                <p class="text-content">大熊猫采取短至数月、长至1年巡展的方式出国。
                    大熊猫巡展是一种既可以带有政治色彩，又可以带来商业效益的活动。
                </p>
            </div>
            <div class="text3">
                <div class="title" style="color:#248067">合作研究时期</div>
                <div class="title" style="color:#248067">（1995年至今）</div>
                <p class="text-content">为了解决大熊猫出国带来的种种问题，更好地保护大熊猫，
                    中国野生动物保护协会和中国动物园协会与国际动物保护机构达成协议，
                    中国可以将一对健康、有繁殖能力的大熊猫送至其他国家进行为期10年的合作研究，
                    其间繁殖的后代归中方所有。若大熊猫意外死亡，其遗体也归中方所有。
                    中方可派出技术人员与外方共同进行对大熊猫的研究工作，
                    外方每年付给中方100万美元，10年总共支付1000万美元。</p>
            </div>
        </div>
      </div>
      <div class="content-container" v-else>
        <div class="chart2" ref="chart2"></div>
      </div>
        <div class="icon-container">
            <img src="../assets/down.png" @click="toggleChart"/>
        </div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import * as jquery from 'jquery';
  window.$ = window.jquery = jquery;
  
  export default {
    data() {
      return {
        chart1: null,
        chart2: null,
        isChart1Visible: true,
      };
    },
    mounted() {

        this.$nextTick(() => {
            this.initChart1();
            //this.initChart2();
        })

    },
    methods: {
      initChart1() {
        this.chart1 = echarts.init(this.$refs.chart1);
        
        var xAxisData = [];
        //var yAxisData = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var backData1 = [];
        var backData2 = [];
        var backData3 = [];
        for (var i = 1957; i <=2024; i++) {
            xAxisData.push(i);

            if(i===1957||i===1958||i===1980||i===1982){
                data1.push(1);
            }else if(i===1959){
                data1.push(6);
            }else if(i===1972){
                data1.push(4);
            }else if(i===1973||i===1974||i===1975||i===1978){
                data1.push(2);
            }else{
                data1.push(0);
            }
            
            if(i===1984||i===1994){
                data2.push(2);
            }else if(i===1992){
                data2.push(1);
            }else{
                data2.push(0);
            }

            if(i===1995||i===2002||i===2005||i===2006){
                data3.push(1);
            }else if(i===1996||i===2001||i===2007||i===2009||i===2011||i===2023){
                data3.push(2);
            }else if(i===1999||i===2010||i===2013||i===2013||i===2018||i===2022||i===2020){
                data3.push(3);
            }else if(i===2000||i===2014){
                data3.push(6);
            }else if(i===2003){
                data3.push(7);
            }else if(i===2012){
                data3.push(5);
            }else if(i===2015){
                data3.push(4);
            }else if(i===2017||i===2021){
                data3.push(8);
            }else if(i===2019){
                data3.push(9);
            }else{
                data3.push(0);
            }

            if(i===1984){
                backData2.push(-2);
            }else{
                backData2.push(0);
            }

            if(i===2001||i===2010||i===2013||i===2017){
                backData3.push(-2);
            }else if(i===2003||i===2004||i===2014||i===2018){
                backData3.push(-1);
            }else if(i===2019){
                backData3.push(-3);
            }else if(i===2020){
                backData3.push(-4);
            }else{
                backData3.push(0);
            }

        }
        var option = {
        title: {
            text: '历年出（回）国熊猫数量 / 只',
            left: "center",
            top: 0,
            textStyle: {
                show:true,
                fontWeight:'normal',
                color: "#000000",
                fontSize: '20',
            },                 
        },
        legend: {
            data: ['赠送', '巡展与商业性租借','合作研究'],
            show:false
        },
        xAxis: {
            data: xAxisData,
            splitLine: {
                show: false,
            }
        },
        yAxis: {
            splitLine: {
                show: true,
                lineStyle: {
                    color:['#cfcfcf'],
                }
            }
        },
        series: [
            {
            name: '赠送时期-出国',
            type: 'bar',
            barWidth: '30%',
            data: data1,
            color: '#b9dec9',
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10;
            }
            },
            {
            name: '赠送时期-回国',
            type: 'bar',
            barWidth: '30%',
            data: backData1,
            color: '#b9dec9',
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10;
            }
            },
            {
            name: '巡展与商业性租借时期-出国',
            type: 'bar',
            barWidth: '30%',
            data: data2,
            color:'#45b787',
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
            },
            {
            name: '巡展与商业性租借时期-回国',
            type: 'bar',
            barWidth: '30%',
            data: backData2,
            color:'#45b787',
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
            },
            {
            name: '合作研究时期-出国',
            type: 'bar',
            barWidth: '30%',
            data: data3,
            color:'#248067',
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 200;
            }
            },
            {
            name: '合作研究时期-回国',
            type: 'bar',
            barWidth: '30%',
            data: backData3,
            color:'#248067',
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 200;
            }
            },
            {
            name: '2023年回国',
            type: 'scatter',
            data: [[67,-1]],
            symbolSize: 20,
            symbol: "image://data:image/png;base64,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",
            emphasis: {
                focus: 'series'
            },
            animationDelay: function (idx) {
                return idx * 10 + 200;
            },
            tooltip: {
                formatter:"2023年，由于新冠疫情，回国熊猫数量达到18只~"
            },
            },
        ],
        tooltip: 
        {
            trigger: 'item',
        },
        grid:
        {
            //调整在容器中位置
            left: '1%',
            right: '1%',
            top: '30%',
            bottom: '1%',

            //根据X轴标签的长度自适应调整整个画布的高度, 首先会优先保证标签的显示完整
            containLabel: true
        },
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
        };
        option && this.chart1.setOption(option);

      },
      initChart2() {
        this.chart2 = echarts.init(this.$refs.chart2);

        var data = [
            {   name: '签署合作协定',
                itemStyle: {color: '#83cbac'},
                tooltip: {
                    position: [900, 100],
                    extraCssText: 'max-width:250px; white-space:pre-wrap;text-indent: 3ch;line-height: 2em;font-size: 13px;',
                    formatter:function(p){
                        return '<div>赠送或租借熊猫往往是作为两国关系加强和深化的象征性举措之一。签署合作协定进一步巩固了两国之间的友好关系，并为未来的合作提供了框架和指导。熊猫外交也为两国带来了经济合作的机会。熊猫的到来通常会引发旅游业的繁荣，吸引更多游客和投资。此外，熊猫外交还可以促进两国在科研、教育、文化产业等领域的合作与交流，带来经济效益。</div>'
                    }
                },
                children: [
            {   name: '澳大利亚',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '英国',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '法国',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '马来西亚',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '荷兰',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '德国',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '芬兰',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '丹麦',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '俄罗斯',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '奥地利',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '卡塔尔',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '韩国',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '泰国',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            {   name: '新加坡',
                value: 1,
                tooltip: {
                    show:false
                },
            },
            ]
            },
            {   name: '庆祝建交周年',
                itemStyle: {color: '#d2d97a'},
                tooltip: {
                    position: [100, 250],
                    extraCssText: 'max-width:250px; white-space:pre-wrap;text-indent: 3ch;line-height: 2em;font-size: 13px;',
                    formatter:function(p){
                        return '<div>庆祝建交周年是两国关系中的重要纪念活动，通过这一机会，两国可以回顾和庆祝双边关系的发展历程，强调双方的友好合作和互信。赠送或租借熊猫作为其中的一部分，进一步增强了这一纪念活动的意义和特殊性。</div>'
                    }
                },
                children: [
                {   name: '俄罗斯',
                    value:1,
                    itemStyle: {color: '#e2e7bf'},
                    tooltip: {
                        show:false
                    },
                },
                {   name: '荷兰',
                    value:1,
                    itemStyle: {color: '#e2e7bf'},
                    tooltip: {
                        show:false
                    },
                },
                {   name: '德国',
                    value:1,
                    itemStyle: {color: '#e2e7bf'},
                    tooltip: {
                        show:false
                    },
                },
                {   name: '马来西亚',
                    value:1,
                    itemStyle: {color: '#e2e7bf'},
                    tooltip: {
                        show:false
                    },
                },
                {   name: '西班牙',
                    value:1,
                    itemStyle: {color: '#e2e7bf'},
                    tooltip: {
                        show:false
                    },
                },
                ]
            },
            {   name: '其他',
                itemStyle: {color: '#add5a2'},
                tooltip: {
                    position: [100, 50],
                    extraCssText: 'max-width:250px; white-space:pre-wrap;text-indent: 3ch;line-height: 2em;font-size: 13px;',
                    formatter:function(p){
                        return '<div>赠送或租借熊猫还可以因为其他外交事件。例如，2017年一带一路印尼峰会暨全印尼县政府自主博览会启动大会在杭州召开，一份雅万高铁贷款协议也在杭州正式签署。同年，熊猫彩陶和湖春来到印尼。</div>'
                    }
                },
                children: [
                {   name: '美国',
                    value:1,
                    itemStyle: {color: '#dfecd5'},
                    tooltip: {
                        show:false
                    },
                },
                {   name: '印尼',
                    value:1,
                    itemStyle: {color: '#dfecd5'},
                    tooltip: {
                        show:false
                    },
                },
                {   name: '比利时',
                    value:1,
                    itemStyle: {
                        color: '#dfecd5',
                    },
                    tooltip: {
                        show:false
                    },
                },
                ],
            }
        ];
        var option2 = {
        title: {
            text: '赠送(租借)熊猫原因',
            left: "center",
            textStyle: {
                show:true,
                fontWeight:'normal',
                color: "#000000",
                fontSize: '20',
            },                 
        },
        series: [{
            type: 'sunburst',
            data: data,
            radius: [20, '80%'],
            itemStyle: {
                borderRadius: 7,
                borderWidth: 2,
                color: '#b9dec9',
            },
            levels: [
                {
                    // 留给数据下钻的节点属性
                    itemStyle: {
                        color: '#b0d5df'
                    },
                },
            ],
        },

        ],
        tooltip: 
        {
            trigger: 'item',
        },
        };
        option2 && this.chart2.setOption(option2);

      },
      toggleChart() {
        this.isChart1Visible = !this.isChart1Visible;
        if (this.isChart1Visible) {
            this.$nextTick(() => {
                this.initChart1(); 
            });
        } else {
            this.$nextTick(() => {
                this.initChart2(); 
            });
        }
      },
    },
  };
  </script>

<style scoped>
    .cc{
        width: 1260px;
        height: 490px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .content-container{
        flex: 9;
        display: flex;
        flex-direction: column;
    }
    .text-container{
        margin-top: 30px;
        background-color: white;
        height: 200px;
        flex:1;
        display: flex;
    }
    .text1{
        flex:2.6;
        display: flex;
        flex-direction: column;
        height: 200px;
    }
    .title{
        flex:1;
        text-align: center;
        margin-top: 1px;
        font-size: 14px;
        font-weight: bold;
    }
    .text-content{
        flex:9;
        margin: 20px;
        text-indent: 3ch;
        line-height: 2em;
        font-size: 13px;
    }
    .text2{
        flex:1;
        margin-left: 9px;
        border-right: 1px solid rgb(207, 207, 207);
        border-left: 1px solid rgb(207, 207, 207);
        height: 200px;
    }
    .text3{
        flex:2.8;
        margin-left: 9px;
        height: 200px;
    }
    .chart1{
        /* margin-top: 20px; */
        background-color: white;
        height: 200px;
        flex:1;
    }
    .chart2{
        flex:1;
        /* margin-top: 20px; */
        background-color: white;
        height: 420px;
    }
    .icon-container{
      flex: 1;
      display: flex;
      justify-content: space-around;
      height: 50px;
    }
    .icon-container img{
      width: 50px;
      height: 50px;
    }
</style>