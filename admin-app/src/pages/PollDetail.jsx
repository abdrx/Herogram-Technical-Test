import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPoll } from '../api/polls'

export default function PollDetail () {
  const { id } = useParams()
  const [poll, setPoll] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPoll(id)
      .then(setPoll)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading …</p>
  if (!poll)   return <p>Poll not found.</p>

  return (
    <div style={{maxWidth:'700px'}}>
      <Link to="/polls">← back</Link>
      <h2>{poll.title}</h2>
      <p>Status: <strong>{poll.status}</strong></p>
      {poll.questions.map((q,i) => (
        <section key={q.id} style={{marginBottom:'1.4rem'}}>
          <h4>{i+1}. {q.text}</h4>
          <table style={{width:'100%'}}>
            <thead><tr><th>Option</th><th>Votes</th></tr></thead>
            <tbody>
              {q.options.map(o => (
                <tr key={o.text}>
                  <td>{o.text}</td>
                  <td>{o.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  )
}
