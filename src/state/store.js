/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import dispatchActionForAllModules from '@utils/dispatch-action-for-all-modules'
import axios from 'axios'
import modules from './modules'

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
    alts: {
      count: 0,
      current: 1,
      rows: [],
      currentAlt: {},
    },
    asts: {
      count: 0,
      current: 1,
      rows: [],
      currentAst: {},
    },
  },
  mutations: {
    setAlts(state, alts) {
      state.alts = {
        ...state.alts,
        ...alts,
      }
    },
    setAsts(state, asts) {
      state.asts = {
        ...state.asts,
        ...asts,
      }
    },
    setCurrentAlt(state, alt) {
      state.alts.currentAlt = alt
    },
    setCurrentAst(state, ast) {
      state.asts.currentAst = ast
    },
  },
  actions: {
    fetchAlts(context, e) {
      const result = 'init value'
      axios
        .get(`${process.env.VUE_APP_API}/alt`, {
          params: {
            pageNumber: e ? e.current - 1 : 0,
            pageSize: e ? e.pageSize : 15,
          },
        })
        .then((response) => {
          const result = response.data
          result.current = e ? e.current : 1
          context.commit('setAlts', result)
        })
        .catch((error) => console.error(error))
      return result
    },
    fetchAlt(context, id) {
      console.log(id)
      axios
        .get(`${process.env.VUE_APP_API}/alt/${id}`)
        .then((response) => {
          const result = response.data
          context.commit('setCurrentAlt', result)
        })
        .catch((error) => console.error(error))
    },

    fetchAsts(context, e) {
      const result = 'init value'
      axios
        .get(`${process.env.VUE_APP_API}/ast`, {
          params: {
            pageNumber: e ? e.current - 1 : 0,
            pageSize: e ? e.pageSize : 15,
          },
        })
        .then((response) => {
          const result = response.data
          result.current = e ? e.current : 1
          context.commit('setAsts', result)
        })
        .catch((error) => console.error(error))
      return result
    },
    fetchAst(context, id) {
      axios
        .get(`${process.env.VUE_APP_API}/ast/${id}`)
        .then((response) => {
          const result = response.data
          context.commit('setCurrentAst', result)
        })
        .catch((error) => console.error(error))
    },
  },
})

export default store

// Automatically run the `init` action for every module,
// if one exists.
// dispatchActionForAllModules('init')
