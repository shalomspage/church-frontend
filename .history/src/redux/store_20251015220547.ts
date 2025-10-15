import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from './storage' // Use our custom storage instead
import { authApi } from '@/services/authApi'
import { newsApi } from '@/services/newsApi'
import { prayerApi } from '@/services/prayerApi'
import { donationsApi } from '@/services/donationsApi'
import authSlice from './slices/authSlice'
import { rsvpSlice } from './slices/rsvpSlice'

// Persist config for auth slice only
const authPersistConfig = {
  key: 'auth',
  storage, // Use our custom storage
  whitelist: ['user', 'isAuthenticated', 'token']
}

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice)

export const store = configureStore({
  reducer: {
    rsvp: rsvpSlice.reducer,
    auth: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [prayerApi.reducerPath]: prayerApi.reducer,
    [donationsApi.reducerPath]: donationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(authApi.middleware)
      .concat(newsApi.middleware)
      .concat(prayerApi.middleware)
      .concat(donationsApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch