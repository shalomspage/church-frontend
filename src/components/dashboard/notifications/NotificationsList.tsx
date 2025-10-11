import { Notification } from '@/types/notifications'
import NotificationCard from './NotificationCard'

interface NotificationsListProps {
  notifications: Notification[]
  onMarkAsRead: (id: number) => void 
}

export default function NotificationsList({ notifications, onMarkAsRead }: NotificationsListProps) {
  return (
    <div className="space-y-4 mb-12">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  )
}