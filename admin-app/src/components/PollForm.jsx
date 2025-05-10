// src/components/PollForm.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPoll } from '../api/polls'

export default function PollForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([{ text: '', options: [''] }])

  const setQ = (i, obj) =>
    setQuestions(q => q.map((e, j) => (j === i ? { ...e, ...obj } : e)))

  const addQuestion = () =>
    setQuestions(q => [...q, { text: '', options: [''] }])

  const addOption = qi =>
    setQ(qi, { options: [...questions[qi].options, ''] })

  const submit = async e => {
    e.preventDefault()
    await createPoll({ title, questions })
    setTitle('')
    setQuestions([{ text: '', options: [''] }])
    onCreated()
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
    >
      <h3 className="text-2xl font-semibold">Create Poll</h3>

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Poll title"
        required
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <AnimatePresence>
        {questions.map((q, qi) => (
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="border border-gray-200 rounded-lg p-4 space-y-4"
          >
            <input
              type="text"
              value={q.text}
              onChange={e => setQ(qi, { text: e.target.value })}
              placeholder="Question"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <motion.input
                  key={oi}
                  type="text"
                  value={opt}
                  onChange={e => {
                    const opts = [...q.options]
                    opts[oi] = e.target.value
                    setQ(qi, { options: opts })
                  }}
                  placeholder={`Option ${oi + 1}`}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: oi * 0.05 }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => addOption(qi)}
              className="text-blue-600 hover:underline text-sm"
            >
              + Option
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <button
          type="button"
          onClick={addQuestion}
          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          + Question
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Poll
        </button>
      </div>
    </motion.form>
  )
}
