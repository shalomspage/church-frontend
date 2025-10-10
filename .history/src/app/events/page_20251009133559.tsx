import UpcomingEvents from '@/components/upcoming-events/UpcomingEvents'
import { Calendar } from 'lucide-react'

export default function EventsPage() {
  
  return (
    <div className="min-h-screen bg-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Church Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover upcoming services, meetings, and special events in our church community.
          </p>
        </div>

      <UpcomingEvents />

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
          <Calendar size={48} className="text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-purple-900 mb-2">
            Events System Coming Soon
          </h3>
          <p className="text-purple-700 mb-4">
            We&apos;re developing a complete events management system where you can RSVP, 
            get reminders, and see all church activities in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              View Calendar
            </button>
            <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors">
              Suggest Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
