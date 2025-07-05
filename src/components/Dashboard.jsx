import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Target, Users, TrendingUp, FileText, Brain, Award, Clock, CheckCircle, ArrowRight, Star, Zap, Calendar } from 'lucide-react'
import { useUser } from '../context/UserContext'

const Dashboard = () => {
  const { user } = useUser()

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Master grammar and punctuation with structured lessons tailored for court reporting',
      path: '/lessons',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea'
    },
    {
      icon: Target,
      title: 'Practice Exercises',
      description: 'Targeted exercises focusing on common court reporting grammar challenges',
      path: '/practice',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#10b981'
    },
    {
      icon: Users,
      title: 'Real Scenarios',
      description: 'Practice with actual court reporting situations and legal terminology',
      path: '/scenarios',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      color: '#8b5cf6'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics and performance metrics',
      path: '/progress',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: '#f59e0b'
    },
    {
      icon: FileText,
      title: 'Reference Guide',
      description: 'Quick access to grammar rules, punctuation guidelines, and legal style guides',
      path: '/reference',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      color: '#06b6d4'
    },
    {
      icon: Brain,
      title: 'Custom Quizzes',
      description: 'Test your knowledge with personalized quizzes based on your learning progress',
      path: '/quiz',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      color: '#ec4899'
    }
  ]

  const stats = [
    { 
      label: 'Lessons Completed', 
      value: user?.completedLessons?.length || 0, 
      icon: Award,
      total: 24,
      color: '#667eea',
      change: '+2 this week'
    },
    { 
      label: 'Practice Score', 
      value: `${user?.practiceStats?.averageScore || 0}%`, 
      icon: CheckCircle,
      total: 100,
      color: '#10b981',
      change: '+5% improvement'
    },
    { 
      label: 'Study Streak', 
      value: '7 days', 
      icon: Zap,
      total: null,
      color: '#f59e0b',
      change: 'Keep it up!'
    },
    { 
      label: 'Quiz Average', 
      value: user?.quizScores?.length > 0 
        ? `${Math.round(user.quizScores.reduce((acc, score) => acc + score.score, 0) / user.quizScores.length)}%`
        : '0%', 
      icon: Brain,
      total: 100,
      color: '#ec4899',
      change: 'Ready to start'
    }
  ]

  const recentActivity = [
    { type: 'lesson', title: 'Completed: Comma Usage in Legal Documents', time: '2 hours ago', icon: BookOpen },
    { type: 'practice', title: 'Practice Session: 85% Score', time: '1 day ago', icon: Target },
    { type: 'quiz', title: 'Grammar Quiz: Advanced Level', time: '3 days ago', icon: Brain }
  ]

  const quickActions = [
    { title: 'Continue Learning', subtitle: 'Resume your last lesson', path: '/lessons', icon: BookOpen, color: '#667eea' },
    { title: 'Daily Practice', subtitle: '5 min grammar exercises', path: '/practice', icon: Target, color: '#10b981' },
    { title: 'Take Quiz', subtitle: 'Test your knowledge', path: '/quiz', icon: Brain, color: '#ec4899' }
  ]

  return (
    <div className="dashboard-redesigned">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1>Welcome back, {user?.name || 'Court Reporter'}!</h1>
            <p>Continue your journey to master English grammar and punctuation for professional court reporting</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <Star className="hero-stat-icon" />
                <span>Level: {user?.level || 'Intermediate'}</span>
              </div>
              <div className="hero-stat">
                <Calendar className="hero-stat-icon" />
                <span>7-day streak</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="achievement-circle">
              <div className="achievement-inner">
                <Award size={48} />
                <span>Pro</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="dashboard-container">
        {/* Quick Actions */}
        <motion.section 
          className="quick-actions-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Link to={action.path} className="quick-action-card">
                  <div className="quick-action-icon" style={{ backgroundColor: action.color }}>
                    <action.icon size={24} />
                  </div>
                  <div className="quick-action-content">
                    <h3>{action.title}</h3>
                    <p>{action.subtitle}</p>
                  </div>
                  <ArrowRight className="quick-action-arrow" size={20} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Overview */}
        <motion.section 
          className="stats-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2>Your Progress</h2>
          <div className="stats-grid-redesigned">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card-redesigned"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <div className="stat-header">
                  <div className="stat-icon-redesigned" style={{ backgroundColor: stat.color }}>
                    <stat.icon size={20} />
                  </div>
                  <div className="stat-change">{stat.change}</div>
                </div>
                <div className="stat-value-redesigned">{stat.value}</div>
                <div className="stat-label-redesigned">{stat.label}</div>
                {stat.total && (
                  <div className="stat-progress">
                    <div 
                      className="stat-progress-fill" 
                      style={{ 
                        width: `${Math.min((parseInt(stat.value) / stat.total) * 100, 100)}%`,
                        backgroundColor: stat.color 
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="dashboard-columns">
          {/* Main Features */}
          <motion.section 
            className="features-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h2>Learning Modules</h2>
            <div className="features-grid-redesigned">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                >
                  <Link to={feature.path} className="feature-card-redesigned">
                    <div className="feature-card-header">
                      <div 
                        className="feature-icon-redesigned" 
                        style={{ backgroundColor: feature.color }}
                      >
                        <feature.icon size={28} />
                      </div>
                      <ArrowRight className="feature-arrow" size={20} />
                    </div>
                    <h3 className="feature-title-redesigned">{feature.title}</h3>
                    <p className="feature-description-redesigned">{feature.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Recent Activity */}
          <motion.section 
            className="activity-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="activity-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 2.0 + index * 0.1 }}
                >
                  <div className="activity-icon">
                    <activity.icon size={16} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
