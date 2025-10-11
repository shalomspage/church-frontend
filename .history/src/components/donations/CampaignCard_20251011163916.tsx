import { Campaign } from '@/types/donations'
import { DollarSign, Users } from 'lucide-react'


interface CampaignCardProps {
  campaign: Campaign
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.raised / campaign.target) * 100

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {campaign.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          {campaign.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Raised: ${campaign.raised.toLocaleString()}</span>
            <span>Goal: ${campaign.target.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            {campaign.donors} donors
          </div>
          <div className="text-green-600 font-semibold">
            {progress.toFixed(1)}% funded
          </div>
        </div>

        <button className="w-full mt-4 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
          <DollarSign size={16} className="mr-2" />
          Give Now
        </button>
      </div>
    </div>
  )
}