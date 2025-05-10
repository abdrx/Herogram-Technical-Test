import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPolls, activate, deactivate, remove } from '../api/polls'

export default function PollList () {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = () =>
    getPolls()
      .then(setPolls)
      .finally(() => setLoading(false))

  useEffect(() => { refresh() }, [])

  const action = (fn, id) => fn(id).then(refresh)

  if (loading) return <p>Loading …</p>
  if (!polls.length) return <p><em>No active polls.</em></p>

  return (
    <table>
      <thead>
        <tr><th>Title</th><th>ID</th><th style={{width:'220px'}}>Actions</th></tr>
      </thead>
      <tbody>
        {polls.map(p => (
          <tr key={p.id}>
            <td>{p.title}</td>
            <td>{p.id.slice(0,8)}…</td>
            <td>
              <Link   to={`/polls/${p.id}`} className="btn outline">View</Link>
              <button className="btn"          onClick={() => action(deactivate, p.id)}>Deactivate</button>
              <button className="btn danger"   onClick={() => action(remove,     p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
