<script>
import * as dicts from '@utils/alt-form-config.js'
export default {
  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
    dict: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    dictOptions: () => {
      return dicts[this.props.dict]
    },
  },
}
</script>

<template>
  <a-select :default-value="dictOptions[0]">
    <a-select-option
      v-for="(item, index) in dictOptions"
      :key="index"
      :value="item"
    >
      {{ item }}
    </a-select-option>
  </a-select>
</template>

<style lang="scss" module>
@import '@design';
</style>
