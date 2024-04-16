<template>
  <div>
    <Header></Header>
    <!-- 大容器 -->
    <section class="container">
      <!-- 左容器 -->
      <section class="itemLeft">
        <div class="top">
          <div class="top-inner">
            <div class="right">
              <MapPage></MapPage>
            </div>
            <div class="left">
              <Text></Text>

              <PieChart></PieChart>
              <LineChart></LineChart>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="overlay-box"></div>
          <div>
            <div class="overlay-box">
              <label>
                <input type="radio" v-model="type" value="1"> 亚太地区
              </label>
              <label>
                <input type="radio" v-model="type" value="2"> 欧洲
              </label>
              <label>
                <input type="radio" v-model="type" value="3"> 美洲
              </label>
            </div>
          </div>
          <!-- 其他组件 -->
          <BarChartA v-if="type === '1'" />
          <BarChartB v-if="type === '2'" />
          <BarChartC v-if="type === '3'" />
          <!-- 其他组件 -->
        </div>
      </section>
      <section class="sideBar"><Sidebar></Sidebar></section>
    </section>
  </div>
  <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" class="absolute"> -->
  <!-- </el-row> -->
</template>

<script>

import PieChart from "@/components/pieChart.vue"
import BarChartA from "@/components/barChartA.vue"
import BarChartB from "@/components/barChartB.vue"
import BarChartC from "@/components/barChartC.vue"
import MapPage from "@/components/mapPage(1).vue"
import Text from "@/components/text.vue"
import Header from "@/components/header.vue"
import LineChart from "@/components/lineChart.vue"
import Self from "@/components/self.vue"
import Sidebar from "@/components/Sidebar.vue"
// import Test from "@/components/test.vue"

import { inject } from "vue"
export default {
  data() {
    return {
      type: '1',   //定义一个字段
    }
  },
  components: {
    MapPage, BarChartA, BarChartB, BarChartC, Text, Header, PieChart, LineChart,Sidebar //Self,
  },
  setup() {
    let $echarts = inject("echarts")
    let $http = inject("axios")
    console.log($echarts)
    console.log($http)
  },
  changeType(value) {
    console.log("当前选中:" + value)
    this.type = value;
  }
};
</script>

<style lang="less">
// header {
//   height: 1rem;
//   width: 100%;
//   background-color: rgba(0, 0, 255, 0.2);

//   // 标题的文字样式
//   h1 {
//     font-size: 0.375rem;
//     color: #fff;
//     text-align: center;
//     line-height: 1rem;
//   }
// }

// 大容器的样式
.container {
  // position: relative;
  //撑开大容器
  height: 94vh;
  // 最大最小的宽度
  min-width: 1200px;
  max-width: 2048px;
  margin: 0 auto;
  padding: 0.125rem 0;
  // background-color: gray;
  display: flex;

  // 设置左右在页面的份数
  .itemLeft {
    padding: 0 0.5rem 0 0.5rem;

    display: flex;
    flex-direction: column;

    flex: 8;

    .top {
      flex: 1;

      // 新增的容器的样式
      .top-inner {
        display: flex;
        flex: 1;
        height: 100%;
      }

      .right {
        flex: 3;
        height: 100%;
        flex-direction: column;
      }

      .left {
        flex: 2;
        height: 100%;
      }
    }

    .bottom {
      flex: 1;
    }
  }

  .sideBar {
    background-color: white;

    flex: 0.1;
  }
}

.absolute {
  // display: float;
  position: absolute;
  top: 4rem;
  left: 1rem;
}

.overlay-box {
  position: absolute;
  top: 6.2rem;
  /* 调整为所需的上边距 */
  left: 0.7rem;
  /* 调整为所需的左边距 */
  z-index: 9997;
  /* 确保盒子在其他元素上方 */
}
</style>