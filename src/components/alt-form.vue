<script>
import AltSelect from '@components/alt-select.vue'
export default {
  components: { AltSelect },
  data() {
    return {}
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: 'customized_form_controls',
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      console.log('Received values of form: ', e)
    },
  },
}
</script>

<template>
  <div>
    <div>寿命加速实验</div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="请选择应力模式：">
        <a-select default-value="1">
          <a-select-option value="1">
            恒定
          </a-select-option>
          <a-select-option value="2">
            步进
          </a-select-option>
        </a-select>
      </a-form-item>
      <AltSelect :options="['steady', 'step']" dict="stressMode" />
      <a-form-item>
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" module>
@import '@design';
</style>
