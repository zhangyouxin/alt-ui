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
      const alts = this.$store.state.alts
      const data = alts.filter((alt) => {
        return String(alt.id) === this.$route.params.id
      })
      const data0 = data[0]
      console.log(typeof data0)
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
          value: tzToDate(data0.createdAt),
        },
        {
          key: 'updatedAt',
          attr: '更新时间',
          value: tzToDate(data0.updatedAt),
        },
      ]
      return result
    },
  },
  page: {
    title: '加速寿命实验',
    meta: [{ name: '加速寿命实验', content: '加速寿命实验' }],
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
