import React, { useState } from 'react'
import PollForm from '../components/PollForm'
import PollList from '../components/PollList'

export default function PollManagement () {
  const [key, setKey] = useState(0)
  return (
    <div className="poll-page">
      <PollForm onCreated={() => setKey(k => k + 1)} />
      <div className="poll-list" key={key}>
        <PollList />
      </div>
    </div>
  )
}
