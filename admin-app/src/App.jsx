import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import PollManagement from './pages/PollManagement'
import PollDetail from './pages/PollDetail'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/polls" element={<PollManagement />} />
          <Route path="/polls/:id" element={<PollDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
