<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main.vue'
import AltForm from '@components/alt-form.vue'

export default {
  page: {
    title: '',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, AltForm },
}
</script>

<template>
  <Layout>
    <AltForm />
  </Layout>
</template>
