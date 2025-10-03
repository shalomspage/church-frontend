import Link from 'next/link'
import { Calendar, MapPin, Clock } from 'lucide-react'

export default function Events() {
  const events = [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: '2024-01-21',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      description: 'Join us for our weekly worship service with communion and fellowship.',
      type: 'service'
    },
    {
      id: 2,
      title: 'Youth Group Meeting',
      date: '2024-01-24',
      time: '7:00 PM',
      location: 'Youth Center',
      description: 'Weekly youth gathering for games, worship, and Bible study.',
      type: 'youth'
    },
    {
      id: 3,
      title: 'Bible Study - Book of Romans',
      date: '2024-01-25',
      time: '6:30 PM',
      location: 'Fellowship Hall',
      description: 'Deep dive into the Book of Romans with Pastor John.',
      type: 'study'
    },
    {
      id: 4,
      title: 'Community Outreach',
      date: '2024-01-27',
      time: '9:00 AM',
      location: 'City Park',
      description: 'Join us as we serve our local community with love and compassion.',
      type: 'outreach'
    }
  ]

  const getTypeColor = (type: string) => {
    const colors = {
      service: 'bg-blue-100 text-blue-800',
      youth: 'bg-green-100 text-green-800',
      study: 'bg-purple-100 text-purple-800',
      outreach: 'bg-orange-100 text-orange-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      service: 'Worship',
      youth: 'Youth',
      study: 'Study',
      outreach: 'Outreach'
    }
    return labels[type as keyof typeof labels] || 'Event'
  }

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for worship, fellowship, and service opportunities in our community.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex flex-col items-center justify-center mr-4">
                    <span className="text-sm font-bold">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                      {getTypeLabel(event.type)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={16} className="mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-2" />
                  {event.location}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                  Add to Calendar
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <Link 
                  href={`/events/${event.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/events"
            className="inline-flex items-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            <Calendar size={20} className="mr-2" />
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}