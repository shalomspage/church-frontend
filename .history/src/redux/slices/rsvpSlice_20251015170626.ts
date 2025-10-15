import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RsvpState {
  rsvpEvents: string[] // Array of event IDs user has RSVP'd to
}

const initialState: RsvpState = {
  rsvpEvents: []
}

export const rsvpSlice = createSlice({
  name: 'rsvp',
  initialState,
  reducers: {
    rsvpToEvent: (state, action: PayloadAction<string>) => {
      if (!state.rsvpEvents.includes(action.payload)) {
        state.rsvpEvents.push(action.payload)
      }
    },
    cancelRsvp: (state, action: PayloadAction<string>) => {
      state.rsvpEvents = state.rsvpEvents.filter(id => id !== action.payload)
    },
    setRsvpEvents: (state, action: PayloadAction<string[]>) => {
      state.rsvpEvents = action.payload
    }
  }
})

export const { rsvpToEvent, cancelRsvp, setRsvpEvents } = rsvpSlice.actions
export default rsvpSlice.reducer