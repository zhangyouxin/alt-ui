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
  mounted() {
    console.log('mount ast detail', this.$route)
    this.$store.dispatch('fetchAst', this.$route.params.id)
  },
  page: {
    title: '强化寿命实验',
    meta: [{ name: '强化寿命实验', content: '强化寿命实验' }],
  },
}
</script>

<template>
  <Layout>
    <div :class="$style.title">强化寿命实验详情</div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :class="$style.tableContent"
      :pagination="false"
    >
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
