'use client'


import CampaignsGrid from '@/components/donations/CampaignsGrid'
import ComingSoonBanner from '@/components/donations/ComingSoonBanner'
import DonationsHeader from '@/components/donations/DonationsHeader'

export default function DonationsPage() {
  const campaigns = [
    {
      id: 1,
      title: 'Building Fund',
      description: 'Help us expand our sanctuary to accommodate our growing congregation.',
      target: 50000,
      raised: 32500,
      donors: 147
    },
    {
      id: 2,
      title: 'Missions Outreach',
      description: 'Support our mission teams serving communities locally and abroad.',
      target: 25000,
      raised: 18200,
      donors: 89
    },
    {
      id: 3,
      title: 'Youth Ministry',
      description: 'Fund activities, equipment, and resources for our youth programs.',
      target: 15000,
      raised: 9200,
      donors: 63
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DonationsHeader />
        <CampaignsGrid campaigns={campaigns} />
        <ComingSoonBanner />
      </div>
    </div>
  )
}