<template>
  <div id="data-view">
    <div class="full-screen-container">
      <div class="main-header">
        <div class="mh-left"></div>
        <div class="mh-middle">WX-可靠性实验平台</div>
        <div class="mh-right">
          <div @click="onAltClick">
            <dv-border-box-2
              class="mh-button"
              style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:0px;"
            >
              加速寿命实验
            </dv-border-box-2>
          </div>
          <div @click="onAstClick">
            <dv-border-box-2
              class="mh-button"
              style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:20px;"
            >
              分析评估
            </dv-border-box-2>
          </div>

          <div @click="onDeviceClick">
            <dv-border-box-2
              class="mh-button"
              style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:20px;"
            >
              设备管理
            </dv-border-box-2>
          </div>
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <div class="mc-top">
          <TopLeftCmp />
          <TopMiddleCmp />
          <TopRightCmp />
        </div>
        <div class="mc-bottom">
          <dv-border-box-6 class="bottom-left-container">
            <dv-decoration-4
              class="mcb-decoration-1"
              style="width:5px;height:45%;"
            />
            <dv-decoration-4
              class="mcb-decoration-2"
              style="width:5px;height:45%;"
            />
            <BottomLeftChart1 />
            <BottomLeftChart2 />
          </dv-border-box-6>

          <div class="bottom-right-container">
            <BottomRightTable1 />
            <BottomRightTable2 />
            <BottomRightTable3 />
            <BottomRightTable4 />
          </div>
        </div>
      </dv-border-box-1>
    </div>
  </div>
</template>

<script>
import TopLeftCmp from './TopLeftCmp.vue'
import TopMiddleCmp from './TopMiddleCmp.vue'
import TopRightCmp from './TopRightCmp.vue'

import BottomLeftChart1 from './BottomLeftChart1.vue'
import BottomLeftChart2 from './BottomLeftChart2.vue'

import BottomRightTable1 from './BottomRightTable1.vue'
import BottomRightTable2 from './BottomRightTable2.vue'
import BottomRightTable3 from './BottomRightTable3.vue'
import BottomRightTable4 from './BottomRightTable4.vue'

export default {
  name: 'DataView',
  components: {
    TopLeftCmp,
    TopMiddleCmp,
    TopRightCmp,
    BottomLeftChart1,
    BottomLeftChart2,
    BottomRightTable1,
    BottomRightTable2,
    BottomRightTable3,
    BottomRightTable4,
  },
  data() {
    return {}
  },
  methods: {
    onAltClick: function() {
      this.$router.push('alt-list')
    },
    onAstClick: function() {
      this.$router.push('ast-list')
    },
    onDeviceClick: function() {
      console.log('onDeviceClick')
      this.$router.push('device-list')
    },
  },
}
</script>

<style lang="less">
#data-view {
  width: 100vw;
  height: 100vh;
  background-color: #030409;
  color: #fff;

  .full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1, 134, 187);

      a:visited {
        color: rgb(1, 134, 187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left,
    .mh-right {
      width: 450px;
    }
    .mh-right {
      display: flex;
    }
    .mh-button {
      :hover {
        cursor: pointer;
      }
    }
  }

  .main-container {
    height: calc(~'100% - 80px');

    .mc-top,
    .mc-bottom {
      box-sizing: border-box;
      padding: 30px;
      display: flex;
    }

    .mc-top {
      height: 40%;
    }

    .mc-bottom {
      height: 60%;
    }

    .top-left-cmp,
    .bottom-left-container {
      width: 32%;
    }

    .top-middle-cmp,
    .top-right-cmp {
      width: 34%;
    }

    .bottom-left-container {
      position: relative;

      .border-box-content {
        display: flex;
      }

      .mcb-decoration-1,
      .mcb-decoration-2 {
        position: absolute;
        left: 50%;
        margin-left: -2px;
      }

      .mcb-decoration-1 {
        top: 5%;
        transform: rotate(180deg);
      }

      .mcb-decoration-2 {
        top: 50%;
      }

      .bottom-left-chart-1,
      .bottom-left-chart-2 {
        width: 50%;
        height: 100%;
      }
    }

    .bottom-right-container {
      width: 68%;
      padding-left: 30px;
      box-sizing: border-box;
      display: flex;
    }
  }
}
</style>
