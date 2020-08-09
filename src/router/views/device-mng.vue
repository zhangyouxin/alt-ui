<script>
import Layout from '@layouts/main.vue'
import * as myapi from '@utils/api'

export default {
  page: {
    title: 'Device Mng',
    meta: [{ name: 'description', content: 'The Device Mng page.' }],
  },
  components: { Layout },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: 'device-form-control',
    })
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      const formV = this.form.getFieldsValue()
      console.log(formV)
      await myapi.newDevice(formV)
      this.$router.push('device-list')
    },
  },
}
</script>

<template>
  <Layout>
    <h3>备件入库：</h3>
    <a-form :form="form" @submit="handleSubmit">
      <div :class="$style.formContainer">
        <w-input label="备件名称" field-id="name" />
        <w-input label="备件序列号" field-id="serial" />
        <w-input label="备件类型" field-id="type" />
        <w-input label="仓库位置" field-id="location" />
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          保存
        </a-button>
      </a-form-item>
    </a-form>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.formContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
