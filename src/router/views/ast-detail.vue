<script>
import Layout from '@layouts/main.vue'
import WCard from '@components/w-card.vue'
import TextField from '@components/text-field.vue'
import LineChart from '@components/line-chart.vue'
import { tzToDate } from '@utils/format-time'
const columns = [
  {
    title: '属性',
    dataIndex: 'attr',
    key: 'attr',
    width: 80,
  },
  {
    title: '值',
    dataIndex: 'value',
    key: 'value',
    width: 80,
    scopedSlots: { customRender: 'value' },
  },
]
export default {
  components: { Layout, WCard, LineChart, TextField },
  data() {
    return {
      columns,
      timer: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  computed: {
    accelarateModelCurve() {
      return {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        datasets: [
          {
            label: 'alt',
            backgroundColor: '#f87979',
            borderColor: 'transparent',
            data: [1, 2, 3, 2, 1],
          },
          {
            label: 'ast',
            backgroundColor: '#087979',
            borderColor: 'transparent',
            data: [11, 3, 5, 12, 0],
          },
        ],
      }
    },
    dataSource() {
      const asts = this.$store.state.asts
      const data0 = asts.currentAst
      const result = [
        {
          key: 'id',
          attr: 'id',
          value: data0.id,
        },
        {
          key: 'isDone',
          attr: '完成情况',
          value: data0.isDone,
        },
        {
          key: 'params',
          attr: '实验参数',
          value: data0.params,
        },
        {
          key: 'result',
          attr: '实验结果',
          value: data0.result,
        },
        {
          key: 'createdAt',
          attr: '创建时间',
          value: data0.createdAt ? tzToDate(data0.createdAt) : '',
        },
        {
          key: 'updatedAt',
          attr: '更新时间',
          value: data0.updatedAt ? tzToDate(data0.updatedAt) : '',
        },
      ]
      return result
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  mounted() {
    this.$store.dispatch('fetchAst', this.$route.params.id)
    this.pollData()
  },
  page: {
    title: '强化寿命实验',
    meta: [{ name: '强化寿命实验', content: '强化寿命实验' }],
  },
  methods: {
    pollData() {
      this.timer = setInterval(() => {
        this.$store.dispatch('fetchAst', this.$route.params.id)
      }, 5000)
    },
  },
}
</script>

<template>
  <Layout>
    <div :class="$style.title">强化寿命实验详情</div>
    <WCard title="强化寿命实验概况">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :class="$style.tableContent"
        :pagination="false"
      >
        <div slot="value" slot-scope="text">
          <div v-if="text === false">
            <a-spin>
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 24px"
                spin
              />
            </a-spin>
          </div>
          <div v-else-if="text === true"
            ><a-progress type="circle" :percent="100" :width="28"
          /></div>
          <div v-else>{{ text }}</div>
        </div>
      </a-table>
    </WCard>
    <div>
      <WCard title="实验结果">
        <div :class="$style.textContainer">
          <TextField label="sampleKey" value="sampleValue" />
          <TextField label="sampleKey" value="sampleValue" />
          <TextField label="sampleKey" value="sampleValue" />
          <TextField label="sampleKey" value="sampleValue" />
          <TextField label="sampleKey" value="sampleValue" />
          <TextField label="sampleKey" value="sampleValue" />
          <TextField label="sampleKey" value="sampleValue" />
        </div>
      </WCard>
      <WCard title="加速模型趋势">
        <LineChart
          :chart-data="accelarateModelCurve"
          :options="chartOptions"
        ></LineChart>
      </WCard>
    </div>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.tableContent {
  margin: 1rem;
}
.title {
  margin-left: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba($color: #000, $alpha: 0.7);
}
.textContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
