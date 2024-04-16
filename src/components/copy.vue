<template>
  <div>
    <header>
      顶部导航条
    </header>
    <!-- 大容器 -->
    <section class="container">
      <!-- 左容器 -->
      <section class="itemLeft">
        <div class="top">
          <barChart></barChart>
        </div>
        <div class="bottom">
          <!-- <Earth></Earth> -->
        </div>
      </section>
      <!-- 右容器 -->
      <section class="itemRight">右侧小图表
      </section>
      <section class="sideBar">侧边栏</section>
    </section>
  </div>
</template>

<script>
import D_bar from "@/components/D_bar.vue";
import ItemPage from "@/components/itemPage.vue";
import BarChart from "@/components/barChart.vue"
import ItemOne from "@/components/itemOne.vue"
import ItemTwo from "@/components/itemTwo.vue"
import ItemThree from "@/components/itemThree.vue"
import ItemFour from "@/components/itemFour.vue"
import MapPage from "@/components/mapPage.vue"
import ThreeMap from "@/components/ThreeMap.vue"
import Earth from "@/components/Earth.vue"

import { inject } from "vue"
export default {
    components: {
        ItemPage, ItemOne, ItemTwo, ItemThree, ItemFour, MapPage, BarChart, D_bar, ThreeMap, Earth
    },

    setup() {
        let $echarts = inject("echarts")
        let $http = inject("axios")
        console.log($echarts)
        console.log($http)
    }
};
</script>

<style lang="less">
header {
    height: 1rem;
    width: 100%;
    background-color: rgba(0, 0, 255, 0.2);

    // 标题的文字样式
    h1 {
        font-size: 0.375rem;
        color: #fff;
        text-align: center;
        line-height: 1rem;
    }
}

// 大容器的样式
.container {
    //撑开大容器
    height: 90vh;
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

        flex: 5;

        .top {
            flex: 1;
        }

        .bottom {
            flex: 1;
        }
    }

    .itemRight {
        background-color: rgba(0, 0, 255, 0.2);

        flex: 3;
    }

    .sideBar {
        background-color: rgba(0, 0, 255, 0.2);

        flex: 1;
    }
}
</style>

<template>
    <div>
        <header>
            顶部导航条
        </header>
        <!-- 大容器 -->
        <section class="container">
            <!-- 左容器 -->
            <section class="itemLeft">
                <div class="top">
                    <barChart></barChart>
                </div>
                <div class="bottom">
                    <!-- <Earth></Earth> -->
                </div>
            </section>
            <!-- 右容器 -->
            <section class="itemRight">右侧小图表
            </section>
            <section class="sideBar">侧边栏</section>
        </section>
    </div>
</template>

<script>
import D_bar from "@/components/D_bar.vue";
import ItemPage from "@/components/itemPage.vue";
import BarChart from "@/components/barChart.vue"
import ItemOne from "@/components/itemOne.vue"
import ItemTwo from "@/components/itemTwo.vue"
import ItemThree from "@/components/itemThree.vue"
import ItemFour from "@/components/itemFour.vue"
import MapPage from "@/components/mapPage.vue"
import ThreeMap from "@/components/ThreeMap.vue"
import Earth from "@/components/Earth.vue"

import { inject } from "vue"
export default {
  components: {
    ItemPage, ItemOne, ItemTwo, ItemThree, ItemFour, MapPage, BarChart, D_bar, ThreeMap, Earth
  },

  setup() {
    let $echarts = inject("echarts")
    let $http = inject("axios")
    console.log($echarts)
    console.log($http)
  }
};
</script>

<style lang="less">
header {
    height: 1rem;
    width: 100%;
    background-color: rgba(0, 0, 255, 0.2);

    // 标题的文字样式
    h1 {
        font-size: 0.375rem;
        color: #fff;
        text-align: center;
        line-height: 1rem;
    }
}

// 大容器的样式
.container {
    //撑开大容器
    height: 90vh;
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

        flex: 5;

        .top {
            flex: 1;
        }

        .bottom {
            flex: 1;
        }
    }

    .itemRight {
        background-color: rgba(0, 0, 255, 0.2);

        flex: 3;
    }

    .sideBar {
        background-color: rgba(0, 0, 255, 0.2);

        flex: 1;
    }
}
</style>