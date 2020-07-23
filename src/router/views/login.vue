<script>
import Layout from '@layouts/main.vue'
import WCard from '@components/w-card.vue'
import appConfig from '@src/app.config'

export default {
  page: {
    title: 'Log in',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
  },
  components: { Layout, WCard },
  data() {
    return {
      username: '',
      password: '',
      authError: null,
      tryingToLogIn: false,
    }
  },
  computed: {
    placeholders() {
      return process.env.NODE_ENV === 'production'
        ? {}
        : {
            username: 'Use "admin" to log in with the mock API',
            password: 'Use "password" to log in with the mock API',
          }
    },
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.tryingToLogIn = true
      // Reset the authError if it existed.
      this.authError = null
      return this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password,
        })
        .then((token) => {
          this.tryingToLogIn = false
          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
        })
        .catch((error) => {
          this.tryingToLogIn = false
          this.authError = error
        })
    },
  },
}
</script>

<template>
  <Layout>
    <div :class="$style.logoContainer"> <div :class="$style.logo"/></div>
    <WCard :class="$style.card" title="请输入账户信息：">
      <form :class="$style.form" @submit.prevent="tryToLogIn">
        <BaseInputText
          v-model="username"
          name="username"
          :placeholder="placeholders.username"
        />
        <BaseInputText
          v-model="password"
          name="password"
          type="password"
          :placeholder="placeholders.password"
        />
        <BaseButton :disabled="tryingToLogIn" type="submit">
          <BaseIcon v-if="tryingToLogIn" name="sync" spin />
          <span v-else>
            登录
          </span>
        </BaseButton>
        <p v-if="authError">
          There was an error logging in to your account.
        </p>
      </form>
    </WCard>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';
.card {
  position: fixed;
  left: 50%;
  width: 50rem;
  margin: 0 0 0 -25rem;
}
.form {
  text-align: center;
}
.logoContainer {
  display: flex;
  justify-content: center;
}
.logo {
  display: inline-block;
  width: 20rem;
  height: 14rem;
  background: url('~@assets/images/logo.png');
  background-size: cover;
}
</style>
