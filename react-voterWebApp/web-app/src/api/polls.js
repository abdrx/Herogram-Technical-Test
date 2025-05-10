import axios from 'axios'

const API = 'http://localhost:3000'

export const getActivePolls = async () => {
  const res = await axios.get(`${API}/poll/active`)
  return res.data
}

export const getPollById = async (id) => {
  const res = await axios.get(`${API}/poll/${id}`)
  return res.data
}

export const voteOnPoll = async (voter, optionId) => {
  const response = await axios.post(
    'http://localhost:3000/vote',
    { voter, optionId },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    }
  )
  return response.data
}
