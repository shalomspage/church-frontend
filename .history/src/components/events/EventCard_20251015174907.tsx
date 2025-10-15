'use client'

import { Calendar, MapPin, Clock, Users, Check } from 'lucide-react'
import { Event } from '@/data/events'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { rsvpToEvent, cancelRsvp } from '@/redux/slices/rsvpSlice'
import { useState } from 'react'

interface EventCardProps {
  event: Event
}

const typeStyles = {
  Service: 'bg-blue-100 text-blue-800',
  Study: 'bg-green-100 text-green-800',
  Social: 'bg-purple-100 text-purple-800',
  Outreach: 'bg-orange-100 text-orange-800',
  Prayer: 'bg-red-100 text-red-800'
}

export default function EventCard({ event }: EventCardProps) {
  const dispatch = useAppDispatch()
  const rsvpEvents = useAppSelector((state) => state.rsvp.rsvpEvents)
  const eventCounts = useAppSelector((state) => state.rsvp.eventCounts)
  const [isRsvping, setIsRsvping] = useState(false)
  
  const hasUserRsvp = rsvpEvents.includes(event.id)
  
  // Use Redux counter if available, otherwise fall back to event's initial count
  const currentRsvpCount = eventCounts[event.id] !== undefined 
    ? eventCounts[event.id] 
    : event.rsvpCount

  const handleRsvp = async () => {
    // Prevent multiple clicks while processing
    if (isRsvping) return
    
    if (hasUserRsvp) {
      // Cancel RSVP
      setIsRsvping(true)
      dispatch(cancelRsvp(event.id))
      setIsRsvping(false)
    } else {
      // RSVP to event
      setIsRsvping(true)
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      dispatch(rsvpToEvent(event.id))
      setIsRsvping(false)
    }
  }

  const isFull = !!event.capacity && currentRsvpCount >= event.capacity
  const isDisabled = Boolean(isRsvping || (isFull && !hasUserRsvp))

  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group">
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
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
        {event.title}
      </h3>
      
      <p className="text-gray-600 mb-4 leading-relaxed">
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
          {currentRsvpCount} RSVPs {event.capacity && `• ${event.capacity} max`}
        </div>
        {isFull && (
          <div className="flex items-center text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
            <Users size={14} className="mr-2" />
            Event at capacity
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={handleRsvp}
          disabled={isDisabled}
          className={`flex-1 py-4 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center ${
            hasUserRsvp
              ? 'bg-green-600 text-white hover:bg-green-700'
              : isFull
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } ${isRsvping ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRsvping ? (
            'Processing...'
          ) : hasUserRsvp ? (
            <>
              <Check size={16} className="mr-1" />
              RSVP Confirmed
            </>
          ) : isFull ? (
            'Event Full'
          ) : (
            'RSVP Now'
          )}
        </button>
        <Link 
          href={`/events/${event.id}`}
          className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors text-center"
        >
          Details
        </Link>
      </div>
    </div>
  )
}