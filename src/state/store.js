/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import dispatchActionForAllModules from '@utils/dispatch-action-for-all-modules'
import axios from 'axios'
import modules from './modules'
const API = 'http://myapi.weshinekx.cn/api'

Vue.use(Vuex)

// const store = new Vuex.Store({
//   modules,
//   // Enable strict mode in development to get a warning
//   // when mutating state outside of a mutation.
//   // https://vuex.vuejs.org/guide/strict.html
//   strict: process.env.NODE_ENV !== 'production',
// })

const store = new Vuex.Store({
  state: {
    alts: [],
    asts: [],
  },
  mutations: {
    setAlts(state, alts) {
      state.alts = alts
    },
    setAsts(state, asts) {
      state.asts = asts
    },
  },
  actions: {
    fetchAlts(context) {
      const result = 'init value'
      axios
        .get(`${API}/alt`, {
          params: {
            page: 1,
            pageSize: 20,
          },
        })
        .then((response) => {
          const result = response.data
          console.log('got value, commiting', result)
          context.commit('setAlts', result)
        })
        .catch((error) => console.error(error))
      return result
    },
    fetchAsts(context) {
      const result = 'init value'
      axios
        .get(`${API}/ast`, {
          params: {
            page: 1,
            pageSize: 20,
          },
        })
        .then((response) => {
          const result = response.data
          console.log('got value, commiting', result)
          context.commit('setAsts', result)
        })
        .catch((error) => console.error(error))
      return result
    },
  },
})

export default store

// Automatically run the `init` action for every module,
// if one exists.
// dispatchActionForAllModules('init')
