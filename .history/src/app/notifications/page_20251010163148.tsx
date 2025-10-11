'use client'

import { useState } from 'react'
import NotificationsHeader from '@/components/notifications/NotificationsHeader'
import NotificationsList from '@/components/notifications/NotificationsList'
import PreferencesSection from '@/components/notifications/PreferencesSection'
import { Notification, NotificationPreferences } from '@/types/notifications'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    // ... your notifications data
  ])

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    // ... your preferences data
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
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSavePreferences = () => {
    // TODO: Save preferences to backend
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