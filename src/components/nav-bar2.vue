<script>
export default {
  computed: {
    username: function() {
      return this.$store.state.user.username
    },
    loggedIn: function() {
      return !!this.$store.state.user.username
    },
  },
  methods: {
    onLoginClick() {
      this.$router.push('login')
    },
    onLogoClick() {
      this.$router.push('home')
    },
    onLogOutClick() {
      this.$router.push('logout')
      // this.$store.dispatch('logOut')
    },
  },
}
</script>

<template>
  <div :class="$style.bar">
    <div :class="$style.content">
      <div :class="$style.logo" @click="onLogoClick">WX可靠性实验平台</div>
      <div v-if="!!username">
        <div :class="$style.user">你好，{{ username }}</div>
        <div :class="$style.login" @click="onLogOutClick">
          登出
        </div>
      </div>
      <div v-else :class="$style.login" @click="onLoginClick">
        登录
      </div>
      <div :class="$style.shape"> </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@design';
.bar {
  z-index: 1;
  display: flex;
  width: 100%;
  height: 4rem;
  padding: 1rem 1rem;
  margin: 0;
  background-color: $color-blue;
  transition: background-color 0.3s ease;
}
.user,
.login {
  display: inline-block;
  margin-right: 1rem;
}
.login,
.logo {
  cursor: pointer;
}
.content {
  display: flex;
  flex-grow: 1;
  align-items: baseline;
  justify-content: space-between;
  color: $nav-color;
}
.logo {
  height: 2rem;
  font-family: $heading-font-family;
  font-size: 1.7rem;
  font-weight: $heading-font-weight;
  background-image: -webkit-linear-gradient(left, #f7f48b, #a1de93, #70a1d7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.shape {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 33%;
  max-width: 467px;
  height: 0;
  margin: auto;
  border-top: 4rem solid transparent;
  border-top-color: $color-blue-deep;
  border-right: 3.1875rem solid transparent;
  border-left: 3.1875rem solid transparent;
  transition: border-top-color 0.3s ease;
}
</style>
