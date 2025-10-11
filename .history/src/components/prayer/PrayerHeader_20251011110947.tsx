import { Heart } from 'lucide-react'

export default function PrayerHeader() {
  return (
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
  )
}