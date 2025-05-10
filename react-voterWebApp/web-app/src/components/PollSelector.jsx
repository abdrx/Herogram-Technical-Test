import { useEffect, useState } from 'react'
import { getActivePolls } from '../api/polls'

export default function PollSelector({ onSelect }) {
  const [polls, setPolls] = useState([])

  useEffect(() => {
    getActivePolls().then(setPolls)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h2>Select an Active Poll</h2>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id}>
            <button onClick={() => onSelect(poll)}>{poll.title}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
