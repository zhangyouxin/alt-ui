<script>
export default {
  name: 'WCard',
  props: ['title'],
}
</script>

<template>
  <div :class="$style.card">
    <span> {{ title }}</span>
    <slot />
  </div>
</template>

<style lang="scss" module>
@import '@design';
.card {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 4rem;
  margin: 3rem;
  overflow: hidden;
  word-wrap: break-word;
  background-color: #fff;
  border: none;
  border-radius: 0.375rem;
  box-shadow: rgba(52, 56, 85, 0.25) 0 2px 3px 0;
  > span {
    position: relative;
    top: -2rem;
    font-size: 1.2rem;
    font-weight: $heading-font-weight;
    color: $color-blue;
  }
}
</style>
