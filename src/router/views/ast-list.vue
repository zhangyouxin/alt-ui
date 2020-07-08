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
  },
  page: {
    title: '强化寿命实验',
    meta: [{ name: '强化寿命实验', content: '强化寿命实验' }],
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
  },
}
</script>

<template>
  <Layout>
    <BaseButton @click="onClickNewAlt">
      新建强化寿命实验
    </BaseButton>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :class="$style.tableContent"
      :pagination="pageConfig"
      @change="onPageChange"
    >
      <a slot="id" slot-scope="text" @click="onIdClick">{{ text }}</a>
    </a-table>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.tableContent {
  margin-top: 0.5rem;
}
</style>
