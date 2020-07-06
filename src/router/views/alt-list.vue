<script>
import Layout from '@layouts/main.vue'
import * as myapi from '@utils/api'
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
      data: [],
    }
  },
  async mounted() {
    const data = await myapi.fetchAlts()
    this.data = data.map((item, index) => {
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
    console.log(Array.isArray(this.data))
  },
  page: {
    title: '加速寿命实验',
    meta: [{ name: '加速寿命实验', content: '加速寿命实验' }],
  },
  methods: {
    onClickNewAlt: function() {
      this.$router.push('alt-view')
    },
  },
}
</script>

<template>
  <Layout>
    <BaseButton @click="onClickNewAlt">
      新建寿命加速实验
    </BaseButton>
    <a-table
      :columns="columns"
      :data-source="data"
      :class="$style.tableContent"
    >
      <a slot="id" slot-scope="text">{{ text }}</a>
    </a-table>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.tableContent {
  margin-top: 0.5rem;
}
</style>
