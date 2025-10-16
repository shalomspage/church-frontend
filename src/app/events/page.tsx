'use client'

import { Calendar } from 'lucide-react'
import EventCard from '@/components/events/EventCard'
import { upcomingEvents } from '@/data/events'
import { useAppDispatch } from '@/redux/hooks'
import { initializeEventCounts } from '@/redux/slices/rsvpSlice'
import { useEffect } from 'react'

export default function EventsPage() {
  const dispatch = useAppDispatch()

  // Initialize event counts when component mounts
  useEffect(() => {
    const eventData = upcomingEvents.map(event => ({
      id: event.id,
      rsvpCount: event.rsvpCount
    }))
    dispatch(initializeEventCounts(eventData))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Church Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover all upcoming services, meetings, and special events in our church community.
          </p>
          <div className="mt-4 text-md text-blue-600 font-semibold">
            {upcomingEvents.length} Upcoming Events
          </div>
        </div>

        {/* All Upcoming Events Grid */}
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcomingEvents.map((event) => (
              <EventCard 
                key={event.id}
                event={event}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Upcoming Events</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We're currently planning our next events. Please check back soon or contact the church office for information about upcoming activities.
            </p>
          </div>
        )}

        {/* Events System Info */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
          <Calendar size={48} className="text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-purple-900 mb-2">
            Stay Connected
          </h3>
          <p className="text-purple-700 mb-4">
            Never miss an event! Subscribe to our newsletter or download the church app for updates and reminders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Subscribe to Newsletter
            </button>
            <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors">
              Download Church App
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}