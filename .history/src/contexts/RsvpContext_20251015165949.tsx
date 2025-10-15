'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface RsvpContextType {
  rsvpEvents: string[] // Array of event IDs user has RSVP'd to
  rsvpToEvent: (eventId: string) => void
  cancelRsvp: (eventId: string) => void
  hasRsvp: (eventId: string) => boolean
}

const RsvpContext = createContext<RsvpContextType | undefined>(undefined)

export function RsvpProvider({ children }: { children: ReactNode }) {
  const [rsvpEvents, setRsvpEvents] = useState<string[]>([])

  const rsvpToEvent = (eventId: string) => {
    setRsvpEvents(prev => [...prev, eventId])
    // In a real app, you would also make an API call here
    console.log(`RSVP'd to event: ${eventId}`)
  }

  const cancelRsvp = (eventId: string) => {
    setRsvpEvents(prev => prev.filter(id => id !== eventId))
    // In a real app, you would also make an API call here
    console.log(`Cancelled RSVP for event: ${eventId}`)
  }

  const hasRsvp = (eventId: string) => {
    return rsvpEvents.includes(eventId)
  }

  return (
    <RsvpContext.Provider value={{ rsvpEvents, rsvpToEvent, cancelRsvp, hasRsvp }}>
      {children}
    </RsvpContext.Provider>
  )
}

export function useRsvp() {
  const context = useContext(RsvpContext)
  if (context === undefined) {
    throw new Error('useRsvp must be used within an RsvpProvider')
  }
  return context
}