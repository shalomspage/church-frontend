import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import Image from 'next/image'
import { Event } from '@/data/events'

interface EventCardProps {
  event: Event
  showImage?: boolean
}

const typeStyles = {
  Service: 'bg-blue-100 text-blue-800',
  Study: 'bg-green-100 text-green-800',
  Social: 'bg-purple-100 text-purple-800',
  Outreach: 'bg-orange-100 text-orange-800',
  Prayer: 'bg-red-100 text-red-800'
}

export default function EventCard({ event, showImage = true }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
      {showImage && event.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typeStyles[event.type]}`}>
            {event.type}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            {new Date(event.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={14} className="mr-2" />
            {event.time} {event.duration && `• ${event.duration}`}
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
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            RSVP
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  )
}