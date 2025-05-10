import axios from 'axios'
const BASE = 'http://localhost:3000'

export const getPolls    = () => axios.get(`${BASE}/poll/active`).then(r => r.data)
export const getPoll     = id => axios.get(`${BASE}/poll/${id}`).then(r => r.data)
export const createPoll  = p  => axios.post(`${BASE}/poll`, p).then(r => r.data)
export const activate    = id => axios.patch(`${BASE}/poll/${id}/activate`)
export const deactivate  = id => axios.patch(`${BASE}/poll/${id}/deactivate`)
export const remove      = id => axios.delete(`${BASE}/poll/${id}`)
