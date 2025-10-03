import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@/services/authApi'
import { newsApi } from '@/services/newsApi'
import { prayerApi } from '@/services/prayerApi'
import { donationsApi } from '@/services/donationsApi'
import authSlice from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [prayerApi.reducerPath]: prayerApi.reducer,
    [donationsApi.reducerPath]: donationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(newsApi.middleware)
      .concat(prayerApi.middleware)
      .concat(donationsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch