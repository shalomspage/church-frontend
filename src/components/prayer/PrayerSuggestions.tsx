import { PrayerSuggestion } from '@/lib/agents/prayerAgent'
import { Lightbulb, BookOpen } from 'lucide-react'

interface PrayerSuggestionsProps {
  suggestions: PrayerSuggestion[]
  selectedSuggestion: PrayerSuggestion | null
  onSuggestionSelect: (suggestion: PrayerSuggestion) => void
}

export default function PrayerSuggestions({ 
  suggestions, 
  selectedSuggestion, 
  onSuggestionSelect 
}: PrayerSuggestionsProps) {
  return (
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
            onClick={() => onSuggestionSelect(suggestion)}
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
  )
}