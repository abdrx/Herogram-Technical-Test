import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PollForm from '../components/PollForm'
import PollList from '../components/PollList'

export default function PollManagement() {
  const [key, setKey] = useState(0)

  return (
    <div className="container mx-auto p-4">
      {/* Form with slide-down entrance */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 bg-white rounded-2xl shadow-lg p-6"
      >
        <PollForm onCreated={() => setKey(k => k + 1)} />
      </motion.div>

      {/* List with fade-in/out on key change */}
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="poll-list grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <PollList />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
