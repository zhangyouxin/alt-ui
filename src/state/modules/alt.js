/* eslint-disable no-unused-vars */
import axios from 'axios'
const API = 'http://myapi.weshinekx.cn/api'

export const state = {}

export const getters = {}

export const mutations = {
  SET_CURRENT_ALTS(state, newValue) {
    state.alts = newValue
  },
}

export const actions = {
  init({ state, dispatch }) {
    state.alts = []
  },

  fetchAlts({ commit, dispatch, getters }) {
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
        commit('SET_CURRENT_ALTS', result)
      })
      .catch((error) => console.error(error))
    return result
  },
}
