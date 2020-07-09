<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'

export default {
  page: {
    title: '',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
  methods: {
    onAltClick: function() {
      this.$router.push('alt-list')
    },
    onAstClick: function() {
      this.$router.push('ast-list')
    },
  },
}
</script>

<template>
  <Layout>
    <div :class="$style.container">
      <div :class="$style.alt" @click="onAltClick">
        <span>加速寿命实验</span>
      </div>
      <div :class="$style.ast" @click="onAstClick">
        <span>强化寿命实验</span>
      </div></div
    >
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.alt,
.ast {
  padding: 1rem;
  margin: 1rem;
  color: #39a275;
  border: 3px solid rgba($color: #39a275, $alpha: 0.6);
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
  :hover {
    color: rgba($color: #3a4288, $alpha: 0.8);
  }
}
.container {
  display: flex;
  justify-content: center;
}
</style>
