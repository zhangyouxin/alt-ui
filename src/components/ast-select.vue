<script>
import * as dicts from '@utils/ast-form-config.js'
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
    dict: {
      type: String,
      default() {
        return ''
      },
    },
    label: {
      type: String,
      default() {
        return ''
      },
    },
    formId: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      formulaStyle: null,
    }
  },
  computed: {
    dictOptions: function() {
      return dicts[this.dict]
    },
  },
  methods: {
    selectChange($event) {
      const acelarateModels = Object.keys(dicts.aceleratModel)
      if (acelarateModels.includes($event)) {
        this.formulaStyle = this.$style[$event]
      } else {
        this.formulaStyle = null
      }
      this.$emit('change', $event)
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.span">{{ `${label}：` }}</div>
    <a-form-item :class="$style.select">
      <a-select v-decorator="[formId ? formId : dict]" @change="selectChange">
        <a-select-option
          v-for="(name, code) in dictOptions"
          :key="code"
          :value="code"
        >
          {{ name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <div v-if="formulaStyle" :class="[formulaStyle, $style.formulaBase]" />
  </div>
</template>

<style lang="scss" module>
@import '@design';
.container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 0.5rem 4rem 0.5rem 0;
  .select {
    width: 10rem;
  }
}
.formulaBase {
  width: 100%;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
}
.arr {
  background-image: url('../assets/formulas/arr.png');
}
.eyring {
  background-image: url('../assets/formulas/eyring.png');
}
.gEyring {
  background-image: url('../assets/formulas/gEyring.png');
}
.ipl {
  background-image: url('../assets/formulas/ipl.png');
}
.ll {
  background-image: url('../assets/formulas/ll.png');
}
.peck {
  background-image: url('../assets/formulas/peck.png');
}
.ph {
  background-image: url('../assets/formulas/ph.png');
}
.container > .span {
  padding-top: 0.5rem;
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-weight: 400;
}
</style>
