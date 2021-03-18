/* eslint-disable no-unused-vars */
import envs from './env'
const axios = require('axios')

export const hello = async () => {
  let result = ''
  await axios
    .get(envs.api)
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}

export const newAlt = async (params) => {
  let result = ''
  await axios
    .post(`${envs.api}/alt`, {
      params: '隐藏参数',
      itemName: params.itemName,
    })
    .then((response) => {
      console.log('new alt done', response.data)
      return axios
        .post(`${envs.alt}`, {
          ...params,
          type: 'alt',
          id: response.data.id,
        })
        .then((response) => {
          console.log('python calculation start,', response.data)
          return (result = response.data)
        })
        .catch((error) => console.error(error))
    })
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))

  return result
}

export const newDevice = async (params) => {
  let result = ''
  await axios
    .post(`${envs.api}/device`, { ...params })
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}

export const newAst = async (params) => {
  let result = ''
  await axios
    .post(`${envs.api}/ast`, {
      params: JSON.stringify(params),
      itemName: params.itemName,
    })
    .then((response) => {
      console.log('new ast done', response.data)
      return axios
        .post(`${envs.python}`, {
          ...params,
          type: 'ast',
          id: response.data.id,
        })
        .then((response) => {
          console.log('python calculation start,', response.data)
          return (result = response.data)
        })
        .catch((error) => console.error(error))
    })
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}

export const fetchCountLatestAlts = async (params) => {
  let result = ''
  await axios
    .get(`${envs.api}/countLatestAlts`)
    .then((response) => {
      result = response.data
    })
    .catch((error) => console.error(error))
  return result
}

export const fetchCountLatestAsts = async (params) => {
  let result = ''
  await axios
    .get(`${envs.api}/countLatestAsts`)
    .then((response) => {
      result = response.data
    })
    .catch((error) => console.error(error))
  return result
}

export const fetchCountAll = async (params) => {
  let result = ''
  await axios
    .get(`${envs.api}/countAll`)
    .then((response) => {
      result = response.data
    })
    .catch((error) => console.error(error))
  return result
}

export const login = async (params) => {
  let result = ''
  await axios
    .post(`${envs.api}/login`, { ...params })
    .then((response) => {
      result = response.data
    })
    .catch((error) => console.error(error))
  return result
}
