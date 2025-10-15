import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RsvpState {
  rsvpEvents: string[] // Array of event IDs user has RSVP'd to
  eventCounts: { [eventId: string]: number } // Track RSVP counts per event
}

const initialState: RsvpState = {
  rsvpEvents: [],
  eventCounts: {}
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
      }
    },
    setRsvpEvents: (state, action: PayloadAction<string[]>) => {
      state.rsvpEvents = action.payload
    },
    setEventCount: (state, action: PayloadAction<{ eventId: string; count: number }>) => {
      const { eventId, count } = action.payload
      state.eventCounts[eventId] = count
    }
  }
})

export const { rsvpToEvent, cancelRsvp, setRsvpEvents, setEventCount } = rsvpSlice.actions
export default rsvpSlice.reducer