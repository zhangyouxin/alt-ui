<script>
// import Layout from '@layouts/main.vue'
// import WCard from '@components/w-card.vue'
import appConfig from '@src/app.config'

export default {
  page: {
    title: 'Log in',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
  },
  components: {},
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
            username: '用户名',
            password: '密码',
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
          console.log('Login error:', error)
          this.tryingToLogIn = false
          this.authError = error
        })
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.frame">
      <div :class="$style.loginTitle">登录信息</div>
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
          <span v-else> 登录 </span>
        </BaseButton>
        <div v-if="authError" :class="$style.errorMsg"> 登录错误。 </div>
      </form>
    </div>
  </div>
  <!-- <Layout>
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
  </Layout> -->
</template>

<style lang="scss" module>
@import '@design';
.container {
  width: 100vw;
  height: 100vh;
  background-image: url('~@assets/images/tech-bg-1.jpg');
  background-size: cover;
  position: relative;
}
.frame {
  width: 20rem;
  height: 24rem;
  position: relative;
  top: 200px;
  left: 880px;
  border: thick double #32a1ce;
  padding: 60px 30px;
}
.loginTitle {
  font-size: 32px;
  height: 45px;
  color: rgba(255, 255, 255, 0.6);
}
.errorMsg {
  color: red;
  padding: 16px;
}
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
