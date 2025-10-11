import { PrayerSuggestion } from '@/lib/agents/prayerAgent'

interface PrayerInputProps {
  prayerContent: string
  selectedSuggestion: PrayerSuggestion | null
  isModerating: boolean
  onPrayerContentChange: (content: string) => void
  onSubmitPrayer: () => void
}

export default function PrayerInput({
  prayerContent,
  selectedSuggestion,
  isModerating,
  onPrayerContentChange,
  onSubmitPrayer
}: PrayerInputProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mt-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Prayer</h2>
      <textarea
        value={prayerContent}
        onChange={(e) => onPrayerContentChange(e.target.value)}
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
          onClick={onSubmitPrayer}
          disabled={isModerating || !prayerContent.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isModerating ? 'Checking...' : 'Share Prayer'}
        </button>
      </div>
    </div>
  )
}