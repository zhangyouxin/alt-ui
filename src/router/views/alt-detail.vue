<script>
import Layout from '@layouts/main.vue'
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
  components: { Layout },
  data() {
    return {
      columns,
      timer: null,
      cumtomRowRender: function(record, index) {
        console.log(record, index)
        if (index === 2) {
          return '???'
        } else {
          return record
        }
      },
    }
  },
  computed: {
    dataSource() {
      const alts = this.$store.state.alts
      const data0 = alts.currentAlt
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
  mounted() {
    this.$store.dispatch('fetchAlt', this.$route.params.id)
    // this.pollData()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  page: {
    title: '加速寿命实验',
    meta: [{ name: '加速寿命实验', content: '加速寿命实验' }],
  },
  methods: {
    pollData() {
      this.timer = setInterval(() => {
        this.$store.dispatch('fetchAlt', this.$route.params.id)
      }, 5000)
    },
  },
}
</script>

<template>
  <Layout>
    <div :class="$style.title">加速寿命实验详情</div>
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
</style>
