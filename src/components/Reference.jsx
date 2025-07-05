import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Book, FileText, Scale, Users, AlertCircle, CheckCircle } from 'lucide-react'

const Reference = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const referenceCategories = [
    {
      id: 'punctuation',
      title: 'Punctuation Rules',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      items: [
        {
          title: 'Comma Usage',
          content: `
            <h4>Essential Comma Rules for Court Reporting:</h4>
            <ul>
              <li><strong>Series Comma:</strong> Use commas to separate three or more items
                <br><em>Example: "The plaintiff, defendant, and witness were sworn in."</em></li>
              <li><strong>Introductory Elements:</strong> Use comma after introductory words/phrases
                <br><em>Example: "Your Honor, I object to this question."</em></li>
              <li><strong>Direct Address:</strong> Set off names when directly addressing someone
                <br><em>Example: "Mr. Smith, please state your name for the record."</em></li>
              <li><strong>Quotations:</strong> Use comma before direct quotes
                <br><em>Example: 'The witness stated, "I saw the accident occur."'</em></li>
            </ul>
          `
        },
        {
          title: 'Semicolon and Colon Usage',
          content: `
            <h4>Semicolons in Legal Writing:</h4>
            <ul>
              <li><strong>Independent Clauses:</strong> Connect closely related complete thoughts
                <br><em>Example: "The motion was filed; the hearing is scheduled for Monday."</em></li>
              <li><strong>Complex Series:</strong> Separate items that contain internal commas
                <br><em>Example: "Present: John Smith, plaintiff; Mary Jones, attorney; Robert Brown, witness."</em></li>
            </ul>
            
            <h4>Colons in Legal Context:</h4>
            <ul>
              <li><strong>Introducing Lists:</strong> "The following exhibits were marked:"</li>
              <li><strong>Time Notation:</strong> "The hearing began at 9:30 a.m."</li>
              <li><strong>Explanations:</strong> "The verdict was unanimous: guilty on all counts."</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'grammar',
      title: 'Grammar Essentials',
      icon: Book,
      color: 'from-green-500 to-green-600',
      items: [
        {
          title: 'Subject-Verb Agreement',
          content: `
            <h4>Key Rules for Legal Writing:</h4>
            <ul>
              <li><strong>Singular Subjects:</strong> Take singular verbs
                <br><em>Example: "The defendant is present."</em></li>
              <li><strong>Compound Subjects:</strong> Usually take plural verbs
                <br><em>Example: "The plaintiff and defendant are both present."</em></li>
              <li><strong>Collective Nouns:</strong> Usually singular in legal context
                <br><em>Example: "The jury has reached its verdict."</em></li>
              <li><strong>Legal Entities:</strong> Treated as singular
                <br><em>Example: "The corporation is liable for damages."</em></li>
            </ul>
            
            <h4>Tricky Cases:</h4>
            <ul>
              <li>"Each of the defendants <em>is</em> responsible" (not "are")</li>
              <li>"Neither the plaintiff nor the defendants <em>were</em> present"</li>
              <li>"The number of cases <em>is</em> increasing" (not "are")</li>
            </ul>
          `
        },
        {
          title: 'Pronoun Usage',
          content: `
            <h4>Pronoun Rules in Legal Context:</h4>
            <ul>
              <li><strong>Corporate Pronouns:</strong> Use "it/its" for companies
                <br><em>Example: "The corporation filed its motion."</em></li>
              <li><strong>Court References:</strong> "The court" (not "it") in formal writing
                <br><em>Example: "The court ruled in favor of the plaintiff."</em></li>
              <li><strong>Possessive Pronouns:</strong> No apostrophes (its, theirs, yours)
                <br><em>Example: "The decision is theirs to make."</em></li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'legal-style',
      title: 'Legal Style Guide',
      icon: Scale,
      color: 'from-purple-500 to-purple-600',
      items: [
        {
          title: 'Speaker Identification',
          content: `
            <h4>Proper Format for Court Transcripts:</h4>
            <ul>
              <li><strong>The Court:</strong> "THE COURT:" (all caps)</li>
              <li><strong>Attorneys:</strong> "MR. SMITH:" or "MS. JONES:" (all caps with periods)</li>
              <li><strong>Witnesses:</strong> "THE WITNESS:" (all caps)</li>
              <li><strong>Multiple Witnesses:</strong> "WITNESS SMITH:" when multiple witnesses</li>
            </ul>
            
            <h4>Special Situations:</h4>
            <ul>
              <li><strong>Unidentified Speaker:</strong> "UNIDENTIFIED SPEAKER:"</li>
              <li><strong>Multiple Speakers:</strong> "MULTIPLE SPEAKERS:" or "(Simultaneous speakers.)"</li>
              <li><strong>Off-the-Record:</strong> "(Off-the-record discussion.)"</li>
            </ul>
          `
        },
        {
          title: 'Parenthetical Notations',
          content: `
            <h4>Standard Parenthetical Expressions:</h4>
            <ul>
              <li><strong>Actions:</strong> "(Witness sworn.)" "(Document marked.)"</li>
              <li><strong>Audio Issues:</strong> "(Inaudible.)" "(Indiscernible.)"</li>
              <li><strong>Interruptions:</strong> "(Interrupted.)" "(Simultaneous speakers.)"</li>
              <li><strong>Breaks:</strong> "(Recess taken.)" "(Proceedings resumed.)"</li>
            </ul>
            
            <h4>Timing Notations:</h4>
            <ul>
              <li>"(Whereupon, a recess was taken at 10:30 a.m.)"</li>
              <li>"(Whereupon, the proceedings were resumed at 10:45 a.m.)"</li>
            </ul>
          `
        }
      ]
    },
    {
      id: 'procedures',
      title: 'Court Procedures',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      items: [
        {
          title: 'Opening Procedures',
          content: `
            <h4>Standard Court Opening:</h4>
            <ul>
              <li><strong>Case Calling:</strong> "The matter before the court is [Case Name], case number [Number]."</li>
              <li><strong>Appearances:</strong> "Counsel, please state your appearances for the record."</li>
              <li><strong>Witness Swearing:</strong> "Do you solemnly swear or affirm..."</li>
            </ul>
            
            <h4>Common Phrases:</h4>
            <ul>
              <li>"All rise. The Honorable [Judge Name] presiding."</li>
              <li>"You may be seated."</li>
              <li>"The court is now in session."</li>
            </ul>
          `
        },
        {
          title: 'Objections and Rulings',
          content: `
            <h4>Common Objections:</h4>
            <ul>
              <li><strong>Hearsay:</strong> "Objection, hearsay."</li>
              <li><strong>Leading:</strong> "Objection, leading the witness."</li>
              <li><strong>Relevance:</strong> "Objection, relevance."</li>
              <li><strong>Foundation:</strong> "Objection, lack of foundation."</li>
            </ul>
            
            <h4>Court Rulings:</h4>
            <ul>
              <li>"Objection sustained."</li>
              <li>"Objection overruled."</li>
              <li>"The witness may answer."</li>
              <li>"Strike that from the record."</li>
            </ul>
          `
        }
      ]
    }
  ]

  const filteredItems = referenceCategories.flatMap(category => 
    category.items.map(item => ({ ...item, category: category.title, categoryId: category.id }))
  ).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Reference Guide</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Quick access to grammar rules, punctuation guidelines, and legal style standards for court reporting.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rules, examples, or terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {referenceCategories.map(category => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      {selectedCategory === 'all' && !searchTerm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {referenceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600">{category.items.length} reference items</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reference Items */}
      <div className="space-y-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <motion.div
              key={`${item.categoryId}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Tips for Court Reporters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Consistency is Key</h4>
              <p className="text-gray-600">Maintain consistent formatting throughout your transcript for professional appearance.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">When in Doubt, Ask</h4>
              <p className="text-gray-600">Don't hesitate to ask for clarification or spelling of names and technical terms.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Proofread Carefully</h4>
              <p className="text-gray-600">Always review your transcript for accuracy, especially legal terminology and proper names.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Stay Updated</h4>
              <p className="text-gray-600">Keep current with style guide changes and legal terminology updates.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Reference
