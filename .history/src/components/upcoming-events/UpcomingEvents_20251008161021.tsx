import React from 'react'
import { Calendar, MapPin, Clock, Users } from 'lucide-react'

const UpcomingEvents = () => {
    const upcomingEvents = [
        {
          id: 1,
          title: 'Sunday Worship Service',
          date: '2024-01-21',
          time: '10:00 AM',
          location: 'Main Sanctuary',
          description: 'Join us for our weekly worship service with communion.',
          attendees: 120,
          type: 'Service'
        },
        {
          id: 2,
          title: 'Bible Study - Book of Romans',
          date: '2024-01-24',
          time: '7:00 PM',
          location: 'Fellowship Hall',
          description: 'Weekly Bible study focusing on the Book of Romans.',
          attendees: 35,
          type: 'Study'
        },
        {
          id: 3,
          title: 'Youth Group Game Night',
          date: '2024-01-26',
          time: '6:30 PM',
          location: 'Youth Center',
          description: 'Fun games, food, and fellowship for our youth.',
          attendees: 45,
          type: 'Social'
        },
        {
          id: 4,
          title: 'Youth Group Game Night',
          date: '2024-01-26',
          time: '6:30 PM',
          location: 'Youth Center',
          description: 'Fun games, food, and fellowship for our youth.',
          attendees: 45,
          type: 'Social'
        }
      ]
    
  return (
    <div className="mb-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {upcomingEvents.map((event) => (
        <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                event.type === 'Service' ? 'bg-blue-100 text-blue-800' :
                event.type === 'Study' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {event.type}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                {event.date}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {event.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-2" />
                {event.time}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={14} className="mr-2" />
                {event.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users size={14} className="mr-2" />
                {event.attendees} attending
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                RSVP
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default UpcomingEvents