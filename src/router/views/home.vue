<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import CardButton from '@components/card-button.vue'
import LineChart from '@components/line-chart.vue'
import PieChart from '@components/pie-chart.vue'
import WCard from '@components/w-card.vue'
import moment from 'moment'
import { get } from 'lodash'
import * as api from '@utils/api.js'
export default {
  components: { Layout, CardButton, LineChart, PieChart, WCard },
  data() {
    return {
      datacollection: {},
      pieChartData: {},
    }
  },
  page: {
    title: '',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  mounted() {
    this.fetchLineChartData()
    this.fetchPieChartData()
  },
  methods: {
    onAltClick: function() {
      this.$router.push('alt-list')
    },
    onAstClick: function() {
      this.$router.push('ast-list')
    },
    onDeviceClick: function() {
      this.$router.push('device-list')
    },
    getRandomInt: function() {
      return 1
    },
    fetchLineChartData: function() {
      Promise.all([
        api.fetchCountLatestAlts(),
        api.fetchCountLatestAsts(),
      ]).then((results) => {
        results[0].reverse()
        results[1].reverse()
        const altMap = results[0].reduce((a, c) => {
          return {
            ...a,
            [c.day]: c,
          }
        }, {})
        const astMap = results[1].reduce((a, c) => {
          return {
            ...a,
            [c.day]: c,
          }
        }, {})
        const labelsArray = Array.from(new Array(10).keys()).map((number) => {
          return moment()
            .subtract(number, 'days')
            .format('YYYY-MM-DD')
        })
        labelsArray.reverse()
        this.datacollection = {
          labels: labelsArray,
          datasets: [
            {
              label: 'alt',
              backgroundColor: 'rgba(248, 121, 121, 0.6)',
              borderColor: 'transparent',
              data: labelsArray.map((item) => get(altMap, `${item}.count`, 0)),
            },
            {
              label: 'ast',
              backgroundColor: 'rgba(8, 121, 121, 0.6)',
              borderColor: 'transparent',
              data: labelsArray.map((item) => get(astMap, `${item}.count`, 0)),
            },
          ],
        }
      })
    },
    fetchPieChartData: function() {
      api.fetchCountAll().then((result) => {
        console.log(result)
        const altCount = get(result, [0, 'altcount'], 0)
        const astCount = get(result, [0, 'astcount'], 0)
        this.pieChartData = {
          labels: ['寿命加速实验', '可靠性评估实验'],
          datasets: [
            {
              backgroundColor: ['#f87979', '#087979'],
              data: [altCount, astCount],
            },
          ],
        }
      })
    },
  },
}
</script>

<template>
  <Layout>
    <div :class="$style.container">
      <div :class="$style.charts">
        <WCard title="最近十天仿真次数">
          <LineChart :chart-data="datacollection"></LineChart>
        </WCard>

        <WCard title="最近仿真分布">
          <PieChart :chart-data="pieChartData"></PieChart>
        </WCard>
      </div>
      <CardButton type="1" text="设备管理" :on-click="onDeviceClick" />
      <CardButton type="2" text="加速寿命实验" :on-click="onAltClick" />
      <CardButton type="3" text="分析与评估" :on-click="onAstClick" />
    </div>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.alt,
.ast {
  padding: 1rem;
  margin: 1rem;
  color: #39a275;
  border: 3px solid rgba($color: #39a275, $alpha: 0.6);
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
  :hover {
    color: rgba($color: #3a4288, $alpha: 0.8);
  }
}
.charts {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 3rem;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
