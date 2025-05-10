import axios from 'axios'

const API_BASE = 'http://localhost:3000'

export const authenticateNamedUser = async (name) => {
  const response = await axios.post(`${API_BASE}/auth/named`, { name })
  return response.data
}
