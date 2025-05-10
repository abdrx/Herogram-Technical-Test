import React from 'react'   
import { useState } from 'react'
import { createPoll } from '../api/polls'

export default function PollForm({ onCreated }) {
  const [title,setTitle] = useState('')
  const [questions,setQuestions] = useState([{ text:'', options:[''] }])

  const setQ = (i,obj)=>setQuestions(q=>q.map((e,j)=>j===i?{...e,...obj}:e))

  const addQuestion = () => setQuestions(q=>[...q,{ text:'', options:[''] }])

  const addOption = (qi) => setQ(qi,{ options:[...questions[qi].options,''] })

  const submit = async e => {
    e.preventDefault()
    await createPoll({ title, questions })
    setTitle(''); setQuestions([{text:'',options:['']}]); onCreated()
  }

  return (
    <form onSubmit={submit}>
      <h3>Create Poll</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Poll title" required />
      {questions.map((q,qi)=>(
        <div key={qi}>
          <input value={q.text} onChange={e=>setQ(qi,{text:e.target.value})} placeholder="Question" required />
          {q.options.map((opt,oi)=>(
            <input key={oi} value={opt}
              onChange={e=>{
                const opts=[...q.options]; opts[oi]=e.target.value
                setQ(qi,{options:opts})
              }}
              placeholder={`Option ${oi+1}`} required />
          ))}
          <button type="button" onClick={()=>addOption(qi)}>+ Option</button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>+ Question</button>
      <button type="submit">Save</button>
    </form>
  )
}
