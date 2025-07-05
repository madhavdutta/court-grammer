import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'
import { CheckCircle, XCircle, RotateCcw, Target, Award } from 'lucide-react'

const Practice = () => {
  const { addPracticeScore } = useUser()
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const exercises = [
    {
      id: 1,
      type: 'punctuation',
      question: 'Choose the correctly punctuated sentence for a court transcript:',
      options: [
        'The witness stated, "I saw the defendant at 3:00 p.m."',
        'The witness stated "I saw the defendant at 3:00 p.m."',
        'The witness stated: "I saw the defendant at 3:00 p.m."',
        'The witness stated; "I saw the defendant at 3:00 p.m."'
      ],
      correct: 0,
      explanation: 'When introducing a direct quote in testimony, use a comma before the quotation marks. This is standard practice in legal transcription.'
    },
    {
      id: 2,
      type: 'grammar',
      question: 'Select the sentence with correct subject-verb agreement:',
      options: [
        'Each of the defendants are responsible for damages.',
        'Each of the defendants is responsible for damages.',
        'Each of the defendants were responsible for damages.',
        'Each of the defendants have been responsible for damages.'
      ],
      correct: 1,
      explanation: '"Each" is singular and requires a singular verb "is." This is a common error in legal writing where the plural "defendants" can mislead the verb choice.'
    },
    {
      id: 3,
      type: 'legal-style',
      question: 'How should an attorney objection be formatted in a transcript?',
      options: [
        'MR. SMITH: Objection, Your Honor. Hearsay.',
        'MR. SMITH: "Objection, Your Honor. Hearsay."',
        'Mr. Smith: Objection, Your Honor. Hearsay.',
        'MR SMITH: Objection, Your Honor. Hearsay.'
      ],
      correct: 0,
      explanation: 'Attorney names should be in all caps with periods after titles (MR., MS., DR.). No quotation marks are needed for spoken words in transcripts.'
    },
    {
      id: 4,
      type: 'punctuation',
      question: 'Which sentence correctly uses semicolons in a legal context?',
      options: [
        'The contract includes three parties: the buyer, the seller, and the agent.',
        'The contract includes three parties; the buyer; the seller; and the agent.',
        'Present were: John Smith, plaintiff; Mary Jones, attorney; Robert Brown, witness.',
        'Present were; John Smith, plaintiff, Mary Jones, attorney, Robert Brown, witness.'
      ],
      correct: 2,
      explanation: 'Use semicolons to separate items in a series when the items themselves contain commas. This prevents confusion in complex lists common in legal documents.'
    },
    {
      id: 5,
      type: 'grammar',
      question: 'Choose the correct pronoun usage in this legal context:',
      options: [
        'The corporation filed their annual report.',
        'The corporation filed its annual report.',
        'The corporation filed it\'s annual report.',
        'The corporation filed there annual report.'
      ],
      correct: 1,
      explanation: 'Corporations are singular entities and take singular pronouns. "Its" (without apostrophe) is the possessive form, while "it\'s" means "it is."'
    }
  ]

  const handleAnswer = (questionId, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const calculateScore = () => {
    let correct = 0
    exercises.forEach(exercise => {
      if (userAnswers[exercise.id] === exercise.correct) {
        correct++
      }
    })
    return Math.round((correct / exercises.length) * 100)
  }

  const handleSubmit = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setShowResults(true)
    addPracticeScore(finalScore)
  }

  const resetPractice = () => {
    setCurrentExercise(0)
    setUserAnswers({})
    setShowResults(false)
    setScore(0)
  }

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {score >= 80 ? (
                <Award className="w-10 h-10 text-green-600" />
              ) : (
                <Target className="w-10 h-10 text-gray-600" />
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice Complete!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Your Score: <span className={`font-bold ${
                score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>{score}%</span>
            </p>
            
            <div className="space-y-6 mb-8">
              {exercises.map((exercise, index) => {
                const userAnswer = userAnswers[exercise.id]
                const isCorrect = userAnswer === exercise.correct
                
                return (
                  <div key={exercise.id} className="text-left p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">
                          Question {index + 1}: {exercise.question}
                        </p>
                        <p className={`text-sm mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Your answer: {exercise.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-700 mb-2">
                            Correct answer: {exercise.options[exercise.correct]}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          {exercise.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <button
              onClick={resetPractice}
              className="btn btn-primary"
            >
              <RotateCcw className="w-4 h-4" />
              Practice Again
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Practice Exercises</h1>
        <p className="text-xl text-gray-600">
          Test your grammar and punctuation skills with court reporting scenarios
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Question {currentExercise + 1} of {exercises.length}
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {exercises[currentExercise].type.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              {exercises[currentExercise].question}
            </h3>

            <div className="space-y-3 mb-8">
              {exercises[currentExercise].options.map((option, index) => (
                <label
                  key={index}
                  className={`quiz-option block cursor-pointer ${
                    userAnswers[exercises[currentExercise].id] === index ? 'selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${exercises[currentExercise].id}`}
                    value={index}
                    checked={userAnswers[exercises[currentExercise].id] === index}
                    onChange={() => handleAnswer(exercises[currentExercise].id, index)}
                    className="sr-only"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
                disabled={currentExercise === 0}
                className="btn btn-secondary"
              >
                Previous
              </button>

              {currentExercise === exercises.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(userAnswers).length !== exercises.length}
                  className="btn btn-success"
                >
                  Submit Practice
                </button>
              ) : (
                <button
                  onClick={() => setCurrentExercise(Math.min(exercises.length - 1, currentExercise + 1))}
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

export default Practice
