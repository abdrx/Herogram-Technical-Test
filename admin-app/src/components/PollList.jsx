// src/components/PollList.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getPolls, activate, deactivate, remove } from '../api/polls'

export default function PollList () {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = () =>
    getPolls()
      .then(setPolls)
      .finally(() => setLoading(false))

  useEffect(() => { refresh() }, [])

  const action = (fn, id) => fn(id).then(refresh)

  if (loading) return <p className="text-center py-4">Loading …</p>
  if (!polls.length) return <p className="text-center py-4 italic">No active polls.</p>

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Title</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <AnimatePresence>
            {polls.map(p => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="hover:bg-gray-100"
              >
                <td className="px-4 py-3 text-sm text-gray-800">{p.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.id.slice(0, 8)}…</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <Link
                    to={`/polls/${p.id}`}
                    className="inline-block px-3 py-1 border border-blue-500 rounded-lg text-blue-500 text-sm hover:bg-blue-50"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => action(p.active ? deactivate : activate, p.id)}
                    className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm hover:bg-yellow-200"
                  >
                    {p.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => action(remove, p.id)}
                    className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}
