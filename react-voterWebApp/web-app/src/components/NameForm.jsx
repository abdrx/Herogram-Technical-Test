import { useState } from 'react'

export default function NameForm({ onSubmit }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) onSubmit(name.trim())
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Enter Your Name</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <button type="submit">Continue</button>
    </form>
  )
}
