<template>
    <div class="menu-wrapper" :class="{'expanded': sidebarVisible}">
      <div class="menu-title">
        <span class="title-text">熊猫外交政策</span>
      </div>
        <div class="content">
          <section class="chart-change"><changeChart></changeChart></section>
          <!-- <section class="chartOne"><timeSeriesChart></timeSeriesChart></section>
          <section class="chartTwo"><sunburstChart></sunburstChart></section> -->
          <!-- <div class="icon-container">
            <img src="../assets/down.png" @click="changeChart"/>
          </div> -->
        </div>
    </div>
    <div class="image-container">
      <img src="../assets/zhaoshou.svg" alt="Toggle Sidebar" @click="toggleSidebar" />
    </div>
    <div class="mask" :class="{'expanded': sidebarVisible}" ref="mask"></div>
  </template>
  
  <script>
  // import TimeSeriesChart from "./timeSeriesChart.vue";
  // import SunburstChart from "./sunburstChart.vue";
  import ChangeChart from "./changeChart.vue";
  export default {
    components: {
      ChangeChart
    },
    data() {
      return {
        sidebarVisible: false,
        chartNumber:1,
      };
    },
    mounted() {},
    update(){
      console.log("执行了updated");
    },
    methods: {
      toggleSidebar() {
        // 在这里切换侧边栏的展开/伸缩状态
        //console.log(this.sidebarVisible);
        this.sidebarVisible = !this.sidebarVisible;
      },
      changeChart(){
        // console.log(this.chartNumber);
        // this.$nextTick(() => {
        //   this.chartNumber = (this.chartNumber%2)+1;
        // });
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    background-color: black;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 9996;
  }
  .mask.expanded {
    opacity: 0.6;
  }

  .image-container {
    width: 150px;
    height: 100px;
    position: fixed;
    bottom: 0px;
    right: 0px;
    z-index: 9999;
  }
  .image-container img {
    width: 100%;
    height: 100%;
    //z-index: 1000;
  }
  .menu-wrapper {
    position: fixed;
    right: 0;
    transform: translateX(100%);
    width: 90px;
    height: 600px;
    border-radius: 20px;
    background-color: var(--bg-color);
    background-color:white;
    padding: 20px;
    box-sizing: border-box;
    transition: 0.6s;
    overflow: hidden;
    z-index: 9998;
    .menu-title {
      padding-bottom: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid rgb(207, 207, 207);
      margin-bottom: 20px;
      width: 180px;
      .title-text {
        margin-left: 5px;
        font-family: "BasketBall";
        font-size: 25px;
        vertical-align: middle;
        opacity: 0;
        transition: 0.6s;
        color: black;
      }
    }
    .content {
      //background-color: bisque;
      width: 1260px;
      height: 490px;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      // text-align: center;
    }
    .chart-change{
      background-color: white;
      flex: 1;
      display: flex;
      justify-content: space-around;
    }
    .chartOne{
      background-color: white;
      flex: 1;
      display: flex;
      justify-content: space-around;
    }
    .chartTwo{
      background-color: white;
      flex: 1;
      display: flex;
      justify-content: space-around;
    }
    .icon-container{
      flex: 1;
      display: flex;
      justify-content: space-around;
    }
    .icon-container img{
      width: 50px;
      height: 50px;
    }
  }
  .menu-wrapper.expanded{
      width: 1300px;
      transform: translateX(-3.6%);
      .menu-title {
        .title-text {
          opacity: 1;
        }
      } 
      // .person-info {
      //   .person-name {
      //     opacity: 1;
      //   }
      // }
      // .menu-content {
      //   .menu-list {
      //     .menu-list-item {
      //       .item-name {
      //         opacity: 1;
      //       }
      //       .btn {
      //         opacity: 1;
      //       }
      //     }
      //   }
      // }
    }
  </style>