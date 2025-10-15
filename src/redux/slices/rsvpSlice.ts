import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RsvpState {
  rsvpEvents: string[]
  eventCounts: { [eventId: string]: number }
}

// Load initial state from localStorage if available
const loadInitialState = (): RsvpState => {
  if (typeof window === 'undefined') {
    return { rsvpEvents: [], eventCounts: {} }
  }
  
  try {
    const stored = localStorage.getItem('church-rsvp')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading RSVP state from localStorage:', error)
  }
  
  return { rsvpEvents: [], eventCounts: {} }
}

const initialState: RsvpState = loadInitialState()

// Helper function to save state to localStorage
const saveToLocalStorage = (state: RsvpState) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('church-rsvp', JSON.stringify(state))
    } catch (error) {
      console.error('Error saving RSVP state to localStorage:', error)
    }
  }
}

export const rsvpSlice = createSlice({
  name: 'rsvp',
  initialState,
  reducers: {
    rsvpToEvent: (state, action: PayloadAction<string>) => {
      const eventId = action.payload
      
      // If user hasn't RSVP'd to this event yet
      if (!state.rsvpEvents.includes(eventId)) {
        state.rsvpEvents.push(eventId)
        // Increment the RSVP count for this event
        state.eventCounts[eventId] = (state.eventCounts[eventId] || 0) + 1
        
        // Sync to localStorage
        saveToLocalStorage(state)
      }
    },
    cancelRsvp: (state, action: PayloadAction<string>) => {
      const eventId = action.payload
      
      // If user has RSVP'd to this event
      if (state.rsvpEvents.includes(eventId)) {
        state.rsvpEvents = state.rsvpEvents.filter(id => id !== eventId)
        // Decrement the RSVP count for this event
        if (state.eventCounts[eventId] && state.eventCounts[eventId] > 0) {
          state.eventCounts[eventId] = state.eventCounts[eventId] - 1
        }
        
        // Sync to localStorage
        saveToLocalStorage(state)
      }
    },
    setRsvpEvents: (state, action: PayloadAction<string[]>) => {
      state.rsvpEvents = action.payload
      saveToLocalStorage(state)
    },
    setEventCount: (state, action: PayloadAction<{ eventId: string; count: number }>) => {
      const { eventId, count } = action.payload
      state.eventCounts[eventId] = count
      saveToLocalStorage(state)
    },
    loadFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('church-rsvp')
          if (stored) {
            const parsed = JSON.parse(stored)
            state.rsvpEvents = parsed.rsvpEvents || []
            state.eventCounts = parsed.eventCounts || {}
          }
        } catch (error) {
          console.error('Error loading RSVP state from localStorage:', error)
        }
      }
    },
    // Initialize with event data (useful for setting initial counts from your events data)
    initializeEventCounts: (state, action: PayloadAction<{id: string, rsvpCount: number}[]>) => {
      action.payload.forEach(event => {
        // Only set initial count if we don't already have a count for this event
        if (state.eventCounts[event.id] === undefined) {
          state.eventCounts[event.id] = event.rsvpCount
        }
      })
      saveToLocalStorage(state)
    }
  }
})

export const { 
  rsvpToEvent, 
  cancelRsvp, 
  setRsvpEvents, 
  setEventCount, 
  loadFromStorage,
  initializeEventCounts 
} = rsvpSlice.actions

export default rsvpSlice.reducer