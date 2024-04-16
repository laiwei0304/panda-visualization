<template>
  <div class="map" id="map"></div>
</template>

<script>
import axios from "axios";
import { map } from "d3-array";
import panda from "@/assets/icon/panda.png"
import { onMounted, reactive, inject, ref } from "vue";
import mapData from "@/assets/map/world.json"
// import nameMap from "../../public/data/country-name-zh.json"
export default {
  setup() {
    let $echarts = inject("echarts");
    // let mapData = reactive({});
    const pandaData = ref([]);

    // 解析 CSV 数据的函数
    // function parseCSV(csvData) {
    //   const rows = csvData.split('\n');
    //   const result = [];
    //   for (const row of rows) {
    //     const columns = row.split(',');
    //     result.push(columns);
    //   }
    //   return result;
    // }

    // async function getState() {
    //   mapData = await axios.get("http://localhost:5173/map/world.json");
    //   try {
    //     // 使用 fetch API 获取 CSV 文件内容
    //     const response = await fetch('http://localhost:5173/data/panda.csv');
    //     const csvData = await response.text();

    //     // 处理 CSV 数据,例如将其转换为数组
    //     pandaData.value = parseCSV(csvData);
    //     console.log(pandaData.value);
    //   } catch (error) {
    //     console.error('Error loading CSV data', error);
    //   }
    // }

    onMounted(() => {
      console.log("map", mapData);
      $echarts.registerMap("world", mapData);
      let myChart = $echarts.init(document.getElementById("map"));
      var asia = [
        {
          name: "亚特兰大动物园",
          value: [-84.42, 33.77],
          number: '4',
        },
        {
          name: "马德里动物园",
          value: [-3.75, 40.41],
          number: '5',
        },
        {
          name: "博瓦勒动物园",
          value: [5.07, 45.70],
          number: '4',
        },
        {
          name: "天堂动物园",
          value: [3.85, 50.58],
          number: '5',
        },
        {
          name: "欧维汉动物园",
          value: [4.99, 52.18],
          number: '2',
        },
        {
          name: "柏林动物园",
          value: [13.41, 52.51],
          number: '4',
        },
        {
          name: "哥本哈根动物园",
          value: [12.57, 55.68],
          number: '2',
        },
        {
          name: "莫斯科动物园",
          value: [37.61, 55.75],
          number: '2',
        },
        {
          name: "艾赫泰里动物园",
          value: [24.06, 62.55],
          number: '2',
        },
        {
          name: "三星爱宝乐园",
          value: [127.17, 37.18],
          number: '5',
        },
        {
          name: "上野动物园",
          value: [139.46, 35.42],
          number: '2',
        },
        {
          name: "冒险世界",
          value: [135.43, 34.00],
          number: '2',
        },
        {
          name: "马来西亚国家动物园",
          value: [101.75, 3.21],
          number: '2',
        },
        {
          name: "河川动物园",
          value: [103.81, 1.35],
          number: '2',
        },
        {
          name: "印尼野生动物园",
          value: [107.60, -6.90],
          number: '2',
        },
        {
          name: "阿德莱德动物园",
          value: [138.49, -35.21],
          number: '2',
        },
        {
          name: "豪尔熊猫馆",
          value: [51.52, 25.28],
          number: '2',
        },
        {
          name: "美泉宫动物园",
          value: [16.3, 48.2],
          number: '2',
        }
      ];
      myChart.setOption({
        layoutCenter: ['50%', '50%'],//位置
        layoutSize: '170%',//大小

        tooltip: {
          trigger: "item"
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        // title: {
        //   text: "城市销量",
        //   left: "45%",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 20,
        //     textShadowBlur: 10,
        //     textShadowColor: "#33ffff"
        //   }
        // },
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
            { min: 2, max: 4, color: 'rgb(90, 160, 86)' },
            { min: 0, max: 2, color: 'rgb(131,175,155)' }
          ],
          textStyle: {
            color: '#000',
          },
          // text: ['熊猫只数'],
        },
        geo: {
          // z: 10,
          show: true,
          map: "world",
          zoom: 1.1,
          // silent: true, //禁用地图的hover事件
          label: {
            normal: {
              show: false,
              fontSize: 12,
            },
            emphasis: {
              show: false,
            },
            // regions: [
            //   {
            //     name: 'China', // 区域的名称,确保使用地图数据中定义的正确名称
            //     selected: true, // 设置为 true 表示该区域高亮显示
            //     itemStyle: {
            //       emphasis: {
            //         areaColor: '#FFD700' // 高亮显示时的区域颜色
            //       }
            //     }
            //   }
            // ]
          },
          regions: [
            { name: 'United States', value: 4, },
            { name: 'Russia', value: 3, },
            { name: 'Japan', value: 10, },
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
          roam: true,

          itemStyle: {
            normal: {
              areaColor: '#dee1e6',
              borderColor: '#ffffff',
            },
            // emphasis: {
            //   areaColor: '#0099CC',
            //   focus: "self",
            // }
          },
          // projection: {
          //   project: point => [
          //     (point[0] / 180) * Math.PI,
          //     -Math.log(Math.tan((Math.PI / 2 + (point[1] / 180) * Math.PI) / 2))
          //   ],
          //   unproject: point => [
          //     (point[0] * 180) / Math.PI,
          //     ((2 * 180) / Math.PI) * Math.atan(Math.exp(point[1])) - 90
          //   ]
          // }
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
              { name: 'Japan', value: 10, },
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
            symbol: 'image://' + panda,
            symbolSize: [25, 25],//标记的大小
            symbolOffset: [0, 0],//标记相对于原本位置的偏移
            label: {
              formatter: '{b}',
              position: 'right',
              // show: true,//是否显示地名
              color: '#000',
            },
            z: 9,
            data: asia.map(item => {
              return {
                name: item.name,
                value: item.value, // 这里应该是坐标值
                number: item.number, // 这里是额外的信息
              };
            }),
            tooltip: {//仅在 options中最外层的 tooltip.trigger 为 'item'时有效
              show: true,
              position: 'bottom',//提示框位置
              backgroundColor: "rgba(26, 104, 64,0.8)", //设置背景图片 rgba格式
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
      });
      myChart.off('click')
      myChart.on("click", function (args) {
        console.log(args);
      });
    });
    return {
      mapData,
    };
  },
};


</script>

<style>
.map {
  width: 100%;
  height: 100%;
}
</style>
