export interface Campaign {
  id: number
  title: string
  description: string
  target: number
  raised: number
  donors: number
}

export interface CampaignsGridProps {
  campaigns: Campaign[]
}

export interface CampaignCardProps {
  campaign: Campaign
}