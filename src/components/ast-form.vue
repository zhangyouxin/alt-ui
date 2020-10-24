<script>
import AstSelect from '@components/ast-select.vue'
import { get } from 'lodash'
import * as myapi from '@utils/api.js'
import * as config from '@utils/ast-form-config'
import {
  translateExpDistributeAlgrithm,
  translateParamEstAlgrithm,
  translateAceleratModel,
  translateStressCode,
} from '@utils/ast-form-config'
export default {
  components: { AstSelect },
  data() {
    return {
      config,
      myapi,
      process,
    }
  },
  computed: {},
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: 'ast-form-control',
    })
  },
  methods: {
    pickedStressTypeCountArray() {
      const count = Number(this.getForm().pickedStressTypeCount || 1)
      return Array.from(Array(count).keys())
    },
    handleSubmit(e) {
      e.preventDefault()
      const formV = this.form.getFieldsValue()
      formV.fileName = get(formV, ['upload', 'file', 'response', 'saveName'])
      formV.fileNameC = get(formV, ['uploadC', 'file', 'response', 'saveName'])
      formV.fileNameD = get(formV, ['uploadD', 'file', 'response', 'saveName'])
      console.log('formV', formV)
      const stressArray = this.pickedStressTypeCountArray().map((index) => {
        return {
          stressType: translateStressCode[formV[`stressCode${index + 1}`]],
          accelateStress: formV[`accelerateStress${index + 1}`].split(','),
          normalStress: formV[`normalStress${index + 1}`],
        }
      })
      const dataForSubmit = {
        filePath: formV.fileName,
        filePathC: formV.fileNameC,
        filePathD: formV.fileNameD,
        paramA: formV.paramA || '',
        activationEnergy: formV.activationEnergy || '',
        analysisType: formV['analysis-model'],
        testType: formV.stressMode,
        EDType: translateExpDistributeAlgrithm[formV.expDistributeAlgrithm],
        paramEst: translateParamEstAlgrithm[formV.paramEstAlgrithm],
        accelateModel: translateAceleratModel[formV.aceleratModel],
        presetTime: formV.presetTime,
        presetReliability: formV.presetRelability,
        stressLevelsNumber: '4',
        stressTypesNumber: formV.pickedStressTypeCount,
        stresses: stressArray,
      }
      console.log('dataForSubmit', dataForSubmit)
      myapi.newAst(dataForSubmit)
      this.$router.push('ast-list')
    },
    handleChangeFile(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    getForm() {
      return this.form.getFieldsValue()
    },
    isDLSelected() {
      // return true
      return this.form.getFieldsValue().paramEstAlgrithm === 'blue'
    },
    selectedModel() {
      return this.form.getFieldsValue().aceleratModel
    },
    selectedMode() {
      return this.form.getFieldsValue().stressMode
    },
    shouldEneryShow() {
      return (
        this.selectedMode() === 'step' &&
        (this.selectedModel() === 'arr' ||
          this.selectedModel() === 'eyring' ||
          this.selectedModel() === 'peck')
      )
    },
    shouldParamAShow() {
      return (
        this.selectedMode() === 'step' &&
        (this.selectedModel() === 'ipl' || this.selectedModel() === 'peck')
      )
    },
    shouldFailureThresholdShow() {
      return this.getForm()['analysis-model'] === 'AS'
    },
    shouldSampleNumberShow() {
      return (
        this.getForm()['analysis-model'] === 'AS' &&
        this.selectedMode() === 'steady'
      )
    },
    shouldTestIntervalShow() {
      return (
        this.getForm()['analysis-model'] === 'AS' &&
        this.selectedMode() === 'step'
      )
    },
    shouldTestNumberShow() {
      return (
        this.getForm()['analysis-model'] === 'AS' &&
        this.selectedMode() === 'step'
      )
    },

    shouldTruncationTestTypeShow() {
      return this.getForm()['analysis-model'] === 'DL'
    },
    shouldTruncationTimeShow() {
      return this.getForm()['analysis-model'] === 'DL'
    },
    shouldTruncationTypeShow() {
      return this.getForm()['analysis-model'] === 'DL'
    },
    shouldLifeDistributionModelShow() {
      return this.getForm()['analysis-model'] === 'DL'
    },
    shouldTestModelShow() {
      return this.getForm()['analysis-model'] === 'DL'
    },
    isDualStress() {
      return this.getForm().pickedStressTypeCount === '2'
    },
    getAcelaratModelOptions() {
      console.log('is dual stress, ', this.isDualStress())

      let result = { peck: 'peck' }
      if (!this.isDualStress()) {
        result = config.aceleratModel
      }
      return result
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">数据分析</div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="选择加速分析模型" :class="$style.accelarateModel">
        <a-radio-group v-decorator="['analysis-model']">
          <a-radio value="AL">
            加速寿命数据分析
          </a-radio>
          <a-radio value="AS">
            加速退化数据分析
          </a-radio>
          <a-radio value="DL">
            截尾寿命数据分析
          </a-radio>
        </a-radio-group>
      </a-form-item>

      <AstSelect dict="stressMode" label="选择应力变化模式" />

      <AstSelect
        v-if="shouldTruncationTestTypeShow()"
        dict="failureThreshold"
        label="截尾实验类型"
      />
      <a-form-item
        v-if="shouldTruncationTimeShow()"
        label="截尾时间"
        :class="$style.textInput"
      >
        <a-input v-decorator="['truncationTime']" />
      </a-form-item>
      <AstSelect
        v-if="shouldLifeDistributionModelShow()"
        dict="LifeDistributionModel"
        label="分布模型"
      />

      <a-form-item
        v-if="shouldFailureThresholdShow()"
        label="失效阈值"
        :class="$style.textInput"
      >
        <a-input v-decorator="['failureThreshold']" />
      </a-form-item>
      <a-form-item
        v-if="shouldSampleNumberShow()"
        label="样本总数"
        :class="$style.textInput"
      >
        <a-input v-decorator="['simpleNumber']" />
      </a-form-item>
      <a-form-item
        v-if="shouldTestIntervalShow()"
        label="测试间隔时间"
        :class="$style.textInput"
      >
        <a-input v-decorator="['testInterval']" />
      </a-form-item>
      <a-form-item
        v-if="shouldTestNumberShow()"
        label="单次测试总数"
        :class="$style.textInput"
      >
        <a-input v-decorator="['testNumber']" />
      </a-form-item>
      <AstSelect dict="expDistributeAlgrithm" label="选择经验分布算法" />
      <AstSelect dict="paramEstAlgrithm" label="选择参数估计算法" />

      <a-form-item label="数据文件" :class="$style.upload">
        <a-upload
          v-decorator="['upload']"
          name="file"
          action="http://upload.weshinekx.cn"
          @change="handleChangeFile"
        >
          <a-button> <a-icon type="upload" /> Click to upload </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        v-if="isDLSelected()"
        label="数据文件C"
        :class="$style.upload"
      >
        <a-upload
          v-decorator="['uploadC']"
          name="file"
          action="http://upload.weshinekx.cn"
          @change="handleChangeFile"
        >
          <a-button> <a-icon type="upload" /> Click to upload </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        v-if="isDLSelected()"
        label="数据文件D"
        :class="$style.upload"
      >
        <a-upload
          v-decorator="['uploadD']"
          name="file"
          action="http://upload.weshinekx.cn"
          @change="handleChangeFile"
        >
          <a-button> <a-icon type="upload" /> Click to upload </a-button>
        </a-upload>
      </a-form-item>

      <AstSelect
        :form-id="'pickedStressTypeCount'"
        dict="stressTypeCount"
        label="选择应力类型个数"
      />
      <AstSelect
        :options="getAcelaratModelOptions()"
        label="选择加速模型"
        :form-id="'aceleratModel'"
      />
      <a-form-item label="stressLevelsNumber" :class="$style.textInput">
        <a-input v-decorator="['stressLevelsNumber']" />
      </a-form-item>
      <div
        v-for="a in pickedStressTypeCountArray()"
        :key="a"
        :class="$style.stressOption"
      >
        <span>{{ `应力${a + 1}：` }}</span>
        <div :class="$style.divider" />
        <AstSelect
          dict="stressCode"
          :form-id="`stressCode${a + 1}`"
          label="选择应力类型"
        />
        <a-form-item label="应力普通值" :class="$style.textInput">
          <a-input v-decorator="[`normalStress${a + 1}`]" />
        </a-form-item>
        <a-form-item label="应力加速值(逗号隔开)" :class="$style.textInput">
          <a-input v-decorator="[`accelerateStress${a + 1}`]" />
        </a-form-item>
      </div>
      <a-form-item
        v-if="shouldEneryShow()"
        label="激活能"
        :class="$style.textInput"
      >
        <a-input v-decorator="['activationEnergy']" />
      </a-form-item>

      <a-form-item
        v-if="shouldParamAShow()"
        label="ParamA"
        :class="$style.textInput"
      >
        <a-input v-decorator="['paramA']" />
      </a-form-item>

      <!-- <AstSelect dict="distributeFunction" label="选择分布函数" /> -->
      <a-form-item label="寿命点估计值" :class="$style.textInput">
        <a-input v-decorator="['presetTime']" />
      </a-form-item>
      <a-form-item label="可靠性点估计值" :class="$style.textInput">
        <a-input v-decorator="['presetRelability']" />
      </a-form-item>
      <a-form-item :class="$style.submit">
        <a-button type="primary" html-type="submit" size="large">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" module>
@import '@design';
.title {
  width: 100%;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: 800;
  border-bottom: solid 1px grey;
}
.container {
  width: 45rem;
  margin: 3rem auto;
  .accelarateModel {
    width: 100%;
  }
  .upload {
    width: 100%;
  }
  .textInput {
    display: flex;
    align-items: flex-start;
    margin: 0.5rem 8rem 0.5rem 0;
    .select {
      width: 10rem;
    }
  }
  .submit {
    width: 100%;
    margin-top: 2rem;
  }
}
.container form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 2rem 2rem 2rem 1rem;
}
.stressOption {
  box-sizing: border-box;
  padding: 0.5rem 1rem;
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
