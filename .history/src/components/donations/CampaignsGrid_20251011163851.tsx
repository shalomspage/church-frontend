
import { Campaign, CampaignsGridProps } from '@/types/donations'
import CampaignCard from './CampaignCard'

export default function CampaignsGrid({ campaigns }: CampaignsGridProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  )
}