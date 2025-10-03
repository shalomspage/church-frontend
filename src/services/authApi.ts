import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/redux/baseQuery'
import { User, LoginCredentials, RegisterData } from '@/types'

interface LoginResponse {
  user: User
  token: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<LoginResponse, RegisterData>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => '/auth/profile',
      providesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } = authApi