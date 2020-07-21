<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import CardButton from '@components/card-button.vue'
export default {
  page: {
    title: '',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, CardButton },
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
      <CardButton type="1" text="设备管理" />
      <CardButton type="2" text="加速寿命实验" @click="onAltClick" />
      <CardButton type="3" text="强化寿命实验" @click="onAstClick" />
    </div>
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
  flex-wrap: wrap;
  justify-content: center;
}
</style>
