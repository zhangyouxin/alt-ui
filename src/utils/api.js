/* eslint-disable no-unused-vars */
export const API = 'http://myapi.weshinekx.cn/api'
export const API_UPLOAD = 'http://upload.weshinekx.cn'
export const API_PYTHON = 'http://python.weshinekx.cn'

export const API_PYTHON1 = 'http://localhost:7080'
export const API_UPLOAD1 = 'http://localhost:6080'
export const API1 = 'http://localhost:3080/api'

const axios = require('axios')

export const hello = async () => {
  let result = ''
  await axios
    .get(API)
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}

export const fetchAlts = async () => {
  let result = ''
  await axios
    .get(`${API}/alt`, {
      params: {
        page: 1,
        pageSize: 20,
      },
    })
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}

export const newAlt = async (params) => {
  let result = ''
  await axios
    .post(`${API}/alt`, { params: JSON.stringify(params) })
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}

export const newAst = async (params) => {
  let result = ''
  await axios
    .post(`${API}/ast`, { params: JSON.stringify(params) })
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}
