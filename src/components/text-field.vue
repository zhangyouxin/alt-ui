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
  justify-content: space-around;
  width: 15rem;
  font-size: 1rem;
  font-weight: 600;
}
</style>
