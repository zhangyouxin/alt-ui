import Vue from 'vue'
import router from '@router'
import store from '@state/store'
import Antd, { FormModel } from 'ant-design-vue'
import TextInput from '@components/text-input.vue'
import dataV from '@jiaminghi/data-view'
import App from './app.vue'
import 'ant-design-vue/dist/antd.css'
import '@src/antd-base.css'
import './assets/common.less'

// Globally register all `_base`-prefixed components
import '@components/_globals'
Vue.use(dataV)
Vue.use(FormModel)
Vue.config.productionTip = false

Vue.use(Antd)
Vue.component('w-input', TextInput)

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
