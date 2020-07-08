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
  console.log(`${process.env.VUE_APP_API}/alt`)
  await axios
    .post(`${process.env.VUE_APP_API}/alt`, { params: JSON.stringify(params) })
    .then((response) => {
      console.log('new alt done', response.data)
      return axios
        .post(`${process.env.VUE_APP_API_PYTHON}`, {
          params: JSON.stringify(params),
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

export const newAst = async (params) => {
  let result = ''
  await axios
    .post(`${process.env.VUE_APP_API}/ast`, {
      params: JSON.stringify(params),
      type: 'ast',
    })
    .then((response) => (result = response.data))
    .catch((error) => console.error(error))
  return result
}
