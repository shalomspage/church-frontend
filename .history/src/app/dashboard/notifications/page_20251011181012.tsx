'use client'

import { useState } from 'react'
import NotificationsHeader from '@/components/dashboard/notifications/NotificationsHeader'
import NotificationsList from '@/components/dashboard/notifications/NotificationsList'
import PreferencesSection from '@/components/dashboard/notifications/PreferencesSection'
import { Notification, NotificationPreferences } from '../../types/notifications' // Direct relative path

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'EVENT_REMINDER',
      title: 'Sunday Service Reminder',
      message: 'Don\'t forget about our worship service tomorrow at 10:00 AM',
      timestamp: '2 hours ago',
      read: false,
      priority: 'HIGH'
    },
    {
      id: 2,
      type: 'ANNOUNCEMENT',
      title: 'Church Picnic Announcement',
      message: 'Annual church picnic scheduled for next Saturday. Save the date!',
      timestamp: '1 day ago',
      read: false,
      priority: 'NORMAL'
    },
    {
      id: 3,
      type: 'PRAYER_REQUEST',
      title: 'New Prayer Request',
      message: 'Sister Sarah requested prayers for healing and strength',
      timestamp: '2 days ago',
      read: true,
      priority: 'NORMAL'
    },
    {
      id: 4,
      type: 'SYSTEM',
      title: 'Profile Update Required',
      message: 'Please update your contact information in your profile',
      timestamp: '3 days ago',
      read: true,
      priority: 'LOW'
    }
  ])

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    sms: false,
    push: true,
    eventReminders: true,
    prayerRequests: true,
    announcements: true
  })

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const handlePreferenceChange = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences((prev: NotificationPreferences) => ({ ...prev, [key]: value }))
  }

  const handleSavePreferences = () => {
    console.log('Saving preferences:', preferences)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NotificationsHeader 
          unreadCount={unreadCount}
          onMarkAllAsRead={markAllAsRead}
        />

        <NotificationsList 
          notifications={notifications}
          onMarkAsRead={markAsRead}
        />

        <PreferencesSection 
          preferences={preferences}
          onPreferenceChange={handlePreferenceChange}
          onSavePreferences={handleSavePreferences}
        />
      </div>
    </div>
  )
}