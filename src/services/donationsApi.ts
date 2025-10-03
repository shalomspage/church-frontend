import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/redux/baseQuery'
import { Donation, DonationCampaign, CreateDonationData } from '@/types'

interface DonationsResponse {
  donations: Donation[]
  total: number
}

interface CampaignsResponse {
  campaigns: DonationCampaign[]
}

export const donationsApi = createApi({
  reducerPath: 'donationsApi',
  baseQuery,
  tagTypes: ['Donation'],
  endpoints: (builder) => ({
    getCampaigns: builder.query<CampaignsResponse, void>({
      query: () => '/donations/campaigns',
      providesTags: ['Donation'],
    }),
    makeDonation: builder.mutation<Donation, CreateDonationData>({
      query: (donation) => ({
        url: '/donations/give',
        method: 'POST',
        body: donation,
      }),
      invalidatesTags: ['Donation'],
    }),
    getMyDonations: builder.query<DonationsResponse, void>({
      query: () => '/donations/my-donations',
      providesTags: ['Donation'],
    }),
  }),
})

export const { 
  useGetCampaignsQuery, 
  useMakeDonationMutation, 
  useGetMyDonationsQuery 
} = donationsApi