import { useEffect, useState } from 'react'
import { fetchPoll, voteOnPoll } from '../api/poll'

export default function Poll({ pollId }) {
  const [poll, setPoll] = useState(null)
  const [selected, setSelected] = useState('')
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    fetchPoll(pollId).then(setPoll)
  }, [pollId])

  const handleVote = async () => {
    await voteOnPoll(pollId, selected)
    setVoted(true)
  }

  if (!poll) return <p>Loading poll...</p>
  if (voted) return <p>Thanks for voting!</p>

  return (
    <div>
      <h3>{poll.question}</h3>
      {poll.options.map((opt, i) => (
        <div key={i}>
          <input
            type="radio"
            name="pollOption"
            value={opt}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
          />
          <label>{opt}</label>
        </div>
      ))}
      <button onClick={handleVote} disabled={!selected}>Submit Vote</button>
    </div>
  )
}
