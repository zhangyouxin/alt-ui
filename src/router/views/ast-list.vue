<script>
import Layout from '@layouts/main.vue'
import { tzToDate } from '@utils/format-time'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    scopedSlots: { customRender: 'id' },
  },
  {
    title: '完成状态',
    dataIndex: 'isDone',
    key: 'isDone',
    width: 120,
    scopedSlots: { customRender: 'isDone' },
  },
  {
    title: '参数',
    dataIndex: 'params',
    key: 'parames',
    ellipsis: true,
  },
  {
    title: '计算结果',
    dataIndex: 'result',
    key: 'result',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 160,
    ellipsis: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 160,
    ellipsis: true,
  },
]

export default {
  components: { Layout },
  data() {
    return {
      columns,
      timer: null,
    }
  },
  computed: {
    pageConfig: function() {
      const asts = this.$store.state.asts
      return {
        current: asts.current,
        pageSize: 15,
        total: asts.count,
        showQuickJumper: true,
      }
    },
    dataSource: function() {
      return this.$store.state.asts.rows.map((item, index) => {
        return {
          key: item.id,
          id: item.id,
          isDone: item.isDone,
          params: item.params,
          result: item.result,
          createdAt: tzToDate(item.createdAt),
          updatedAt: tzToDate(item.updatedAt),
        }
      })
    },
  },
  mounted() {
    this.$store.dispatch('fetchAsts')
    // this.pollData()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  page: {
    title: '数据分析与评估',
    meta: [{ name: '数据分析与评估', content: '数据分析与评估' }],
  },
  methods: {
    // ...altMethods,
    onClickNewAlt: function() {
      this.$router.push('ast-view')
    },
    onIdClick: function(e) {
      this.$router.push(`ast-detail/${e.target.text}`)
    },
    onPageChange: function(e) {
      this.$store.dispatch('fetchAsts', e)
    },
    pollData() {
      this.timer = setInterval(() => {
        this.$store.dispatch('fetchAsts')
      }, 5000)
    },
  },
}
</script>

<template>
  <Layout>
    <BaseButton @click="onClickNewAlt">
      新建数据分析与评估
    </BaseButton>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :class="$style.tableContent"
      :pagination="pageConfig"
      @change="onPageChange"
    >
      <a slot="id" slot-scope="text" @click="onIdClick">{{ text }}</a>
      <div slot="isDone" slot-scope="text">
        <a-spin v-if="text === false">
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 24px"
            spin
          />
        </a-spin>
        <a-progress
          v-if="text === true"
          type="circle"
          :percent="100"
          :width="28"
      /></div>
    </a-table>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.tableContent {
  margin-top: 0.5rem;
}
</style>
