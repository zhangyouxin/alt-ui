<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import CardButton from '@components/card-button.vue'
import LineChart from '@components/line-chart.vue'
import PieChart from '@components/pie-chart.vue'
import WCard from '@components/w-card.vue'
export default {
  components: { Layout, CardButton, LineChart, PieChart, WCard },
  data() {
    return {
      datacollection: {},
      pieChartData: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
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
    getRandomInt: function() {
      return 1
    },
    fetchLineChartData: function() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      }
    },
    fetchPieChartData: function() {
      this.pieChartData = {
        labels: ['North America', 'South America', 'Australia'],
        datasets: [
          {
            label: 'Population (millions)',
            backgroundColor: ['#f87979', '#087979', '#f80979'],
            data: [2478, 5267, 734],
          },
        ],
      }
    },
  },
}
</script>

<template>
  <Layout>
    <div :class="$style.container">
      <div :class="$style.charts">
        <WCard title="最近一周仿真次数">
          <LineChart
            :chart-data="datacollection"
            :options="options"
          ></LineChart>
        </WCard>

        <WCard title="最近一周仿真分布">
          <PieChart :chart-data="pieChartData" :options="options"></PieChart>
        </WCard>
      </div>
      <CardButton type="1" text="设备管理" />
      <CardButton type="2" text="加速寿命实验" :on-click="onAltClick" />
      <CardButton type="3" text="强化寿命实验" :on-click="onAstClick" />
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
