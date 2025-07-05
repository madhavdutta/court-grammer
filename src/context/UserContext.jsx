import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('courtReportingUser')
    return saved ? JSON.parse(saved) : {
      name: 'Court Reporter',
      level: 'Intermediate',
      completedLessons: [],
      quizScores: [],
      practiceScores: [],
      practiceStats: {
        totalExercises: 0,
        correctAnswers: 0,
        averageScore: 0
      },
      preferences: {
        difficulty: 'intermediate',
        focusAreas: ['punctuation', 'grammar']
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('courtReportingUser', JSON.stringify(user))
  }, [user])

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const addCompletedLesson = (lessonId) => {
    setUser(prev => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])]
    }))
  }

  const addQuizScore = (score, category) => {
    setUser(prev => ({
      ...prev,
      quizScores: [...prev.quizScores, { score, category, date: new Date().toISOString() }]
    }))
  }

  const addPracticeScore = (score) => {
    setUser(prev => {
      const newPracticeScores = [...prev.practiceScores, { 
        score, 
        date: new Date().toISOString(),
        exerciseCount: 5 // Based on the 5 exercises in Practice component
      }]
      
      // Update practice stats
      const totalExercises = prev.practiceStats.totalExercises + 5
      const correctAnswers = prev.practiceStats.correctAnswers + Math.round((score / 100) * 5)
      const averageScore = Math.round((correctAnswers / totalExercises) * 100)
      
      return {
        ...prev,
        practiceScores: newPracticeScores,
        practiceStats: {
          totalExercises,
          correctAnswers,
          averageScore
        }
      }
    })
  }

  const updatePracticeStats = (correct, total) => {
    setUser(prev => {
      const newTotal = prev.practiceStats.totalExercises + total
      const newCorrect = prev.practiceStats.correctAnswers + correct
      return {
        ...prev,
        practiceStats: {
          totalExercises: newTotal,
          correctAnswers: newCorrect,
          averageScore: Math.round((newCorrect / newTotal) * 100)
        }
      }
    })
  }

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      addCompletedLesson,
      addQuizScore,
      addPracticeScore,
      updatePracticeStats
    }}>
      {children}
    </UserContext.Provider>
  )
}
