import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/redux/baseQuery'
import { PrayerRequest, CreatePrayerRequestData, User } from '@/types'

interface PrayerCommitment {
  id: string
  user: User
  createdAt: string
}

interface PrayerUpdate {
  id: string
  content: string
  user: User
  createdAt: string
}

interface PrayersResponse {
  prayers: PrayerRequest[]
  total: number
}

interface PrayerQueryParams {
  page?: number
  limit?: number
  status?: string
  ministry?: string
}

export const prayerApi = createApi({
  reducerPath: 'prayerApi',
  baseQuery,
  tagTypes: ['Prayer'],
  endpoints: (builder) => ({
    getPrayers: builder.query<PrayersResponse, PrayerQueryParams | undefined>({
      query: (params) => ({
        url: '/prayers/list',
        params: params || {},
      }),
      providesTags: ['Prayer'],
    }),
    getPrayer: builder.query<PrayerRequest, string>({
      query: (id) => `/prayers/${id}`,
      providesTags: ['Prayer'],
    }),
    createPrayerRequest: builder.mutation<PrayerRequest, CreatePrayerRequestData>({
      query: (request) => ({
        url: '/prayers/create',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['Prayer'],
    }),
    commitToPray: builder.mutation<PrayerCommitment, string>({
      query: (id) => ({
        url: `/prayers/${id}/pray`,
        method: 'POST',
      }),
      invalidatesTags: ['Prayer'],
    }),
    addPrayerUpdate: builder.mutation<PrayerUpdate, { id: string; content: string }>({
      query: ({ id, content }) => ({
        url: `/prayers/${id}/updates`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Prayer'],
    }),
  }),
})

export const { 
  useGetPrayersQuery, 
  useGetPrayerQuery, 
  useCreatePrayerRequestMutation, 
  useCommitToPrayMutation,
  useAddPrayerUpdateMutation
} = prayerApi