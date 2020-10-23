<template>
  <div class="bottom-right-table-3">
    <dv-border-box-6>
      <div class="table-name">
        <img src="./img/icon3.png" /> ALT 设计
      </div>

      <dv-scroll-board :config="config" />
    </dv-border-box-6>
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable3',
  data () {
    return {
      config: {
        data: [
          ['匹配方式1', '可靠性预估点'],
          ['匹配方式2', '寿命估算'],
          ['匹配方式3', '一般寿命'],
          ['匹配方式4', '最佳匹配模型']
        ],
        index: true,
        columnWidth: [30, 100],
        align: ['center'],
        oddRowBGC: 'rgba(9, 37, 50, 0.4)',
        evenRowBGC: 'rgba(10, 32, 50, 0.3)'
      }
    }
  }
}
</script>

<style lang="less">
.bottom-right-table-3 {
  width: calc(~"25% + 10px");
  height: 100%;
  margin: 0 -5px;

  .border-box-content {
    padding: 20px;
    box-sizing: border-box;
  }

  .table-name {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }

  .dv-scroll-board {
    height: calc(~"100% - 60px");
  }
}
</style>
