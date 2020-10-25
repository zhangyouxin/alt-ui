/* eslint-disable no-unused-vars */
const axios = require('axios')

export const hello = async () => {
  let result = ''
  await axios
    .get(process.env.VUE_APP_API)
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}

export const newAlt = async (params) => {
  let result = ''
  await axios
    .post(`${process.env.VUE_APP_API}/alt`, {
      params: '隐藏参数',
      itemName: params.itemName,
    })
    .then((response) => {
      console.log('new alt done', response.data)
      return axios
        .post(`${process.env.VUE_APP_API_ALT}`, {
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
    .post(`${process.env.VUE_APP_API}/device`, { ...params })
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}

export const newAst = async (params) => {
  let result = ''
  await axios
    .post(`${process.env.VUE_APP_API}/ast`, {
      params: '隐藏参数',
      itemName: params.itemName,
    })
    .then((response) => {
      console.log('new ast done', response.data)
      return axios
        .post(`${process.env.VUE_APP_API_PYTHON}`, {
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
    .get(`${process.env.VUE_APP_API}/countLatestAlts`)
    .then((response) => {
      result = response.data
    })
    .catch((error) => console.error(error))
  return result
}

export const fetchCountLatestAsts = async (params) => {
  let result = ''
  await axios
    .get(`${process.env.VUE_APP_API}/countLatestAsts`)
    .then((response) => {
      result = response.data
    })
    .catch((error) => console.error(error))
  return result
}

export const fetchCountAll = async (params) => {
  let result = ''
  await axios
    .get(`${process.env.VUE_APP_API}/countAll`)
    .then((response) => {
      result = response.data
    })
    .catch((error) => console.error(error))
  return result
}

export const login = async (params) => {
  let result = ''
  await axios
    .post(`${process.env.VUE_APP_API}/login`, { ...params })
    .then((response) => {
      result = response.data
    })
    .catch((error) => console.error(error))
  return result
}
