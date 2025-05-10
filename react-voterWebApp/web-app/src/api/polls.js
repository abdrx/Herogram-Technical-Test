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

export const submitVote = async (questionId, optionId, voterName) => {
  const res = await axios.post(`${API}/vote`, {
    questionId,
    optionId,
    voterName
  })
  return res.data
}
