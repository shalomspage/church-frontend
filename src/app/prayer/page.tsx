import { Heart, Users, Clock, MessageCircle } from 'lucide-react'

export default function PrayerPage() {
  const prayerRequests = [
    {
      id: 1,
      title: 'Healing for Brother James',
      description: 'Pray for complete healing and recovery from surgery.',
      requestedBy: 'Sister Sarah',
      date: '2 hours ago',
      prayerCount: 24,
      isUrgent: true
    },
    {
      id: 2,
      title: 'Guidance for Youth Ministry',
      description: 'Pray for wisdom in planning upcoming youth events.',
      requestedBy: 'Brother Mike',
      date: '1 day ago',
      prayerCount: 15,
      isUrgent: false
    },
    {
      id: 3,
      title: 'Family Restoration',
      description: 'Pray for reconciliation and healing in the Johnson family.',
      requestedBy: 'Anonymous',
      date: '3 days ago',
      prayerCount: 42,
      isUrgent: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Prayer Wall
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community in prayer. Share your requests and pray for others.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Prayer Requests</h2>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center">
              <Heart size={20} className="mr-2" />
              Add Prayer Request
            </button>
          </div>

          <div className="space-y-6">
            {prayerRequests.map((request) => (
              <div key={request.id} className={`bg-white rounded-xl shadow-sm border p-6 ${request.isUrgent ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                {request.isUrgent && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 mb-3">
                    <Heart size={14} className="mr-1" />
                    Urgent
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {request.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {request.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {request.prayerCount} praying
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {request.date}
                    </div>
                    <div>
                      By {request.requestedBy}
                    </div>
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    <MessageCircle size={16} className="mr-1" />
                    I&apos;m Praying
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <Heart size={48} className="text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-900 mb-2">
            Enhanced Prayer System Coming Soon
          </h3>
          <p className="text-green-700 mb-4">
            We&apos;re building a comprehensive prayer system where you can share requests, 
            commit to pray for others, and share answered prayers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Share Testimony
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors">
              Prayer Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
