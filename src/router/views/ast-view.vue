<script>
import Layout from '@layouts/main.vue'
import AstForm from '@components/ast-form.vue'

export default {
  page: {
    title: 'Ast View',
    meta: [{ name: 'description', content: 'The Ast View page.' }],
  },
  components: { Layout, AstForm },
}
</script>

<template>
  <Layout>
    <AstForm />
  </Layout>
</template>
