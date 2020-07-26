<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: ['label', 'fieldId'],
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.span">{{ `${label}：` }}</div>
    <a-form-item>
      <a-input v-decorator="[fieldId]" />
    </a-form-item>
  </div>
</template>

<style lang="scss" module>
@import '@design';
.container {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 20rem;
  height: 5rem;
  font-size: 1rem;
  font-weight: 600;
}
</style>
