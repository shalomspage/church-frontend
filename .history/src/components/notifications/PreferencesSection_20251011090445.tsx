import { Settings } from 'lucide-react'
import DeliveryMethods from './DeliveryMethods'
import NotificationTypes from './NotificationTypes'
import { NotificationPreferences } from '@/types/notifications'

interface PreferencesSectionProps {
  preferences: NotificationPreferences
  onPreferenceChange: (key: keyof NotificationPreferences, value: boolean) => void
  onSavePreferences: () => void
}

export default function PreferencesSection({ 
  preferences, 
  onPreferenceChange, 
  onSavePreferences 
}: PreferencesSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Settings size={24} className="mr-3" />
        Notification Preferences
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DeliveryMethods 
          preferences={preferences} 
          onPreferenceChange={onPreferenceChange} 
        />
        <NotificationTypes 
          preferences={preferences} 
          onPreferenceChange={onPreferenceChange} 
        />
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button 
          onClick={onSavePreferences}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  )
}