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
    title: '备件名称',
    dataIndex: 'name',
    key: 'name',
    width: 120,
  },
  {
    title: '备件编号',
    dataIndex: 'serial',
    key: 'serial',
    ellipsis: true,
  },
  {
    title: '备件类型',
    dataIndex: 'type',
    key: 'type',
    ellipsis: true,
  },
  {
    title: '仓库位置',
    dataIndex: 'location',
    key: 'location',
    ellipsis: true,
  },
  {
    title: '入库时间',
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
      const devices = this.$store.state.devices
      return {
        current: devices.current,
        pageSize: 15,
        total: devices.count,
        showQuickJumper: true,
      }
    },
    dataSource: function() {
      return this.$store.state.devices.rows.map((item, index) => {
        return {
          key: item.id,
          id: item.id,
          name: item.name,
          type: item.type,
          serial: item.serial,
          location: item.location,
          createdAt: tzToDate(item.createdAt),
          updatedAt: tzToDate(item.updatedAt),
        }
      })
    },
  },
  mounted() {
    this.$store.dispatch('fetchDevices')
  },
  page: {
    title: '备件列表',
    meta: [{ name: '备件列表', content: '备件列表' }],
  },
  methods: {
    onClickNewDevice: function() {
      this.$router.push('device')
    },
    onIdClick: function(e) {
      console.log(e)
      this.$router.push(`alt-detail/${e.target.text}`)
    },
    onPageChange: function(e) {
      console.log(e)
      this.$store.dispatch('fetchAlts', e)
    },
  },
}
</script>

<template>
  <Layout>
    <BaseButton @click="onClickNewDevice">
      新备件入库
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
