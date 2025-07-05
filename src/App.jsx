import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Lessons from './components/Lessons'
import Practice from './components/Practice'
import Scenarios from './components/Scenarios'
import Progress from './components/Progress'
import Reference from './components/Reference'
import Quiz from './components/Quiz'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <Router>
        <div style={{ minHeight: '100vh' }}>
          <Header />
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/scenarios" element={<Scenarios />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/reference" element={<Reference />} />
                <Route path="/quiz" element={<Quiz />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
