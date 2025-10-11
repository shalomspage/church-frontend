'use client'

import { useGetProfileQuery } from '@/services/authApi'
import StatsCard from '@/components/dashboard/StatsCard'
import RecentActivity from '@/components/dashboard/RecentActivity'
import { Users, Newspaper, DollarSign, Calendar, Heart, BookOpen } from 'lucide-react'

export default function DashboardPage() {
  const { data: userData } = useGetProfileQuery()

  // Get the user's display name
  const getUserDisplayName = () => {
    if (!userData) return 'User'
    
    const { firstName, lastName, username } = userData
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    } else if (firstName) {
      return firstName
    } else if (username) {
      return username
    }
    
    return 'User'
  }

  const stats = [
    {
      title: 'Total Members',
      value: '1,247',
      icon: Users,
      description: '+12 this month',
      color: 'blue' as const
    },
    {
      title: 'Prayer Requests',
      value: '24',
      icon: Heart,
      description: '5 new this week',
      color: 'red' as const
    },
    {
      title: 'News Posts',
      value: '18',
      icon: Newspaper,
      description: '2 published today',
      color: 'green' as const
    },
    {
      title: 'Donations',
      value: '$4,287',
      icon: DollarSign,
      description: '+15% from last month',
      color: 'purple' as const
    },
    {
      title: 'Upcoming Events',
      value: '8',
      icon: Calendar,
      description: 'Next: Sunday Service',
      color: 'orange' as const
    },
    {
      title: 'Active Prayers',
      value: '42',
      icon: BookOpen,
      description: '12 answered this month',
      color: 'blue' as const
    },
  ]

  return (
    <div className="min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {getUserDisplayName()}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here&apos;s what&apos;s happening in your church community today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            color={stat.color === 'red' ? 'orange' : stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Weekly Attendance</span>
                <span className="text-sm font-semibold text-gray-900">84%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Volunteers Active</span>
                <span className="text-sm font-semibold text-gray-900">67</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ministries</span>
                <span className="text-sm font-semibold text-gray-900">12</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <div className="font-medium text-gray-900">Create New Post</div>
                <div className="text-sm text-gray-600">Share church updates</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-colors">
                <div className="font-medium text-gray-900">Add Prayer Request</div>
                <div className="text-sm text-gray-600">Request prayers</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <div className="font-medium text-gray-900">View Donations</div>
                <div className="text-sm text-gray-600">Check giving reports</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}