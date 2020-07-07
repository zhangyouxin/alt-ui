<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'

export default {
  page: {
    title: '',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <div>
      <router-link to="alt-list">加速寿命实验</router-link>
    </div>
    <div>
      <router-link to="ast-list">强化寿命实验</router-link>
    </div>
  </Layout>
</template>
