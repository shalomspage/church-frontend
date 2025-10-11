export default function PrayerInsights() {
  return (
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
  )
}