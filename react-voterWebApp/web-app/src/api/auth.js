import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const authenticateNamedUser = async (name) => {
  const res = await axios.post(`${API_URL}/auth/named`, { name })
  return res.data
}
