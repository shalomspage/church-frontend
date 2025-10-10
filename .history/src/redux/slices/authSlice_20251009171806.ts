import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types' // Import from your updated types

// ❌ REMOVE this local User interface
/*
interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MEMBER'
}
*/

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      
      // Store token in localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token)
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      
      // Remove token from localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const { setCredentials, logout, updateUser } = authSlice.actions
export default authSlice.reducer