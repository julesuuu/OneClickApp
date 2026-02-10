import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const patchMe = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.patch(`${baseUrl}/me`, newObject, config)
  return response.data
}

export default { getAll, create, setToken, patchMe } 