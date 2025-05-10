import axios from 'axios'

const API_BASE = 'http://localhost:3000'

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
  }
})

export const fetchPoll = async (pollId) => {
  const response = await axios.get(`${API_BASE}/poll/${pollId}`, getAuthHeaders())
  return response.data
}

export const voteOnPoll = async (pollId, option) => {
  const response = await axios.post(
    `${API_BASE}/poll/${pollId}/vote`,
    { option },
    getAuthHeaders()
  )
  return response.data
}
