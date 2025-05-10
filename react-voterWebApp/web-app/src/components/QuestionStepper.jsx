import { useEffect, useState } from 'react'
import { getPollById, voteOnPoll } from '../api/polls'

export default function QuestionStepper({ poll, userName }) {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    getPollById(poll.id).then((data) => setQuestions(data.questions || []))
  }, [poll.id])

  const handleVote = async (optionId) => {
    try {
      await voteOnPoll(userName, optionId)
      setCurrentIndex(currentIndex + 1)
    } catch (err) {
      console.error('Vote failed:', err)
      alert('Something went wrong while submitting your vote.')
    }
  }

  if (questions.length === 0) return <p>Loading questions...</p>
  if (currentIndex >= questions.length) return <h2>Thank you for voting!</h2>

  const question = questions[currentIndex]

  return (
    <div style={{ padding: 20 }}>
      <h3>{question.text}</h3>
      {question.options.map((opt) => (
        <div key={opt.id}>
          <button onClick={() => handleVote(opt.id)}>{opt.text}</button>
        </div>
      ))}
    </div>
  )
}
