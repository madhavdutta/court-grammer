import React from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'
import { 
  TrendingUp, Award, Target, BookOpen, Users, HelpCircle,
  Calendar, Star, Zap, Trophy, CheckCircle, Clock
} from 'lucide-react'

const Progress = () => {
  const { user } = useUser()

  const getAverageScore = (scores) => {
    if (scores.length === 0) return 0
    return Math.round(scores.reduce((sum, score) => sum + score.score, 0) / scores.length)
  }

  const getRecentActivity = () => {
    const activities = []
    
    // Add completed lessons
    user.completedLessons.forEach(lessonId => {
      activities.push({
        type: 'lesson',
        title: 'Completed Lesson',
        description: `Lesson ID: ${lessonId}`,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        icon: BookOpen,
        color: 'text-blue-600'
      })
    })

    // Add practice scores
    user.practiceScores.forEach((score, index) => {
      activities.push({
        type: 'practice',
        title: 'Practice Session',
        description: `Score: ${score.score}%`,
        date: new Date(score.date),
        icon: Target,
        color: 'text-green-600'
      })
    })

    // Add quiz results
    user.quizResults.forEach((result, index) => {
      activities.push({
        type: 'quiz',
        title: 'Quiz Completed',
        description: `Score: ${result.score}%`,
        date: new Date(result.date),
        icon: HelpCircle,
        color: 'text-purple-600'
      })
    })

    return activities.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
  }

  const progressStats = [
    {
      title: 'Total Points',
      value: user.totalPoints,
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      description: 'Points earned from all activities'
    },
    {
      title: 'Lessons Completed',
      value: user.completedLessons.length,
      total: 24,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      description: 'Interactive grammar lessons'
    },
    {
      title: 'Practice Average',
      value: `${getAverageScore(user.practiceScores)}%`,
      icon: Target,
      color: 'from-green-500 to-green-600',
      description: 'Average score across all practice sessions'
    },
    {
      title: 'Current Streak',
      value: user.streak,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      description: 'Consecutive days of activity'
    }
  ]

  const skillAreas = [
    {
      name: 'Punctuation',
      progress: Math.min(100, (user.completedLessons.filter(id => id.includes('punct')).length / 5) * 100),
      color: 'bg-blue-500'
    },
    {
      name: 'Grammar',
      progress: Math.min(100, (user.completedLessons.filter(id => id.includes('gram')).length / 8) * 100),
      color: 'bg-green-500'
    },
    {
      name: 'Legal Terminology',
      progress: Math.min(100, (user.completedLessons.filter(id => id.includes('legal')).length / 6) * 100),
      color: 'bg-purple-500'
    },
    {
      name: 'Court Procedures',
      progress: Math.min(100, (user.scenarioProgress.length / 5) * 100),
      color: 'bg-orange-500'
    }
  ]

  const recentActivity = getRecentActivity()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Progress</h1>
        <p className="text-xl text-gray-600">
          Track your learning journey and celebrate your achievements
        </p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {progressStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.total && (
                <span className="text-sm text-gray-500">{stat.value}/{stat.total}</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {typeof stat.value === 'number' && !stat.value.toString().includes('%') ? stat.value : stat.value}
            </h3>
            <p className="text-sm font-medium text-gray-700 mb-2">{stat.title}</p>
            <p className="text-xs text-gray-500">{stat.description}</p>
            {stat.total && (
              <div className="mt-3">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(stat.value / stat.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Areas</h2>
          <div className="space-y-6">
            {skillAreas.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">{Math.round(skill.progress)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`h-full ${skill.color} transition-all duration-500`}
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {activity.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400">Start learning to see your progress here!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'First Steps', 
              description: 'Complete your first lesson',
              unlocked: user.completedLessons.length > 0,
              icon: CheckCircle
            },
            { 
              title: 'Practice Makes Perfect', 
              description: 'Complete 5 practice sessions',
              unlocked: user.practiceScores.length >= 5,
              icon: Target
            },
            { 
              title: 'Quiz Master', 
              description: 'Score 100% on a quiz',
              unlocked: user.quizResults.some(r => r.score === 100),
              icon: Trophy
            },
            { 
              title: 'Dedicated Learner', 
              description: 'Maintain a 7-day streak',
              unlocked: user.streak >= 7,
              icon: Zap
            }
          ].map((achievement, index) => (
            <div
              key={achievement.title}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <achievement.icon
                className={`w-8 h-8 mb-3 ${
                  achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                }`}
              />
              <h3 className={`font-semibold mb-1 ${
                achievement.unlocked ? 'text-green-900' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm ${
                achievement.unlocked ? 'text-green-700' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Progress
