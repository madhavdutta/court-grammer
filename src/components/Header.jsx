import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, User, Menu } from 'lucide-react'

const Header = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/lessons', label: 'Lessons' },
    { path: '/practice', label: 'Practice' },
    { path: '/scenarios', label: 'Scenarios' },
    { path: '/progress', label: 'Progress' },
    { path: '/reference', label: 'Reference' }
  ]

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <BookOpen size={20} />
          </div>
          <div className="logo-text">
            <h1>Grammar Pro</h1>
            <p>Court Reporting</p>
          </div>
        </Link>

        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ 
            padding: '8px', 
            background: 'none', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#64748b'
          }}>
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
