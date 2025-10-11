import { CheckCircle, Settings } from 'lucide-react'

interface NotificationsHeaderProps {
  unreadCount: number
  onMarkAllAsRead: () => void
}

export default function NotificationsHeader({ unreadCount, onMarkAllAsRead }: NotificationsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Notifications
        </h1>
        <p className="text-gray-600">
          {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
        </p>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={onMarkAllAsRead}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
        >
          <CheckCircle size={16} className="mr-2" />
          Mark All Read
        </button>
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center">
          <Settings size={16} className="mr-2" />
          Preferences
        </button>
      </div>
    </div>
  )
}