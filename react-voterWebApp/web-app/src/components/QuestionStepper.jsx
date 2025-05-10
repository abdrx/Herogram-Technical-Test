import { useEffect, useState } from 'react'
import { getPollById, submitVote } from '../api/polls'

export default function QuestionStepper({ poll, userName }) {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    getPollById(poll.id).then((data) => setQuestions(data.questions || []))
  }, [poll.id])

  const handleVote = async (optionId) => {
    const question = questions[currentIndex]
    await submitVote(question.id, optionId, userName)
    setCurrentIndex(currentIndex + 1)
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
