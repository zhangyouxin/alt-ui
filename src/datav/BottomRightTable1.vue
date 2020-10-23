<template>
  <div class="bottom-right-table-1">
    <dv-border-box-6>
      <div class="table-name">
        <img src="./img/icon1.png" />最新信息
      </div>

      <dv-scroll-board :config="config" />
    </dv-border-box-6>
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable1',
  data () {
    return {
      config: {
        data: [
          ['模型1', '阿伦尼斯加速模型'],
          ['模型2', '逆幂律模型'],
          ['模型3', 'Peck模型'],
          ['模型4', '艾琳模型'],
          ['模型5', '广义艾琳模型'],
          ['模型6', '广义对数线性模型'],
          ['模型7', '比例危险-比例优势']
        ],
        index: true,
        columnWidth: [40, 60],
        align: ['center'],
        oddRowBGC: 'rgba(9, 37, 50, 0.4)',
        evenRowBGC: 'rgba(10, 32, 50, 0.3)'
      }
    }
  }
}
</script>

<style lang="less">
.bottom-right-table-1 {
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
