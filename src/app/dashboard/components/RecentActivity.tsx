import { formatDistanceToNow } from 'date-fns'
import { MessageSquare, Heart, Users, Calendar } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'prayer' | 'post' | 'event' | 'donation'
  title: string
  description: string
  timestamp: string
  user?: string
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'prayer',
    title: 'New Prayer Request',
    description: 'Pray for healing and strength for sister Mary',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    user: 'John Doe'
  },
  {
    id: '2',
    type: 'post',
    title: 'New Sermon Posted',
    description: 'Sunday sermon: "The Power of Faith" is now available',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '3',
    type: 'donation',
    title: 'New Donation Received',
    description: 'Thank you for your generous donation to the building fund',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '4',
    type: 'event',
    title: 'Upcoming Event',
    description: 'Bible study this Wednesday at 7:00 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
]

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'prayer':
      return <Heart size={16} className="text-red-500" />
    case 'post':
      return <MessageSquare size={16} className="text-blue-500" />
    case 'event':
      return <Calendar size={16} className="text-green-500" />
    case 'donation':
      return <Users size={16} className="text-purple-500" />
  }
}

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <span>{formatDistanceToNow(new Date(activity.timestamp))} ago</span>
                {activity.user && (
                  <>
                    <span className="mx-2">•</span>
                    <span>By {activity.user}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
