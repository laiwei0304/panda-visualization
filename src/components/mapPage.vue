<template>
  <div ref="worldMap" class="map"></div>
</template>


<script>
import * as echarts from "echarts";
import world from "../../public/map/world.json"
import nameMap from "../../public/data/country-name-zh.json"
export default {
  created() {
    this.$nextTick(() => {
      this.initCharts();
    })
  },
  methods: {
    initCharts() {
      const map = echarts.init(this.$refs["worldMap"]);
      var asia = [
        {
          name: "美国",
          value: [-73.97622, 40.757498],
          egName: 'America',
          area: '9370000 km²',
          capital: '华盛顿哥伦比亚特区'
        },
        {
          name: "加拿大",
          value: [-109.404347, 60.638178],
          egName: 'Canada',
          area: '9980000 km²',
          capital: '渥太华'
        },
        {
          name: "澳大利亚",
          value: [137.708144, -25.328065],
          egName: 'Australia',
          area: '7692000 km²',
          capital: '堪培拉'
        },
        {
          name: "中国",
          value: [116.512885, 39.847469],
          egName: 'China',
          area: '9634057 km²',
          capital: '北京'
        },
      ];
      const option = {
        // 背景颜色
        backgroundColor: "#ffffff",
        // 提示浮窗样式
        tooltip: {
          show: false,
          trigger: "item",
          alwaysShowContent: false,
          // backgroundColor: "#0C121C",
          // borderColor: "rgba(0, 0, 0, 0.16);",
          hideDelay: 100,
          // triggerOn: "mousemove",
          // enterable: true,
          // textStyle: {
          //   color: "#DADADA",
          //   fontSize: "12",
          //   width: 20,
          //   height: 30,
          //   overflow: "break",
          // },
          // showDelay: 100
          formatter: function (params, ticket, callback) { return '' }
        },
        // 地图配置
        visualMap: {
          // nameMap: nameMap,
          show: true,
          left: 'left',
          top: 'middle',
          seriesIndex: [0],
          type: 'piecewise',
          pieces: [
            { min: 8, max: 10, color: 'rgb(254,57,101)' },
            { min: 7, max: 8, color: 'rgb(252,157,154)' },
            { min: 4, max: 6, color: 'rgb(249,205,173)' },
            { min: 2, max: 4, color: 'rgb(200,200,169)' },
            { min: 0, max: 2, color: 'rgb(131,175,155)' }
          ],
          textStyle: {
            color: '#000',
          },
          // text: ['熊猫只数'],
        },
        series: [
          {
            z: 1,
            name: "有熊猫国家",
            type: "map",
            mapType: "world",
            coordinateSystem: 'geo',
            // nameMap: nameMap,
            geoIndex: 0,
            roam: true,
            silent: true, //禁用地图的hover事件
            data: [
              { name: 'United States', value: 4, },
              { name: 'Russia', value: 3, },
              { name: 'Japan', value: 9, },
              { name: 'Singapore', value: 3, },
              { name: 'Malaysia', value: 2 },
              { name: 'Indonesia', value: 2, },
              { name: 'Korea', value: 5, },
              { name: 'Australia', value: 5, },
              { name: 'Spain', value: 5 },
              { name: 'France', value: 4 },
              { name: 'Belgium', value: 5 },
              { name: 'United Kingdom', value: 2 },
              { name: 'Netherlands', value: 3 },
              { name: 'Denmark', value: 2 },
              { name: 'Germany', value: 4 },
              { name: 'Austria', value: 2 },
              { name: 'Finland', value: 2 },
              { name: 'Carta', value: 2 }
            ],
          },
          {
            name: "Icon",
            type: 'scatter',
            coordinateSystem: 'geo',
            animation: false,//坐标点是否显示动画
            symbol: 'image://' + './public/icon/panda.png',
            symbolSize: [50, 30],//标记的大小
            symbolOffset: [0, 0],//标记相对于原本位置的偏移
            label: {
              formatter: '{b}',
              position: 'right',
              // show: true,//是否显示地名
              color: '#000',
            },
            z: 9,
            data: asia.length > 0 ? asia : [],
            tooltip: {//仅在 options中最外层的 tooltip.trigger 为 'item'时有效
              show: true,
              position: 'bottom',//提示框位置
              backgroundColor: "rgba(185,197,218,0.8)", //设置背景图片 rgba格式
              borderColor: '#9a9c9d',
              textStyle: {
                color: '#fff'
              },
              formatter: function (params, ticket, callback) {
                var _dt = params.data;
                if (params.data) {
                  var strHtml = '<div>';
                  strHtml += '<table class="table">';
                  // strHtml += '<tr><td colspan="2" style="text-align:center">国家简介</td></tr>';
                  strHtml += '<tr><td>动物园名称：</td><td>' + _dt.name + '</td></tr>';
                  strHtml += '<tr><td>熊猫数量：</td><td>' + _dt.number + '</td></tr>';
                  // strHtml += '<tr><td>首都：</td><td>' + _dt.capital + '</td></tr>';
                  // strHtml += '<tr><td>国土面积：</td><td>' + _dt.area + '</td></tr>';
                  strHtml += '</table>';
                  strHtml += '</div>'
                  return strHtml;
                }
              }
            }
          }
        ],
        // geo: {
        //   map: "world",
        //   roam: true, //开启缩放和平移
        //   show: true,//是否显示地理坐标系组件
        //   zoom: 1.1, //视角缩放比例
        //   nameMap: nameMap,
        //   label: {
        //     // 通常状态下的样式
        //     normal: {
        //       show: false,
        //       textStyle: {
        //         color: "#fff",
        //       },
        //     },
        //     // 鼠标放上去的样式
        //     emphasis: {
        //       show: false,
        //       textStyle: {
        //         color: "#fff",
        //       },
        //     },
        //   },
        //   // 地图区域的样式设置
        //   itemStyle: {
        //     normal: {
        //       borderColor: "rgba(139, 170, 65, .5)",
        //       borderWidth: 1,
        //       // areaColor: {
        //       //   type: "radial",
        //       //   x: 0.5,
        //       //   y: 0.5,
        //       //   r: 0.8,
        //       //   colorStops: [
        //       //     {
        //       //       offset: 0,
        //       //       color: "rgba(139, 170, 65, 0)", // 0% 处的颜色
        //       //     },
        //       //     {
        //       //       offset: 1,
        //       //       color: "rgba(139, 170, 65, .2)", // 100% 处的颜色
        //       //     },
        //       //   ],
        //       //   globalCoord: false, // 缺省为 false
        //       // },
        //       areaColor: "rgba(139, 170, 65, .5)",
        //       // shadowColor: "rgba(139, 170, 65, .5)",
        //       // shadowOffsetX: -2,
        //       // shadowOffsetY: 2,
        //       // shadowBlur: 10,
        //     },
        //     // 鼠标放上去高亮的样式
        //     emphasis: {
        //       focus: "self",
        //       areaColor: "rgba(139, 170, 65, .5)",
        //       borderWidth: 1,
        //     },
        //   },
        //   regions: [
        //     { name: 'United States', value: 4, },
        //     { name: 'Russia', value: 3, },
        //     { name: 'Japan', value: 10, },
        //     { name: 'Singapore', value: 3, },
        //     { name: 'Malaysia', value: 2 },
        //     { name: 'Indonesia', value: 2, },
        //     { name: 'Korea', value: 5, },
        //     { name: 'Australia', value: 5, },
        //     { name: 'Spain', value: 5 },
        //     { name: 'France', value: 4 },
        //     { name: 'Belgium', value: 5 },
        //     { name: 'United Kingdom', value: 2 },
        //     { name: 'Netherlands', value: 3 },
        //     { name: 'Denmark', value: 2 },
        //     { name: 'Germany', value: 4 },
        //     { name: 'Austria', value: 2 },
        //     { name: 'Finland', value: 2 },
        //     { name: 'Carta', value: 2 }]
        // },
        //鼠标悬浮提示框
        // series: [
        //   // {
        //   //     name: "worldMap",
        //   //     type: "map",
        //   //     mapType:"world",
        //   //     coordinateSystem: 'geo',
        //   //     geoIndex: 0,

        //   // },
        //   {
        //     name: "Icon",
        //     type: 'scatter',
        //     coordinateSystem: 'geo',
        //     animation: false,//坐标点是否显示动画
        //     symbol: 'image://' + './public/icon/panda.svg',
        //     symbolSize: [32, 32],//标记的大小
        //     symbolOffset: [0, -15],//标记相对于原本位置的偏移
        //     label: {
        //       formatter: '{b}',
        //       position: 'right',
        //       show: true,//是否显示地名
        //       color: '#000',
        //     },
        //     z: 9,
        //     data: asia.length > 0 ? asia : [],
        //     tooltip: {//仅在 options中最外层的 tooltip.trigger 为 'item'时有效
        //       show: true,
        //       position: 'bottom',//提示框位置
        //       backgroundColor: "rgba(185,197,218,0.8)", //设置背景图片 rgba格式
        //       borderColor: '#9a9c9d',
        //       textStyle: {
        //         color: '#fff'
        //       },
        //       formatter: function (params, ticket, callback) {
        //         var _dt = params.data;
        //         if (params.data) {
        //           var strHtml = '<div>';
        //           strHtml += '<table class="table">';
        //           strHtml += '<tr><td colspan="2" style="text-align:center">国家简介</td></tr>';
        //           strHtml += '<tr><td>中文名称：</td><td>' + _dt.name + '</td></tr>';
        //           strHtml += '<tr><td>英文名称：</td><td>' + _dt.egName + '</td></tr>';
        //           strHtml += '<tr><td>首都：</td><td>' + _dt.capital + '</td></tr>';
        //           strHtml += '<tr><td>国土面积：</td><td>' + _dt.area + '</td></tr>';
        //           strHtml += '</table>';
        //           strHtml += '</div>'
        //           return strHtml;
        //         }
        //       }
        //     }
        //   }
        // ],
      };
      // 地图注册，第一个参数的名字必须和option.geo.map一致
      echarts.registerMap("world", world)

      map.setOption(option);

      map.off('click') //图表渲染前销毁点击事件
      map.on("click", function (args) {
        console.log(args);
        if (args.name == '中国') {
          // /location.href = 'http://www.baidu.com';//测试效果
        }
      })

    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 100%;
}
</style>
