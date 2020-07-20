<script>
import NavBarRoutes from './nav-bar-routes.vue'

export default {
  components: { NavBarRoutes },
  data() {
    return {
      persistentNavRoutes: [
        {
          name: 'home',
          title: '主页',
        },
      ],
      loggedInNavRoutes: [
        {
          name: 'logout',
          title: 'Log out',
        },
      ],
      loggedOutNavRoutes: [
        {
          name: 'login',
          title: 'Log in',
        },
      ],
    }
  },
  computed: {
    username: function() {
      return this.$store.state.user.username
    },
    loggedIn: function() {
      return !!this.$store.state.user.username
    },
  },
}
</script>

<template>
  <ul :class="$style.container">
    <NavBarRoutes :routes="persistentNavRoutes" />
    <div v-if="loggedIn" :class="$style.hello"> {{ `你好，${username}` }}</div>
    <NavBarRoutes v-if="loggedIn" :routes="loggedInNavRoutes" />
    <NavBarRoutes v-else :routes="loggedOutNavRoutes" />
  </ul>
</template>

<style lang="scss" module>
@import '@design';

.container {
  padding: 0;
  margin: 0 0 $size-grid-padding;
  text-align: center;
  list-style-type: none;

  > li {
    display: inline-block;
    margin-right: $size-grid-padding;
  }
  > .hello {
    display: inline-block;
    margin-right: $size-grid-padding;
    color: $color-link-text;
  }
}
</style>
