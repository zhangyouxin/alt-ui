<script>
import Layout from '@layouts/main.vue'
// import * as myapi from '@utils/api'
// eslint-disable-next-line no-unused-vars
import { tzToDate } from '@utils/format-time'
// import { altMethods, altComputed } from '@state/helpers'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    scopedSlots: { customRender: 'id' },
  },
  {
    title: '名称',
    dataIndex: 'itemName',
    key: 'itemName',
    width: 120,
    scopedSlots: { customRender: 'itemName' },
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
      const alts = this.$store.state.alts
      return {
        current: alts.current,
        pageSize: 15,
        total: alts.count,
        showQuickJumper: true,
      }
    },
    // ...altComputed,
    dataSource: function() {
      return this.$store.state.alts.rows.map((item, index) => {
        return {
          key: item.id,
          id: item.id,
          itemName: item.itemName,
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
    // this.pollData()
    this.$store.dispatch('fetchAlts')
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
    // ...altMethods,
    onClickNewAlt: function() {
      this.$router.push('alt-view')
    },
    onIdClick: function(e) {
      console.log(e)
      this.$router.push(`alt-detail/${e.target.text}`)
    },
    onPageChange: function(e) {
      console.log(e)
      this.$store.dispatch('fetchAlts', e)
    },
    pollData() {
      this.timer = setInterval(() => {
        this.$store.dispatch('fetchAlts')
      }, 5000)
    },
  },
}
</script>

<template>
  <Layout>
    <BaseButton @click="onClickNewAlt">
      新建加速寿命实验
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
