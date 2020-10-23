<template>
  <div class="bottom-left-chart-2">
    <div class="header-name">任务维修平均用时</div>
    <div class="details-value"><span>7</span>分钟</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'BottomLeftChart2',
  data() {
    return {
      option: {
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 7,
            data: [
              {
                name: '1分钟以内: ',
                value: 25,
                gradient: ['#03c2fd', '#1ed3e5', '#2fded6'],
              },
              {
                name: '5分钟以内: ',
                value: 45,
                gradient: ['#03c2fd', '#1ed3e5', '#2fded6'],
                radius: '52%',
              },
              {
                name: '1小时以内: ',
                value: 65,
                gradient: ['#03c2fd', '#1ed3e5', '#2fded6'],
                radius: '44%',
              },
              {
                name: '大于1小时: ',
                value: 25,
                gradient: ['#03c2fd', '#1ed3e5', '#2fded6'],
                radius: '36%',
              },
            ],
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            pointer: {
              show: false,
            },
            dataItemStyle: {
              lineCap: 'round',
            },
            backgroundArc: {
              show: false,
            },
            details: {
              show: true,
              formatter: '{name}',
              position: 'start',
              offset: [-10, 0],
              style: {
                fill: '#fff',
                fontSize: 12,
                textAlign: 'right',
              },
            },
          },
        ],
      },
    }
  },
}
</script>

<style lang="less">
.bottom-left-chart-2 {
  .header-name {
    height: 150px;
    line-height: 150px;
    font-size: 20px;
    text-align: center;
  }

  .details-value {
    height: 40px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;

    span {
      color: #00c0ff;
      font-size: 45px;
    }
  }

  .dv-charts-container {
    height: 240px;
  }
}
</style>
