<script>
export default {
  props: ['label', 'value'],
}
</script>

<template>
  <div :class="$style.container">
    <div> {{ label }} ：</div>
    <div> {{ value }}</div>
  </div>
</template>

<style lang="scss" module>
@import '@design';
.container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 20rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
}
</style>
