import { useState } from 'react'
import NameForm from './components/NameForm'
import PollSelector from './components/PollSelector'
import QuestionStepper from './components/QuestionStepper'

export default function App() {
  const [name, setName] = useState('')
  const [poll, setPoll] = useState(null)

  if (!name) return <NameForm onSubmit={setName} />
  if (!poll) return <PollSelector onSelect={setPoll} />
  return <QuestionStepper poll={poll} userName={name} />
}
