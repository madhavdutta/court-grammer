import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'
import { Settings, Play, CheckCircle, XCircle, RotateCcw, Award, Target } from 'lucide-react'

const Quiz = () => {
  const { addQuizResult } = useUser()
  const [quizConfig, setQuizConfig] = useState({
    category: 'all',
    difficulty: 'mixed',
    questionCount: 10
  })
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(null)

  const questionBank = [
    {
      id: 1,
      category: 'punctuation',
      difficulty: 'beginner',
      question: 'Which sentence is correctly punctuated for a court transcript?',
      options: [
        'The witness said "I was there at 3 PM".',
        'The witness said, "I was there at 3 PM."',
        'The witness said: "I was there at 3 PM".',
        'The witness said; "I was there at 3 PM".'
      ],
      correct: 1,
      explanation: 'Use a comma before direct quotations in testimony.'
    },
    {
      id: 2,
      category: 'grammar',
      difficulty: 'intermediate',
      question: 'Choose the correct subject-verb agreement:',
      options: [
        'Each of the attorneys are present.',
        'Each of the attorneys is present.',
        'Each of the attorneys were present.',
        'Each of the attorneys have been present.'
      ],
      correct: 1,
      explanation: '"Each" is singular and requires the singular verb "is."'
    },
    {
      id: 3,
      category: 'legal-style',
      difficulty: 'advanced',
      question: 'How should multiple simultaneous speakers be noted?',
      options: [
        'SPEAKERS: (Speaking simultaneously)',
        '(Multiple speakers talking at once)',
        '(Simultaneous speakers.)',
        'ALL: (Speaking together)'
      ],
      correct: 2,
      explanation: 'Use "(Simultaneous speakers.)" as a parenthetical notation.'
    },
    {
      id: 4,
      category: 'punctuation',
      difficulty: 'intermediate',
      question: 'When should you use a semicolon in legal writing?',
      options: [
        'To separate items in a simple list',
        'Before direct quotations',
        'To separate items in a complex list with internal commas',
        'After introductory phrases'
      ],
      correct: 2,
      explanation: 'Semicolons separate items in complex lists where items contain commas.'
    },
    {
      id: 5,
      category: 'grammar',
      difficulty: 'beginner',
      question: 'Which pronoun is correct for a corporation?',
      options: [
        'The company filed their motion.',
        'The company filed its motion.',
        'The company filed it\'s motion.',
        'The company filed there motion.'
      ],
      correct: 1,
      explanation: 'Corporations are singular entities and use "its" (possessive without apostrophe).'
    },
    {
      id: 6,
      category: 'legal-style',
      difficulty: 'beginner',
      question: 'How should attorney names be formatted in transcripts?',
      options: [
        'Mr. Smith:',
        'MR. SMITH:',
        'mr. smith:',
        'Mr Smith:'
      ],
      correct: 1,
      explanation: 'Attorney names should be in all caps with periods after titles.'
    },
    {
      id: 7,
      category: 'punctuation',
      difficulty: 'advanced',
      question: 'Which colon usage is correct in legal context?',
      options: [
        'The time was: 9:30 a.m.',
        'The verdict was clear: guilty.',
        'He said: that he was innocent.',
        'The witness: testified clearly.'
      ],
      correct: 1,
      explanation: 'Colons introduce explanations or clarifications of the preceding statement.'
    },
    {
      id: 8,
      category: 'grammar',
      difficulty: 'advanced',
      question: 'Which sentence has correct pronoun-antecedent agreement?',
      options: [
        'The jury announced their verdict.',
        'The jury announced its verdict.',
        'The jury announced it\'s verdict.',
        'The jury announced there verdict.'
      ],
      correct: 1,
      explanation: 'In legal context, "jury" is typically treated as a singular collective noun.'
    }
  ]

  const generateQuiz = () => {
    let filteredQuestions = questionBank

    // Filter by category
    if (quizConfig.category !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.category === quizConfig.category)
    }

    // Filter by difficulty
    if (quizConfig.difficulty !== 'mixed') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === quizConfig.difficulty)
    }

    // Shuffle and select questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5)
    const selectedQuestions = shuffled.slice(0, Math.min(quizConfig.questionCount, shuffled.length))

    setCurrentQuiz(selectedQuestions)
    setCurrentQuestion(0)
    setUserAnswers({})
    setShowResults(false)
    
    // Set timer if needed
    if (quizConfig.timed) {
      setTimeRemaining(selectedQuestions.length * 60) // 1 minute per question
    }
  }

  const handleAnswer = (questionId, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const calculateScore = () => {
    let correct = 0
    currentQuiz.forEach(question => {
      if (userAnswers[question.id] === question.correct) {
        correct++
      }
    })
    return Math.round((correct / currentQuiz.length) * 100)
  }

  const handleSubmitQuiz = () => {
    const score = calculateScore()
    const result = {
      score,
      category: quizConfig.category,
      difficulty: quizConfig.difficulty,
      questionCount: currentQuiz.length,
      correctAnswers: currentQuiz.filter(q => userAnswers[q.id] === q.correct).length
    }
    
    addQuizResult(result)
    setShowResults(true)
  }

  const resetQuiz = () => {
    setCurrentQuiz(null)
    setCurrentQuestion(0)
    setUserAnswers({})
    setShowResults(false)
    setTimeRemaining(null)
  }

  // Quiz Results View
  if (showResults && currentQuiz) {
    const score = calculateScore()
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              score >= 90 ? 'bg-green-100' : score >= 70 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {score >= 90 ? (
                <Award className="w-10 h-10 text-green-600" />
              ) : (
                <Target className="w-10 h-10 text-gray-600" />
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
            <p className="text-xl text-gray-600 mb-2">
              Your Score: <span className={`font-bold ${
                score >= 90 ? 'text-green-600' : score >= 70 ? 'text-yellow-600' : 'text-red-600'
              }`}>{score}%</span>
            </p>
            <p className="text-gray-500 mb-8">
              {currentQuiz.filter(q => userAnswers[q.id] === q.correct).length} out of {currentQuiz.length} correct
            </p>
            
            <div className="space-y-6 mb-8 text-left">
              {currentQuiz.map((question, index) => {
                const userAnswer = userAnswers[question.id]
                const isCorrect = userAnswer === question.correct
                
                return (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <p className={`text-sm mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-700 mb-2">
                            Correct answer: {question.options[question.correct]}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <button
              onClick={resetQuiz}
              className="btn btn-primary"
            >
              <RotateCcw className="w-4 h-4" />
              Take Another Quiz
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  // Active Quiz View
  if (currentQuiz && !showResults) {
    const question = currentQuiz[currentQuestion]
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Question {currentQuestion + 1} of {currentQuiz.length}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {question.category.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    question.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                    question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {question.difficulty.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / currentQuiz.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                {question.question}
              </h3>

              <div className="space-y-3 mb-8">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className={`quiz-option block cursor-pointer ${
                      userAnswers[question.id] === index ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={index}
                      checked={userAnswers[question.id] === index}
                      onChange={() => handleAnswer(question.id, index)}
                      className="sr-only"
                    />
                    <span className="text-gray-900">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="btn btn-secondary"
                >
                  Previous
                </button>

                {currentQuestion === currentQuiz.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(userAnswers).length !== currentQuiz.length}
                    className="btn btn-success"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestion(Math.min(currentQuiz.length - 1, currentQuestion + 1))}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Quiz Configuration View
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Customizable Quizzes</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Test your knowledge with personalized quizzes tailored to your learning needs.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Quiz Configuration</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Focus
              </label>
              <select
                value={quizConfig.category}
                onChange={(e) => setQuizConfig(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="punctuation">Punctuation</option>
                <option value="grammar">Grammar</option>
                <option value="legal-style">Legal Style</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={quizConfig.difficulty}
                onChange={(e) => setQuizConfig(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="mixed">Mixed Difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                value={quizConfig.questionCount}
                onChange={(e) => setQuizConfig(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <button
              onClick={generateQuiz}
              className="w-full btn btn-primary text-lg py-4"
            >
              <Play className="w-5 h-5" />
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Quiz
