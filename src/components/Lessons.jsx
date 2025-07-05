import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'
import { CheckCircle, Lock, Play, BookOpen, Clock, Award } from 'lucide-react'

const Lessons = () => {
  const { user, addCompletedLesson } = useUser()
  const [selectedLesson, setSelectedLesson] = useState(null)

  const lessonCategories = [
    {
      title: 'Punctuation Mastery',
      description: 'Essential punctuation rules for legal transcription',
      lessons: [
        {
          id: 'punct-1',
          title: 'Comma Usage in Legal Context',
          duration: '15 min',
          difficulty: 'Beginner',
          content: `
            <h3>Comma Usage in Legal Transcription</h3>
            <p>Proper comma usage is crucial in legal documents where precision affects meaning.</p>
            
            <h4>Key Rules:</h4>
            <ul>
              <li><strong>Series Comma:</strong> Use commas to separate items in a series
                <br><em>Example: "The defendant, plaintiff, and witness were present."</em></li>
              <li><strong>Introductory Elements:</strong> Use comma after introductory phrases
                <br><em>Example: "Your Honor, I object to this line of questioning."</em></li>
              <li><strong>Parenthetical Expressions:</strong> Set off non-essential information
                <br><em>Example: "The contract, which was signed yesterday, is binding."</em></li>
            </ul>
            
            <h4>Legal-Specific Applications:</h4>
            <p>In court reporting, comma placement can change legal meaning:</p>
            <ul>
              <li>"The defendant who was present" (restrictive - specific defendant)</li>
              <li>"The defendant, who was present," (non-restrictive - additional info)</li>
            </ul>
          `
        },
        {
          id: 'punct-2',
          title: 'Semicolons and Colons in Legal Writing',
          duration: '12 min',
          difficulty: 'Intermediate',
          content: `
            <h3>Semicolons and Colons in Legal Documents</h3>
            
            <h4>Semicolon Usage:</h4>
            <ul>
              <li><strong>Independent Clauses:</strong> Connect related independent clauses
                <br><em>Example: "The motion was filed; the hearing is scheduled for Monday."</em></li>
              <li><strong>Complex Lists:</strong> Separate items containing internal commas
                <br><em>Example: "Present were: John Smith, attorney; Mary Jones, plaintiff; Robert Brown, defendant."</em></li>
            </ul>
            
            <h4>Colon Usage:</h4>
            <ul>
              <li><strong>Introducing Lists:</strong> "The following documents were submitted:"</li>
              <li><strong>Explanations:</strong> "The verdict was clear: guilty on all counts."</li>
              <li><strong>Time Notation:</strong> "The hearing began at 9:30 a.m."</li>
            </ul>
          `
        }
      ]
    },
    {
      title: 'Grammar Fundamentals',
      description: 'Core grammar concepts for accurate transcription',
      lessons: [
        {
          id: 'gram-1',
          title: 'Subject-Verb Agreement in Complex Sentences',
          duration: '18 min',
          difficulty: 'Intermediate',
          content: `
            <h3>Subject-Verb Agreement in Legal Context</h3>
            
            <h4>Basic Rules:</h4>
            <ul>
              <li><strong>Singular subjects</strong> take singular verbs</li>
              <li><strong>Plural subjects</strong> take plural verbs</li>
              <li><strong>Compound subjects</strong> joined by "and" are usually plural</li>
            </ul>
            
            <h4>Challenging Cases in Legal Writing:</h4>
            <ul>
              <li><strong>Collective Nouns:</strong> "The jury has reached its verdict" vs "The jury have different opinions"</li>
              <li><strong>Legal Entities:</strong> "The corporation is" (singular entity)</li>
              <li><strong>Amounts:</strong> "Five years is the sentence" (time as unit)</li>
            </ul>
            
            <h4>Common Legal Phrases:</h4>
            <ul>
              <li>"Each of the defendants <em>is</em> responsible"</li>
              <li>"Neither the plaintiff nor the defendants <em>were</em> present"</li>
              <li>"The number of cases <em>is</em> increasing"</li>
            </ul>
          `
        }
      ]
    },
    {
      title: 'Legal Terminology & Style',
      description: 'Specialized language and formatting for court reporting',
      lessons: [
        {
          id: 'legal-1',
          title: 'Court Proceeding Terminology',
          duration: '20 min',
          difficulty: 'Advanced',
          content: `
            <h3>Essential Court Proceeding Terms</h3>
            
            <h4>Key Personnel:</h4>
            <ul>
              <li><strong>Bailiff:</strong> Court officer who maintains order</li>
              <li><strong>Court Reporter:</strong> Official recorder of proceedings</li>
              <li><strong>Clerk:</strong> Administrative officer of the court</li>
            </ul>
            
            <h4>Common Objections:</h4>
            <ul>
              <li><strong>Hearsay:</strong> Second-hand information</li>
              <li><strong>Leading:</strong> Question that suggests the answer</li>
              <li><strong>Relevance:</strong> Not pertinent to the case</li>
              <li><strong>Foundation:</strong> Insufficient basis established</li>
            </ul>
            
            <h4>Proper Formatting:</h4>
            <ul>
              <li>Speaker identification: "THE COURT:", "MR. SMITH:", "THE WITNESS:"</li>
              <li>Parenthetical actions: "(Witness sworn.)"</li>
              <li>Inaudible speech: "(Inaudible.)" or "(Indiscernible.)"</li>
            </ul>
          `
        }
      ]
    }
  ]

  const handleCompleteLesson = (lessonId) => {
    addCompletedLesson(lessonId)
    setSelectedLesson(null)
  }

  const isLessonCompleted = (lessonId) => user.completedLessons.includes(lessonId)

  if (selectedLesson) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <button
                onClick={() => setSelectedLesson(null)}
                className="mb-4 text-blue-100 hover:text-white"
              >
                ← Back to Lessons
              </button>
              <h1 className="text-2xl font-bold">{selectedLesson.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-blue-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedLesson.duration}
                </span>
                <span className="px-2 py-1 bg-blue-500 rounded text-xs">
                  {selectedLesson.difficulty}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
              />
              
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={() => handleCompleteLesson(selectedLesson.id)}
                  className="btn btn-primary"
                  disabled={isLessonCompleted(selectedLesson.id)}
                >
                  {isLessonCompleted(selectedLesson.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      Mark as Complete
                    </>
                  )}
                </button>
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Grammar Lessons</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master grammar and punctuation with lessons specifically designed for court reporting professionals.
        </p>
      </div>

      <div className="space-y-12">
        {lessonCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
            
            <div className="p-6">
              <div className="grid gap-4">
                {category.lessons.map((lesson, lessonIndex) => {
                  const completed = isLessonCompleted(lesson.id)
                  
                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (lessonIndex * 0.05) }}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        completed
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            completed
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Play className="w-5 h-5" />
                            )}
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {lesson.duration}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {lesson.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-blue-600">
                          {completed ? 'Review' : 'Start'} →
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Lessons
