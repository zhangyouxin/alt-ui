/* eslint-disable no-unused-vars */
import axios from 'axios'
const API = 'http://myapi.weshinekx.cn/api'

export const state = {}

export const getters = {}

export const mutations = {
  SET_CURRENT_ASTS(state, newValue) {
    state.asts = newValue
  },
}

export const actions = {
  init({ state, dispatch }) {
    state.asts = []
  },

  fetchAsts({ commit, dispatch, getters }) {
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
        commit('SET_CURRENT_ASTS', result)
      })
      .catch((error) => console.error(error))
    return result
  },
}
