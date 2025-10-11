export type NotificationType = 'EVENT_REMINDER' | 'ANNOUNCEMENT' | 'PRAYER_REQUEST' | 'SYSTEM'
export type PriorityLevel = 'HIGH' | 'URGENT' | 'NORMAL' | 'LOW'

export interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: PriorityLevel
}

export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  eventReminders: boolean
  prayerRequests: boolean
  announcements: boolean
}