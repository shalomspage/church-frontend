import { EventBiblePassage } from '@/lib/agents/bibleEventAgent'

interface BiblePassagesProps {
  passages: EventBiblePassage[]
}

export default function BiblePassages({ passages }: BiblePassagesProps) {
  if (passages.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">📖 Bible Passages for Current Events</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {passages.map((passage, index) => (
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
  )
}