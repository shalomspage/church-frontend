'use client'

import { useState, useEffect } from 'react'
import { prayerAgent, PrayerSuggestion, PrayerRequest } from '@/lib/agents/prayerAgent' // ADDED prayerAgent import
import { bibleEventAgent, EventBiblePassage } from '@/lib/agents/bibleEventAgent'
import { contentModerator } from '@/lib/agents/contentModerator'
import { Heart, Lightbulb, BookOpen } from 'lucide-react'

// Mock prayer history for development
const mockPrayerHistory: PrayerRequest[] = [
  {
    id: '1',
    title: 'Family healing',
    content: 'Praying for my family health',
    category: 'healing',
    isPublic: true,
    userId: 'user1',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2', 
    title: 'Guidance at work',
    content: 'Need wisdom for work decisions',
    category: 'guidance',
    isPublic: false,
    userId: 'user1',
    createdAt: new Date('2024-01-10')
  }
];

export default function PrayerPage() {
  const [suggestions, setSuggestions] = useState<PrayerSuggestion[]>([])
  const [biblePassages, setBiblePassages] = useState<EventBiblePassage[]>([])
  const [selectedSuggestion, setSelectedSuggestion] = useState<PrayerSuggestion | null>(null)
  const [prayerContent, setPrayerContent] = useState('')
  const [isModerating, setIsModerating] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPrayerSuggestions()
  }, [])

  const loadPrayerSuggestions = async () => {
    try {
      setLoading(true)
      const prayerSuggestions = await prayerAgent.suggestPrayerTopics(mockPrayerHistory)
      setSuggestions(prayerSuggestions)

      // Load Bible passages for current events
      try {
        const passages = await bibleEventAgent.getBiblePassagesForEvents('world')
        setBiblePassages(passages)
      } catch (err) {
        console.warn('Failed to load Bible passages:', err)
        // Don't set biblePassages, so the section won't show
      }
    } catch (error) {
      console.error('Failed to load prayer suggestions:', error)
      // Fallback suggestions
      setSuggestions([
        {
          topic: "Gratitude and Thanksgiving",
          bibleVerse: "Philippians 4:6",
          prompt: "Reflect on recent blessings and express gratitude",
          category: 'thanksgiving'
        },
        {
          topic: "Divine Guidance", 
          bibleVerse: "Proverbs 3:5-6",
          prompt: "Seek wisdom for decisions and direction",
          category: 'guidance'
        },
        {
          topic: "Healing and Restoration",
          bibleVerse: "James 5:16",
          prompt: "Pray for physical and emotional healing",
          category: 'healing'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionSelect = async (suggestion: PrayerSuggestion) => {
    setSelectedSuggestion(suggestion)
    try {
      const prompt = await prayerAgent.generatePrayerPrompt(suggestion.category)
      setPrayerContent(prompt)
    } catch (error) {
      console.error('Failed to generate prayer prompt:', error)
      setPrayerContent(`Heavenly Father, I come to you with ${suggestion.topic.toLowerCase()}. Please guide me and bless this situation according to your will. Amen.`)
    }
  }

  const handleSubmitPrayer = async () => {
    if (!prayerContent.trim()) return;

    setIsModerating(true)
    
    try {
      // Moderate content before submission
      const moderationResult = await contentModerator.moderateContent(prayerContent, 'prayer')
      
      if (!moderationResult.isApproved) {
        alert(`Please review your prayer: ${moderationResult.suggestedChanges?.join(', ')}`)
        setIsModerating(false)
        return
      }

      // Submit prayer to your API
      const response = await fetch('/api/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: selectedSuggestion?.topic || 'Personal Prayer',
          content: prayerContent,
          category: selectedSuggestion?.category || 'general'
        })
      })

      if (response.ok) {
        // Reset form
        setPrayerContent('')
        setSelectedSuggestion(null)
        alert('Prayer submitted successfully!')
      } else {
        throw new Error('Failed to submit prayer')
      }
      
    } catch (error) {
      console.error('Failed to submit prayer:', error)
      alert('Failed to submit prayer. Please try again.')
    } finally {
      setIsModerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <div>Loading prayer suggestions...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Prayer Companion</h1>
            </div>
            <p className="text-sm text-gray-600 hidden sm:block">Let AI help guide your prayer time</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* AI Prayer Suggestions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Prayer Topics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`bg-white border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedSuggestion === suggestion 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200'
                }`}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">{suggestion.topic}</h3>
                </div>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">{suggestion.prompt}</p>
                <div className="flex items-center text-xs text-blue-600 font-medium">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {suggestion.bibleVerse}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bible Passages for Current Events */}
        {biblePassages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">📖 Bible Passages for Current Events</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {biblePassages.map((passage, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{passage.title}</h3>
                  <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-800 text-sm">{passage.biblePassage}</div>
                    <div className="text-blue-700 text-xs mt-1 italic">&quot;{passage.bibleVerse}&quot;</div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{passage.explanation}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="capitalize bg-gray-100 px-2 py-1 rounded">{passage.category}</span>
                    {passage.source && (
                      <span>Source: {passage.source}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prayer Input */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Prayer</h2>
          <textarea
            value={prayerContent}
            onChange={(e) => setPrayerContent(e.target.value)}
            placeholder="Write your prayer here, or select a suggestion above..."
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              {selectedSuggestion && (
                <span>Praying for: <strong>{selectedSuggestion.topic}</strong></span>
              )}
            </div>
            <button
              onClick={handleSubmitPrayer}
              disabled={isModerating || !prayerContent.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isModerating ? 'Checking...' : 'Share Prayer'}
            </button>
          </div>
        </div>

        {/* Prayer Insights */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Prayer Insights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600 mt-1">Prayers Today</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600 mt-1">Answered</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600 mt-1">Trending Needs</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">47</div>
              <div className="text-sm text-gray-600 mt-1">People Praying</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}