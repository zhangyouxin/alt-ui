<script>
import AltSelect from '@components/alt-select.vue'
import * as myapi from '@utils/api.js'
import { path } from '@utils/alt-form-config.js'
import { get } from 'lodash'

export default {
  components: { AltSelect },
  data() {
    return {
      path,
    }
  },
  computed: {},
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: 'alt_form_controls',
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()

      const formV = this.form.getFieldsValue()
      // eslint-disable-next-line no-unused-vars
      const stressArray = this.pickedStressTypeCountArray().map((index) => {
        return {
          stressClass: formV[`stressCode${index + 1}`],
          initial_value: formV[`initialValue${index + 1}`],
          limit_value: formV[`limitValue${index + 1}`],
        }
      })
      const dataForSubmit = {
        ...formV,
        stresses: stressArray,
        stressType: formV.pickedStressMode,
        accelateModel: formV.pickedAceleratModel,
        optMethod: formV.pickedOptimizationCode,
        stressNo: formV.pickedStressTypeCount,
        stressValueNo: formV.stressLevelCount,
        Test_sample: formV.testSample,
        cut_off_time: formV.cutOffTime,
        optAlgorithm: formV.pickedOptimizationAlgrithm,
        PHPA_beta: Array(formV.PHPA_beta),
      }

      console.log('dataForSubmit', dataForSubmit)

      myapi.newAlt(dataForSubmit)
      this.$router.push('alt-list')
    },
    paramsStress() {
      let params = []
      const nthModel = this.form.getFieldsValue().pickedAceleratModel
      if (nthModel) {
        params = path.filter((res) => res.model === nthModel)[0].params
      }
      return params
    },
    getForm() {
      return this.form.getFieldsValue()
    },
    getStressTypeCount() {
      const am = this.getForm().pickedAceleratModel
      const amPath = path.filter((res) => res.model === am)[0]
      return get(amPath, 'stressNo', {})
    },

    pickedStressTypeCountArray() {
      const count = Number(this.getForm().pickedStressTypeCount || 0)
      return Array.from(Array(count).keys())
    },
    isAD() {
      return (
        this.getForm().pickedOptimizationCode === 'aOpt' ||
        this.getForm().pickedOptimizationCode === 'dOpt'
      )
    },
    isMinDelta() {
      return this.getForm().pickedOptimizationCode === 'minDelta'
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">寿命加速实验</div>

    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="名称">
        <a-input v-decorator="[`itemName`]" />
      </a-form-item>
      <AltSelect
        :form-id="'pickedStressMode'"
        dict="stressMode"
        label="选择应力变化模式"
      />
      <AltSelect
        :form-id="`pickedAceleratModel`"
        dict="aceleratModel"
        label="选择加速模型"
      />
      <AltSelect
        :form-id="`pickedOptimizationCode`"
        dict="optimizationCode"
        label="选择优化方法"
      />
      <AltSelect
        :form-id="'pickedStressTypeCount'"
        :options="getStressTypeCount()"
        label="选择应力类型个数"
      />
      <AltSelect
        dict="stressTypeCount"
        :form-id="`stressLevelCount`"
        label="选择应力水平个数"
      />

      <div
        v-for="a in pickedStressTypeCountArray()"
        :key="a"
        :class="$style.stressOption"
      >
        <span>{{ `应力${a + 1}：` }}</span>
        <div :class="$style.divider" />
        <AltSelect
          dict="stressCode"
          :form-id="`stressCode${a + 1}`"
          label="选择应力类型"
        />
        <a-form-item label="初始值">
          <a-input v-decorator="[`initialValue${a + 1}`]" />
        </a-form-item>
        <a-form-item label="限定值">
          <a-input v-decorator="[`limitValue${a + 1}`]" />
        </a-form-item>
      </div>
      <a-form-item v-if="isAD()" label="测试样本数量">
        <a-input v-decorator="['testSample']" />
      </a-form-item>
      <a-form-item v-if="isMinDelta()" label="置信度">
        <a-input v-decorator="['confidence']" />
      </a-form-item>
      <a-form-item label="截尾时间">
        <a-input v-decorator="['cutOffTime']" />
      </a-form-item>
      <div
        v-for="item in paramsStress()"
        :key="`${item}`"
        :class="$style.inputField"
      >
        <a-form-item :label="`${item}：`">
          <a-input v-decorator="[`${item}`]" />
        </a-form-item>
      </div>

      <AltSelect
        :form-id="'pickedOptimizationAlgrithm'"
        dict="optimizationAlgrithm"
        label="选择优化算法"
      />
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
