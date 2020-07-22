<script>
import NavBar from '@components/nav-bar2.vue'

export default {
  components: { NavBar },
}
</script>

<template>
  <div :class="$style.container">
    <NavBar />
    <div :class="$style.contentBody">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}
.contentBody {
  width: 90%;
  padding: 1rem;
}
</style>
