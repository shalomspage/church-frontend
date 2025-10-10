export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MEMBER'
  avatar?: string
  createdAt: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: 'ANNOUNCEMENT' | 'SERMON' | 'MINISTRY' | 'DEVOTIONAL' | 'EVENT_RECAP'
  author: User
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface PrayerRequest {
  id: string
  title: string
  description: string
  isAnonymous: boolean
  isUrgent: boolean
  status: 'ACTIVE' | 'ANSWERED' | 'EXPIRED'
  user?: User
  prayerCount: number
  createdAt: string
}

export interface Donation {
  id: string
  donorName: string
  donorEmail?: string
  amount: number
  currency: string
  paymentMethod: 'CARD' | 'BANK_TRANSFER' | 'MOBILE_MONEY' | 'CASH'
  category: 'GENERAL' | 'BUILDING' | 'MISSIONS' | 'OUTREACH'
  isAnonymous: boolean
  createdAt: string
}

export interface DonationCampaign {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  startDate: string
  endDate: string
  isActive: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface CreatePostData {
  title: string
  content: string
  excerpt?: string
  category: Post['category']
  featured?: boolean
  published?: boolean
}

export interface CreatePrayerRequestData {
  title: string
  description: string
  isAnonymous?: boolean
  isUrgent?: boolean
}

export interface CreateDonationData {
  donorName: string
  donorEmail?: string
  amount: number
  paymentMethod: Donation['paymentMethod']
  category: Donation['category']
  isAnonymous?: boolean
  campaignId?: string
}
