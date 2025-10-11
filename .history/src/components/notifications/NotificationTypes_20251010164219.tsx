import { NotificationPreferences } from "@/types/notifications"


interface NotificationTypesProps {
  preferences: NotificationPreferences
  onPreferenceChange: (key: keyof NotificationPreferences, value: boolean) => void
}

export default function NotificationTypes({ preferences, onPreferenceChange }: NotificationTypesProps) {
  const notificationTypes = [
    { key: 'eventReminders', label: 'Event Reminders' },
    { key: 'prayerRequests', label: 'Prayer Requests' },
    { key: 'announcements', label: 'Church Announcements' }
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
      <div className="space-y-3">
        {notificationTypes.map((type) => (
          <label key={type.key} className="flex items-center">
            <input
              type="checkbox"
              checked={preferences[type.key as keyof NotificationPreferences]}
              onChange={(e) => onPreferenceChange(type.key as keyof NotificationPreferences, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{type.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}