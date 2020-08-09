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
    <a-form-item :class="$style.select">
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
  display: flex;
  align-items: flex-start;
  margin: 0.5rem 4rem 0.5rem 0.5rem;
  .select {
    width: 10rem;
  }
}
.container > .span {
  padding-top: 0.5rem;
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-weight: 500;
}
</style>
