import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPoll } from '../api/polls'

export default function PollDetail () {
  const { id: pollId } = useParams()
  const [poll, setPoll] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const data = await getPoll(pollId)
        setPoll(data)
      } catch (err) {
        setPoll(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPoll()
  }, [pollId])

  useEffect(() => {
    if (!poll) return

    const eventSource = new EventSource(`http://localhost:3000/poll/${pollId}/stream`)

    eventSource.onmessage = (e) => {
      const liveResults = JSON.parse(e.data)

      const updatedPoll = { ...poll }
      updatedPoll.questions = updatedPoll.questions.map(q => {
        const updatedOptions = q.options.map(opt => {
          const result = liveResults.find(r => r.id === opt.id)
          return {
            ...opt,
            votes: result ? parseInt(result.votes) : 0
          }
        })
        return { ...q, options: updatedOptions }
      })

      setPoll(updatedPoll)
    }

    eventSource.onerror = () => {
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [poll, pollId])

  if (loading) return <p>Loading …</p>
  if (!poll)   return <p>Poll not found.</p>

  return (
    <div style={{ maxWidth: '700px' }}>
      <Link to="/polls">← back</Link>
      <h2>{poll.title}</h2>
      <p>Status: <strong>{poll.status}</strong></p>

      {poll.questions.map((q, i) => (
        <section key={q.id} style={{ marginBottom: '1.4rem' }}>
          <h4>{i + 1}. {q.text}</h4>
          <table style={{ width: '100%' }}>
            <thead><tr><th>Option</th><th>Votes</th></tr></thead>
            <tbody>
              {q.options.map(o => (
                <tr key={o.id}>
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
