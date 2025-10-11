'use client'

import { useState, useEffect } from 'react'
import { prayerAgent, PrayerSuggestion, PrayerRequest } from '@/lib/agents/prayerAgent'
import { bibleEventAgent, EventBiblePassage } from '@/lib/agents/bibleEventAgent'
import { contentModerator } from '@/lib/agents/contentModerator'
import LoadingState from '@/components/prayer/LoadingState'
import PrayerHeader from '@/components/prayer/PrayerHeader'
import PrayerSuggestions from '@/components/prayer/PrayerSuggestions'
import BiblePassages from '@/components/prayer/BiblePassages'
import PrayerInput from '@/components/prayer/PrayerInput'
import PrayerInsights from '@/components/prayer/PrayerInsight'


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
    return <LoadingState />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PrayerHeader />
      
      <div className="max-w-4xl mx-auto p-6">
        <PrayerSuggestions 
          suggestions={suggestions}
          selectedSuggestion={selectedSuggestion}
          onSuggestionSelect={handleSuggestionSelect}
        />

        <BiblePassages passages={biblePassages} />

        <PrayerInput
          prayerContent={prayerContent}
          selectedSuggestion={selectedSuggestion}
          isModerating={isModerating}
          onPrayerContentChange={setPrayerContent}
          onSubmitPrayer={handleSubmitPrayer}
        />

        <PrayerInsights />
      </div>
    </div>
  )
}