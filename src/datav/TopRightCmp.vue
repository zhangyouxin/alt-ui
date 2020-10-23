<template>
  <div class="top-right-cmp">
    <div class="chart-name">
      可靠新分析评估实验月趋势
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'TopRightCmp',
  data () {
    return {
      option: {
        legend: {
          data: [
            {
              name: '分析与评估',
              color: '#00baff'
            }
          ],
          textStyle: {
            fill: '#fff'
          }
        },
        xAxis: {
          data: [
            '10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07'
          ],
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          data: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 8
        },
        series: [
          {
            name: '分析与评估',
            data: [
              2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5
            ],
            type: 'bar',
            barStyle: {
              fill: 'rgba(0, 186, 255, 0.4)'
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.top-right-cmp {
  position: relative;
  padding: 0 50px;
  box-sizing: border-box;

  .chart-name {
    position: absolute;
    right: 70px;
    text-align: right;
    font-size: 20px;
    top: 10px;
  }
}
</style>
