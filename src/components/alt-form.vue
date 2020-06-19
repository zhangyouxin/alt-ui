<script>
import AltSelect from '@components/alt-select.vue'
export default {
  components: { AltSelect },
  data() {
    return {
      pickedStressMode: '',
      pickedAceleratModel: '',
      pickedOptimizationCode: '',
      pickedStressTypeCount: 1,
      pickedStressTypeCodes: [],
      pickedOptimizationAlgrithm: '',
    }
  },
  computed: {
    pickedStressTypeCountArray: function() {
      const count = Number(this.pickedStressTypeCount)
      return Array.from(Array(count).keys())
    },
    paramCount: function() {
      const count = Number(this.pickedStressTypeCount)
      return Array.from(Array(count + 1).keys())
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: 'customized_form_controls',
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
    <div :class="$style.title">寿命加速实验</div>

    <a-form :form="form" @submit="handleSubmit">
      <AltSelect
        v-model="pickedStressMode"
        :options="['steady', 'step']"
        dict="stressMode"
        label="选择应力变化模式"
      />
      <AltSelect
        v-model="pickedAceleratModel"
        :options="['ph', 'arr', 'ipl', 'peck', 'eyring', 'gEyring', 'll']"
        dict="aceleratModel"
        label="选择加速模型"
      />
      <AltSelect
        v-model="pickedOptimizationCode"
        :options="['aOpt', 'dOpt', 'minDelta']"
        dict="optimizationCode"
        label="选择优化方法"
      />
      <AltSelect
        v-model="pickedStressTypeCount"
        :options="[1, 2, 3, 4, 5]"
        dict="stressTypeCount"
        label="选择应力类型个数"
      />
      <div
        v-for="a in pickedStressTypeCountArray"
        :key="a"
        :class="$style.stressOption"
      >
        <span>{{ `应力${a + 1}：` }}</span>
        <div :class="$style.divider" />
        <AltSelect :options="['temp']" dict="stressCode" label="选择应力类型" />
        <AltSelect
          :options="['temp']"
          dict="stressTypeCount"
          label="选择应力个数"
        />
      </div>

      <div
        v-for="item in paramCount"
        :key="`param${item}`"
        :class="$style.inputField"
      >
        <a-form-item :label="`模型参数${item + 1}:：`">
          <a-input v-decorator="[`param${item}`]" />
        </a-form-item>
      </div>

      <AltSelect
        v-model="pickedOptimizationAlgrithm"
        :options="['PSO', 'legacy', 'ranWalk']"
        dict="optimizationAlgrithm"
        label="选择优化算法"
      />
      <!--
      <div>{{ pickedStressMode }}</div>
      <div>{{ pickedAceleratModel }}</div>
      <div>{{ pickedOptimizationCode }}</div>
      <div>{{ pickedStressTypeCount }}</div>
      <div>{{ pickedStressTypeCodes }}</div>
      <div>{{ pickedOptimizationAlgrithm }}</div> -->
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
