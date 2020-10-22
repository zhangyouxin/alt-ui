<script>
import AstSelect from '@components/ast-select.vue'
import { get } from 'lodash'
import * as myapi from '@utils/api.js'
export default {
  components: { AstSelect },
  data() {
    return {
      myapi,
      process,
      pickedStressTypeCount: 1,
    }
  },
  computed: {
    pickedStressTypeCountArray: function() {
      const count = Number(this.pickedStressTypeCount)
      return Array.from(Array(count).keys())
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: 'ast-form-control',
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      const formV = this.form.getFieldsValue()
      formV.fileName = get(formV, ['upload', 'file', 'response', 'saveName'])
      formV.fileNameC = get(formV, ['uploadC', 'file', 'response', 'saveName'])
      formV.fileNameD = get(formV, ['uploadD', 'file', 'response', 'saveName'])
      console.log('formV', formV)
      const stressArray = this.pickedStressTypeCountArray.map((index) => {
        return {
          stressType: formV[`stressCode${index + 1}`],
          accelateStress: formV[`accelerateStress${index + 1}`].split(','),
          normalStress: formV[`normalStress${index + 1}`],
        }
      })
      const dataForSubmit = {
        filePath: formV.fileName,
        filePathC: formV.fileNameC,
        filePathD: formV.fileNameD,
        analysisType: formV['analysis-model'],
        testType: formV.stressMode,
        EDType: formV.expDistributeAlgrithm,
        paramEst: formV.paramEstAlgrithm,
        accelateModel: formV.aceleratModel,
        presetTime: formV.presetTime,
        presetReliability: formV.presetRelability,
        stressLevelsNumber: this.pickedStressTypeCount,
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

      <AstSelect
        :options="['steady', 'step']"
        dict="stressMode"
        label="选择应力变化模式"
      />
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
      <a-form-item v-if="true" label="数据文件C" :class="$style.upload">
        <a-upload
          v-decorator="['uploadC']"
          name="file"
          action="http://upload.weshinekx.cn"
          @change="handleChangeFile"
        >
          <a-button> <a-icon type="upload" /> Click to upload </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item v-if="true" label="数据文件D" :class="$style.upload">
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
        <AstSelect
          :options="['temp']"
          dict="stressCode"
          :form-id="`stressCode${a + 1}`"
          label="选择应力类型"
        />
        <AstSelect dict="aceleratModel" label="选择加速模型" />
        <a-form-item label="应力普通值" :class="$style.textInput">
          <a-input v-decorator="[`normalStress${a + 1}`]" />
        </a-form-item>
        <a-form-item label="应力加速值(逗号隔开)" :class="$style.textInput">
          <a-input v-decorator="[`accelerateStress${a + 1}`]" />
        </a-form-item>
      </div>

      <a-form-item
        v-if="form.getFieldsValue()['analysis-model'] === 'DL'"
        label="TruncationType(逗号隔开)"
        :class="$style.textInput"
      >
        <a-input v-decorator="['TruncationType']" />
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
    margin: 0.5rem 4rem 0.5rem 0;
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
