import { Bell, Mail, Calendar, Heart } from 'lucide-react'
import { Notification, NotificationType, PriorityLevel } from '@/types/notifications'

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead: (id: number) => void
}

export default function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'EVENT_REMINDER':
        return <Calendar size={20} className="text-blue-600" />
      case 'ANNOUNCEMENT':
        return <Bell size={20} className="text-green-600" />
      case 'PRAYER_REQUEST':
        return <Heart size={20} className="text-red-600" />
      case 'SYSTEM':
        return <Mail size={20} className="text-gray-600" />
      default:
        return <Bell size={20} className="text-gray-600" />
    }
  }

  const getPriorityColor = (priority: PriorityLevel) => {
    switch (priority) {
      case 'HIGH':
        return 'border-l-red-500'
      case 'URGENT':
        return 'border-l-orange-500'
      case 'NORMAL':
        return 'border-l-blue-500'
      case 'LOW':
        return 'border-l-gray-500'
      default:
        return 'border-l-gray-500'
    }
  }

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${getPriorityColor(notification.priority)} border-l-4 ${!notification.read ? 'bg-blue-50' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {notification.title}
            </h3>
            <p className="text-gray-600 mb-2">
              {notification.message}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{notification.timestamp}</span>
              {!notification.read && (
                <span className="ml-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  New
                </span>
              )}
            </div>
          </div>
        </div>
        {!notification.read && (
          <button 
            onClick={() => onMarkAsRead(notification.id)}
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            Mark Read
          </button>
        )}
      </div>
    </div>
  )
}