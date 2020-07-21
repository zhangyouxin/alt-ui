<script>
export default {
  name: 'CardButton',
  props: {
    type: {
      type: String,
      default: '1',
    },
    text: {
      type: String,
      default: 'button',
    },
    onClick: {
      type: Function,
      default: () => console.log('clicked'),
    },
  },
  computed: {
    styleName() {
      return `cardColor${this.type}`
    },
  },
}
</script>

<template>
  <div :class="`${$style.card} ${$style[styleName]}`">
    <div @click="onClick">{{ text }}</div>
  </div>
</template>

<style lang="scss" module>
@import '@design';
.card {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 20rem;
  height: 8rem;
  padding: 1rem;
  margin: 1rem;
  color: rgb(255, 255, 255);
  border-radius: 0.4rem;
  box-shadow: rgba(52, 56, 85, 0.25) 0 2px 3px 0;
  > div {
    font-size: 1.5rem;
    line-height: 5rem;
  }
  :hover {
    cursor: pointer;
  }
}
.cardColor1 {
  background: linear-gradient(to right, rgb(102, 229, 181), rgb(41, 224, 105));
}
.cardColor2 {
  background: linear-gradient(to right, #f7f48b, #f47c7c);
}
.cardColor3 {
  background: linear-gradient(to right, rgb(52, 181, 229), rgb(46, 132, 224));
}
</style>
