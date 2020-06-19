<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import AltForm from '@components/alt-form.vue'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, AltForm },
}
</script>

<template>
  <Layout>
    <h1>Home Page</h1>
    <AltForm />
    <img src="@assets/images/logo.png" alt="Logo" />
  </Layout>
</template>
