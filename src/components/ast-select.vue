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
    return {}
  },
  computed: {
    dictOptions: function() {
      return dicts[this.dict]
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.span">{{ `${label}：` }}</div>
    <a-form-item>
      <a-select
        v-decorator="[formId ? formId : dict]"
        @change="$emit('change', $event)"
      >
        <a-select-option
          v-for="(name, code) in dictOptions"
          :key="code"
          :value="code"
        >
          {{ name }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </div>
</template>

<style lang="scss" module>
@import '@design';
.container {
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
}
.container > .span {
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-weight: 500;
}
</style>
