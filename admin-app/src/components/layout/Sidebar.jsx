import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar () {
  const linkStyle = ({ isActive }) =>
    'nav-link' + (isActive ? ' active' : '')

  return (
    <aside className="sidebar">
      <h2 className="logo">Admin</h2>
      <nav>
        <NavLink to="/"      end      className={linkStyle}>Dashboard</NavLink>
        <NavLink to="/polls"          className={linkStyle}>Poll&nbsp;Management</NavLink>
      </nav>
    </aside>
  )
}
