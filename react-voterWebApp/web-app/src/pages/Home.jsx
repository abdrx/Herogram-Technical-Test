import { useState } from 'react'
import NameForm from '../components/NameForm'
import Poll from '../components/Poll'

export default function Home() {
  const [token, setToken] = useState(sessionStorage.getItem('accessToken'))
  const POLL_ID = 'replace-with-real-id'

  return (
    <div>
      <h2>Live Poll</h2>
      {token ? <Poll pollId={POLL_ID} /> : <NameForm onAuth={setToken} />}
    </div>
  )
}
