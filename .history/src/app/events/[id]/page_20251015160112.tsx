import { notFound } from 'next/navigation'
import { events } from '@/data/events'
import { Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: {
    id: string
  }
}

export default function EventDetailPage({ params }: PageProps) {
  const event = events.find(e => e.id === params.id)

  if (!event) {
    notFound()
  }

  const typeStyles = {
    Service: 'bg-blue-100 text-blue-800',
    Study: 'bg-green-100 text-green-800',
    Social: 'bg-purple-100 text-purple-800',
    Outreach: 'bg-orange-100 text-orange-800',
    Prayer: 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/events"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to All Events
        </Link>

        {/* Event Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${typeStyles[event.type]}`}>
              {event.type} Event
            </span>
            <div className="flex items-center text-lg text-gray-600 font-semibold">
              <Calendar size={20} className="mr-2" />
              {new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {event.title}
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {event.description}
          </p>
          
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-lg text-gray-700">
                <Clock size={24} className="mr-4 text-blue-500" />
                <div>
                  <div className="font-semibold">{event.time}</div>
                  {event.duration && (
                    <div className="text-sm text-gray-500">Duration: {event.duration}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center text-lg text-gray-700">
                <MapPin size={24} className="mr-4 text-green-500" />
                <div>
                  <div className="font-semibold">{event.location}</div>
                  <div className="text-sm text-gray-500">Location</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-lg text-gray-700">
                <Users size={24} className="mr-4 text-purple-500" />
                <div>
                  <div className="font-semibold">{event.attendees} people attending</div>
                  <div className="text-sm text-gray-500">Expected attendance</div>
                </div>
              </div>
              
              {event.contactPerson && (
                <div className="text-lg text-gray-700">
                  <div className="font-semibold">Contact Person</div>
                  <div className="text-gray-600">{event.contactPerson}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h3>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Join us for this special event where we'll come together as a church family 
                to worship, learn, and grow in our faith. This is a great opportunity to 
                connect with other members of our community and deepen your relationship with God.
              </p>
              
              <h4>What to Expect</h4>
              <ul>
                <li>Inspiring worship and teaching</li>
                <li>Fellowship with other believers</li>
                <li>Opportunities for prayer and reflection</li>
                <li>Refreshments and community time</li>
              </ul>
              
              <h4>Who Should Attend</h4>
              <p>
                This event is open to everyone - members, regular attendees, and first-time visitors. 
                Whether you're new to faith or have been walking with God for years, you'll find 
                a welcoming community and meaningful content.
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
              RSVP for This Event
            </button>
            <button className="flex-1 border border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Add to Calendar
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors">
              Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static paths for all events
export async function generateStaticParams() {
  return events.map((event) => ({
    id: event.id,
  }))
}