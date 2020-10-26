<script>
import Layout from '@layouts/main.vue'
import WCard from '@components/w-card.vue'
import TextField from '@components/text-field.vue'
import LineChart from '@components/line-chart.vue'
// import VuePlotly from '@statnett/vue-plotly'
import { tzToDate } from '@utils/format-time'
import { get } from 'lodash'
import { resultMapping } from '@utils/ast-form-config.js'
const columns = [
  {
    title: '属性',
    dataIndex: 'attr',
    key: 'attr',
    width: 80,
  },
  {
    ellipsis: true,
    title: '值',
    dataIndex: 'value',
    key: 'value',
    width: 80,
    scopedSlots: { customRender: 'value' },
  },
]
export default {
  name: 'AstDetail',
  components: { Layout, WCard, LineChart, TextField },
  data() {
    return {
      columns,
      timer: null,
    }
  },
  computed: {
    accelerateFactorCurveData() {
      const detail = get(this.results.accelerateFactorCurve, [0, 'curve'])
      console.log('accelerateFactorCurve', detail)
      return detail
    },
    accelerateFactorCurve() {
      const accelerateFactorCurve = this.accelerateFactorCurveData
      let curveData = []
      if (accelerateFactorCurve.length === 3) {
        curveData = accelerateFactorCurve[2]
      }
      return [
        {
          type: 'surface',
          z: curveData,
        },
      ]
    },
    d3Data() {
      return {
        layout: {
          title: '',
          autosize: false,
          width: 500,
          height: 500,
          margin: {
            l: 65,
            r: 50,
            b: 65,
            t: 90,
          },
        },
        options: {},
      }
    },
    labelConfig() {
      return resultMapping
    },
    results() {
      return this.$store.state.asts.currentCurves
    },
    hasResults() {
      return !!this.results
    },
    reliabilityPointEst() {
      return get(this.results, 'reliabilityPointEst')
    },
    lifePointEst() {
      return get(this.results, 'lifePointEst')
    },
    bestLifeFitModel() {
      return get(this.results, 'bestLifeFitModel')
    },
    normalLife() {
      return get(this.results, 'normalLife')
    },
    parameterName() {
      return get(this.results, 'parameterName')
    },
    parameterSet() {
      return get(this.results, 'parameterSet')
    },
    accumulateInvalidCurveData() {
      const detail = get(this.results.accumulateInvalidCurve, [0, 'curve'])
      console.log('accumulateInvalidCurve', detail)
      return detail
    },
    accelarateModelCurveData() {
      const detail = (this.results.accelerateModelCurveget, [0, 'curve'])
      console.log('accelarateModelCurve', detail)
      return detail
    },
    accumulateInvalidCurve() {
      const accumulateInvalidCurve = this.accumulateInvalidCurveData
      let curveData = []
      if (accumulateInvalidCurve.length === 3) {
        curveData = accumulateInvalidCurve[2]
        return [
          {
            type: 'surface',
            z: curveData,
          },
        ]
      } else if (accumulateInvalidCurve.length === 2) {
        const dims = Array.isArray(accumulateInvalidCurve[1][0])
          ? accumulateInvalidCurve[1][0].length
          : 1
        console.log(dims)
        const colors = [
          '#f87979',
          '#087979',
          '#080979',
          '#f87909',
          '#f00909',
          '#880909',
          '#f87119',
          '#087119',
          '#080119',
          '#f87119',
          '#f00119',
          '#880119',
        ]
        return {
          labels: accumulateInvalidCurve[0],
          datasets: new Array(dims).fill(null).map((item, index) => ({
            label: `累计失效值${index}`,
            backgroundColor: colors[index],
            borderColor: 'transparent',
            data: accumulateInvalidCurve[1].map((res) => res[index]),
          })),
        }
      }
      return undefined
    },
    accelarateModelCurve() {
      const accelarateModelCurve = this.accelarateModelCurveData
      let curveData = []
      if (accelarateModelCurve.length === 3) {
        curveData = accelarateModelCurve[2]
        return [
          {
            type: 'surface',
            z: curveData,
          },
        ]
      } else if (accelarateModelCurve.length === 2) {
        return {
          labels: accelarateModelCurve[0],
          datasets: [
            {
              label: 'alt',
              backgroundColor: '#f87979',
              borderColor: 'transparent',
              data: accelarateModelCurve[1],
            },
          ],
        }
      }
      return undefined
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
    this.$store.dispatch('fetchAstResult', this.$route.params.id)
    // this.pollData()
  },
  page: {
    title: '强化寿命实验',
    meta: [{ name: '强化寿命实验', content: '强化寿命实验' }],
  },
  methods: {
    is3DArray(arr) {
      return arr && arr.length === 3
    },
    is2DArray(arr) {
      return arr && arr.length === 2
    },
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
    <div v-if="hasResults">
      <WCard title="实验结果">
        <div :class="$style.textContainer">
          <TextField
            :label="labelConfig.reliabilityPointEst"
            :value="reliabilityPointEst"
          />
          <TextField :label="labelConfig.lifePointEst" :value="lifePointEst" />
          <TextField :label="labelConfig.normalLife" :value="normalLife" />
          <TextField
            :label="labelConfig.bestLifeFitModel"
            :value="bestLifeFitModel"
          />
          <TextField
            v-for="(item, index) in parameterName"
            :key="item"
            :label="item"
            :value="parameterSet[index]"
          />
        </div>
      </WCard>
      <WCard title="加速失效曲线">
        <LineChart
          v-if="is2DArray(accumulateInvalidCurveData)"
          :chart-data="accumulateInvalidCurve"
        ></LineChart>
        <!-- <VuePlotly
          v-if="is3DArray(accumulateInvalidCurveData)"
          :data="accumulateInvalidCurve"
          :layout="d3Data.layout"
          :options="d3Data.options"
        /> -->
      </WCard>
      <WCard title="加速模型趋势">
        <LineChart
          v-if="is2DArray(accelarateModelCurveData)"
          :chart-data="accelarateModelCurve"
        ></LineChart>
        <!-- <VuePlotly
          v-if="is3DArray(accelarateModelCurveData)"
          :data="accelarateModelCurve"
          :layout="d3Data.layout"
          :options="d3Data.options"
        /> -->
      </WCard>
      <WCard title="加速因子趋势">
        <LineChart
          v-if="is2DArray(accelerateFactorCurveData)"
          :chart-data="accelerateFactorCurve"
        ></LineChart>
        <!-- <VuePlotly
          v-if="is3DArray(accelerateFactorCurveData)"
          :data="accelerateFactorCurve"
          :layout="d3Data.layout"
          :options="d3Data.options"
        /> -->
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
  justify-content: flex-start;
}
</style>
