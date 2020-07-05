<script>
import AstSelect from '@components/ast-select.vue'
export default {
  components: { AstSelect },
  data() {
    return {}
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: 'ast-form-control',
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      console.log('form: ', this.form)
      console.log('Received values of form: ', e)
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">数据分析</div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="选择加速分析模型">
        <a-radio-group v-decorator="['analysis-model']">
          <a-radio value="al">
            加速寿命数据分析
          </a-radio>
          <!-- <a-radio value="as" :disabled="disabled">
            加速退化数据分析
          </a-radio>
          <a-radio value="dl" :disabled="disabled">
            截尾寿命数据分析
          </a-radio> -->
        </a-radio-group>
      </a-form-item>

      <a-form-item label="Upload">
        <a-upload
          v-decorator="[
            'upload',
            {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            },
          ]"
          name="logo"
          action="/upload.do"
          list-type="picture"
        >
          <a-button> <a-icon type="upload" /> Click to upload </a-button>
        </a-upload>
      </a-form-item>
      <AstSelect
        v-model="pickedStressMode"
        :options="['steady', 'step']"
        dict="stressMode"
        label="选择应力变化模式"
      />
      <AstSelect
        v-model="pickedExpDistributeAlgrithm"
        dict="expDistributeAlgrithm"
        label="选择经验分布算法"
      />
      <AstSelect
        v-model="pickedParamEstAlgrithm"
        dict="paramEstAlgrithm"
        label="选择参数估计算法"
      />
      <AstSelect
        v-model="pickedAceleratModel"
        dict="aceleratModel"
        label="选择加速模型"
      />

      <a-form-item label="寿命点估计值">
        <a-input v-decorator="presetTime" />
      </a-form-item>
      <!-- <a-form-item label="预设加速次数">
        <a-input v-decorator="presetTick" />
      </a-form-item> -->
      <a-form-item label="可靠性点估计值">
        <a-input v-decorator="presetRelability" />
      </a-form-item>
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
.title {
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: 800;
  border-bottom: solid 1px grey;
}
.container {
  margin: 2rem 2rem 2rem 1rem;
}
.stressOption {
  box-sizing: border-box;
  padding: 0.5rem;
  margin: 1rem 0;
  border: 2px dashed #dcdcdc;
  border-radius: 1rem;
}
.stressOption > span {
  font-size: 1rem;
}
.divider {
  width: 100%;
  height: 0;
  margin-top: 0.2rem;
  border-bottom: 1px solid #dcdcdc;
}
.inputField {
  margin-left: 0.5rem;
  font-size: 1.4rem !important;
  font-weight: 400;
}
</style>
