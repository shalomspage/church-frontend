'use client'

import { notFound } from 'next/navigation'
import { events } from '@/data/events'
import { Calendar, MapPin, Clock, Users, ArrowLeft, Check, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { rsvpToEvent, cancelRsvp } from '@/redux/slices/rsvpSlice'
import { useState, useEffect } from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EventDetailPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const dispatch = useAppDispatch()
  const rsvpEvents = useAppSelector((state) => state.rsvp.rsvpEvents)
  const eventCounts = useAppSelector((state) => state.rsvp.eventCounts)
  const [isRsvping, setIsRsvping] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  // Resolve the params promise
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  // Find the event only after params are resolved
  const event = resolvedParams ? events.find(e => e.id === resolvedParams.id) : null

  // Show loading state while params are being resolved
  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    notFound()
  }

  const hasUserRsvp = rsvpEvents.includes(event.id)
  
  // Use Redux counter if available, otherwise fall back to event's initial count
  const currentRsvpCount = eventCounts[event.id] !== undefined 
    ? eventCounts[event.id] 
    : event.rsvpCount

  const isFull = !!event.capacity && currentRsvpCount >= event.capacity
  const isDisabled = Boolean(isRsvping || (isFull && !hasUserRsvp))

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
      await new Promise(resolve => setTimeout(resolve, 500))
      dispatch(rsvpToEvent(event.id))
      setIsRsvping(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      setShowShareOptions(true)
    }
  }

  const typeStyles = {
    Service: 'bg-blue-100 text-blue-800',
    Study: 'bg-green-100 text-green-800',
    Social: 'bg-purple-100 text-purple-800',
    Outreach: 'bg-orange-100 text-orange-800',
    Prayer: 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/events"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to All Events
        </Link>

        {/* Event Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
          {/* Header - Mobile Layout */}
          <div className="block sm:hidden mb-4">
            <div className="flex flex-col gap-2 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typeStyles[event.type]} self-start`}>
                {event.type} Event
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-1" />
                {new Date(event.date).toLocaleDateString('en-US', { 
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
            
            <h1 className="text-xl font-bold text-gray-900 mb-3">
              {event.title}
            </h1>
            
            <p className="text-base text-gray-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Header - Desktop Layout */}
          <div className="hidden sm:block">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${typeStyles[event.type]} self-start lg:self-auto`}>
                {event.type} Event
              </span>
              <div className="flex items-center text-base lg:text-lg text-gray-600 font-semibold">
                <Calendar size={18} className="mr-2" />
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed">
              {event.description}
            </p>
          </div>
          
          {/* Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center text-base sm:text-lg text-gray-700">
                <Clock size={20} className="mr-3 sm:mr-4 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold">{event.time}</div>
                  {event.duration && (
                    <div className="text-xs sm:text-sm text-gray-500">Duration: {event.duration}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center text-base sm:text-lg text-gray-700">
                <MapPin size={20} className="mr-3 sm:mr-4 text-green-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold">{event.location}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Location</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center text-base sm:text-lg text-gray-700">
                <Users size={20} className="mr-3 sm:mr-4 text-purple-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold">{currentRsvpCount} RSVPs</div>
                  {event.capacity && (
                    <div className="text-xs sm:text-sm text-gray-500">
                      {Math.max(0, event.capacity - currentRsvpCount)} spots remaining
                    </div>
                  )}
                </div>
              </div>
              
              {event.contactPerson && (
                <div className="text-base sm:text-lg text-gray-700">
                  <div className="font-semibold">Contact Person</div>
                  <div className="text-gray-600 text-sm sm:text-base">{event.contactPerson}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* RSVP Status */}
          {hasUserRsvp && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-center">
                <Check size={16} className="text-green-600 mr-2 flex-shrink-0" />
                <span className="text-green-800 font-semibold text-sm sm:text-base">
                  You're attending this event!
                </span>
              </div>
            </div>
          )}
          
          {isFull && !hasUserRsvp && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-center">
                <Users size={16} className="text-red-600 mr-2 flex-shrink-0" />
                <span className="text-red-800 font-semibold text-sm sm:text-base">
                  This event is at capacity. Join the waitlist or check back for cancellations.
                </span>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <button 
              onClick={handleRsvp}
              disabled={isDisabled}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-base transition-colors flex items-center justify-center ${
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
                  <Check size={18} className="mr-2" />
                  You're Attending
                </>
              ) : isFull ? (
                'Event Full'
              ) : (
                'RSVP for This Event'
              )}
            </button>
            
            <button 
              onClick={handleShare}
              className="flex-1 border border-blue-600 text-blue-600 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-base hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              <Share2 size={18} className="mr-2" />
              Share Event
            </button>
          </div>

          {/* Share Options Modal */}
          {showShareOptions && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-sm mx-auto">
                <h3 className="text-lg font-semibold mb-3 sm:mb-4">Share Event</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">Copy the link to share:</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                  <input 
                    type="text" 
                    value={typeof window !== 'undefined' ? window.location.href : ''}
                    readOnly
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm truncate"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      setShowShareOptions(false)
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm sm:text-base whitespace-nowrap"
                  >
                    Copy Link
                  </button>
                </div>
                <button 
                  onClick={() => setShowShareOptions(false)}
                  className="w-full mt-3 sm:mt-4 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}