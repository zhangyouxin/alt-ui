<script>
import * as dicts from '@utils/alt-form-config.js'
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
      formulaDescStyle: null,
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
        this.formulaDescStyle = this.$style[`desc_${$event}`]
      } else {
        this.formulaStyle = null
        this.formulaDescStyle = null
      }
      this.$emit('change', $event)
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.span">{{ `${label}：` }}</div>
    <a-form-item>
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
    <div
      v-if="formulaDescStyle"
      :class="[formulaDescStyle, $style.formulaDesc]"
    />
  </div>
</template>

<style lang="scss" module>
@import '@design';
.container {
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
}
.formulaBase {
  width: 100%;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
}
.formulaDesc {
  width: 100%;
  height: 60px;
  background-size: contain;
  background-repeat: no-repeat;
}
.arr {
  background-image: url('../assets/formulas/arr.png');
}
.desc_arr {
  background-image: url('../assets/formula-desc/arr.png');
}
.eyring {
  background-image: url('../assets/formulas/eyring.png');
}
.desc_eyring {
  background-image: url('../assets/formula-desc/eyring.png');
}
.gEyring {
  background-image: url('../assets/formulas/gEyring.png');
}
.desc_gEyring {
  background-image: url('../assets/formula-desc/gEyring.png');
}
.ipl {
  background-image: url('../assets/formulas/ipl.png');
}
.desc_ipl {
  background-image: url('../assets/formula-desc/ipl.png');
}
.ll {
  background-image: url('../assets/formulas/ll.png');
}
.desc_ll {
  background-image: url('../assets/formula-desc/ll.png');
}
.peck {
  background-image: url('../assets/formulas/peck.png');
}
.desc_peck {
  background-image: url('../assets/formula-desc/peck.png');
}
.ph {
  background-image: url('../assets/formulas/ph.png');
}
.desc_ph {
  background-image: url('../assets/formula-desc/ph.png');
}
.container > .span {
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-weight: 500;
}
</style>
