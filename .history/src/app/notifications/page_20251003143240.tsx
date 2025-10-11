'use client'

import { useState } from 'react'
import { Bell, Mail, Calendar, Heart, Settings, CheckCircle } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
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

  const [preferences, setPreferences] = useState({
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

  const getNotificationIcon = (type: string) => {
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

  const getPriorityColor = (priority: string) => {
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

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
              onClick={markAllAsRead}
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

        {/* Notifications List */}
        <div className="space-y-4 mb-12">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
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
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Settings size={24} className="mr-3" />
            Notification Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Methods */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Methods</h3>
              <div className="space-y-3">
                {[
                  { key: 'email', label: 'Email Notifications' },
                  { key: 'sms', label: 'SMS Text Messages' },
                  { key: 'push', label: 'Push Notifications' }
                ].map((method) => (
                  <label key={method.key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences[method.key as keyof typeof preferences]}
                      onChange={(e) => setPreferences({ ...preferences, [method.key]: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notification Types */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
              <div className="space-y-3">
                {[
                  { key: 'eventReminders', label: 'Event Reminders' },
                  { key: 'prayerRequests', label: 'Prayer Requests' },
                  { key: 'announcements', label: 'Church Announcements' }
                ].map((type) => (
                  <label key={type.key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences[type.key as keyof typeof preferences]}
                      onChange={(e) => setPreferences({ ...preferences, [type.key]: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}