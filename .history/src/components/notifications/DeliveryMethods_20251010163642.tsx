import { NotificationPreferences } from '@/types/notifications'

interface DeliveryMethodsProps {
  preferences: NotificationPreferences
  onPreferenceChange: (key: keyof NotificationPreferences, value: boolean) => void
}

export default function DeliveryMethods({ preferences, onPreferenceChange }: DeliveryMethodsProps) {
  const deliveryMethods = [
    { key: 'email', label: 'Email Notifications' },
    { key: 'sms', label: 'SMS Text Messages' },
    { key: 'push', label: 'Push Notifications' }
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Methods</h3>
      <div className="space-y-3">
        {deliveryMethods.map((method) => (
          <label key={method.key} className="flex items-center">
            <input
              type="checkbox"
              checked={preferences[method.key as keyof NotificationPreferences]}
              onChange={(e) => onPreferenceChange(method.key as keyof NotificationPreferences, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{method.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}