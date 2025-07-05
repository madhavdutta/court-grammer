import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'
import { Play, CheckCircle, Users, Clock, Award, FileText } from 'lucide-react'

const Scenarios = () => {
  const { user } = useUser()
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)

  const scenarios = [
    {
      id: 'civil-trial',
      title: 'Civil Trial Proceedings',
      description: 'Practice transcribing a complex civil litigation case with multiple objections and technical testimony.',
      difficulty: 'Intermediate',
      duration: '25 min',
      participants: ['Judge', 'Plaintiff Attorney', 'Defense Attorney', 'Expert Witness'],
      steps: [
        {
          speaker: 'THE COURT',
          text: 'Good morning. We are here in the matter of Johnson versus Metropolitan Insurance Company, case number CV-2023-1847. Counsel, please state your appearances for the record.',
          challenges: ['Proper case citation format', 'Speaker identification']
        },
        {
          speaker: 'MR. DAVIDSON',
          text: 'Good morning, Your Honor. James Davidson appearing on behalf of the plaintiff, Sarah Johnson.',
          challenges: ['Attorney identification format']
        },
        {
          speaker: 'MS. RODRIGUEZ',
          text: 'Maria Rodriguez for the defendant, Metropolitan Insurance Company.',
          challenges: ['Consistent speaker format']
        },
        {
          speaker: 'THE COURT',
          text: 'Thank you. Mr. Davidson, you may call your first witness.',
          challenges: ['Court direction formatting']
        },
        {
          speaker: 'MR. DAVIDSON',
          text: 'Thank you, Your Honor. The plaintiff calls Dr. Michael Chen to the stand.',
          challenges: ['Witness calling procedure']
        }
      ]
    },
    {
      id: 'criminal-arraignment',
      title: 'Criminal Arraignment',
      description: 'Transcribe a criminal arraignment with plea entry and bail discussion.',
      difficulty: 'Beginner',
      duration: '15 min',
      participants: ['Judge', 'Prosecutor', 'Defense Attorney', 'Defendant'],
      steps: [
        {
          speaker: 'THE COURT',
          text: 'The matter before the court is People versus Robert Smith, case number CR-2023-0892. Mr. Smith, you are charged with burglary in the second degree. How do you plead?',
          challenges: ['Criminal case format', 'Charge specification']
        },
        {
          speaker: 'THE DEFENDANT',
          text: 'Not guilty, Your Honor.',
          challenges: ['Defendant response format']
        },
        {
          speaker: 'THE COURT',
          text: 'The court accepts the defendant\'s plea of not guilty. Ms. Patterson, what is the People\'s position on bail?',
          challenges: ['Plea acceptance notation', 'Bail discussion format']
        }
      ]
    },
    {
      id: 'deposition',
      title: 'Expert Witness Deposition',
      description: 'Handle a technical deposition with medical terminology and complex questioning.',
      difficulty: 'Advanced',
      duration: '30 min',
      participants: ['Attorney', 'Expert Witness', 'Opposing Counsel'],
      steps: [
        {
          speaker: 'MR. THOMPSON',
          text: 'Doctor, can you please state your full name and spell your last name for the record?',
          challenges: ['Deposition opening format', 'Name spelling protocol']
        },
        {
          speaker: 'THE WITNESS',
          text: 'My name is Dr. Elizabeth Hartwell, H-A-R-T-W-E-L-L.',
          challenges: ['Spelling notation', 'Professional title usage']
        },
        {
          speaker: 'MR. THOMPSON',
          text: 'Dr. Hartwell, what is your area of medical specialization?',
          challenges: ['Professional questioning format']
        },
        {
          speaker: 'THE WITNESS',
          text: 'I am a board-certified orthopedic surgeon with a subspecialty in spinal reconstruction.',
          challenges: ['Medical terminology accuracy']
        }
      ]
    }
  ]

  const handleCompleteScenario = (scenarioId) => {
    // Add scenario completion logic
    setSelectedScenario(null)
    setCurrentStep(0)
  }

  if (selectedScenario) {
    const scenario = scenarios.find(s => s.id === selectedScenario)
    const currentStepData = scenario.steps[currentStep]

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <button
                onClick={() => setSelectedScenario(null)}
                className="mb-4 text-purple-100 hover:text-white"
              >
                ← Back to Scenarios
              </button>
              <h1 className="text-2xl font-bold mb-2">{scenario.title}</h1>
              <div className="flex items-center gap-4 text-purple-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {scenario.duration}
                </span>
                <span className="px-2 py-1 bg-purple-500 rounded text-xs">
                  {scenario.difficulty}
                </span>
                <span>Step {currentStep + 1} of {scenario.steps.length}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Transcript Area */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Transcript</h3>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    {scenario.steps.slice(0, currentStep + 1).map((step, index) => (
                      <div key={index} className="mb-2">
                        <span className="font-bold">{step.speaker}:</span> {step.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practice Area */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Transcription</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Speaker Identification:
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., THE COURT:"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transcribe the statement:
                      </label>
                      <textarea
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Type what you hear..."
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Key Challenges:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        {currentStepData.challenges.map((challenge, index) => (
                          <li key={index}>• {challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="btn btn-secondary"
                >
                  Previous Step
                </button>

                {currentStep === scenario.steps.length - 1 ? (
                  <button
                    onClick={() => handleCompleteScenario(scenario.id)}
                    className="btn btn-success"
                  >
                    <Award className="w-4 h-4" />
                    Complete Scenario
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep(Math.min(scenario.steps.length - 1, currentStep + 1))}
                    className="btn btn-primary"
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>
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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Real-World Scenarios</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Practice with authentic court proceedings and legal scenarios to master professional transcription skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scenario.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  scenario.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {scenario.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{scenario.title}</h3>
              <p className="text-gray-600 mb-4">{scenario.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{scenario.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FileText className="w-4 h-4" />
                  <span>{scenario.steps.length} steps</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Participants:</h4>
                <div className="flex flex-wrap gap-2">
                  {scenario.participants.map((participant, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedScenario(scenario.id)}
                className="w-full btn btn-primary"
              >
                <Play className="w-4 h-4" />
                Start Scenario
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Scenarios
