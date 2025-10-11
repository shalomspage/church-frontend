import { Save } from 'lucide-react'

interface ProfileHeaderProps {
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
}

export default function ProfileHeader({ 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel 
}: ProfileHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600">
          Manage your account information and preferences
        </p>
      </div>
      <div className="flex gap-3">
        {isEditing ? (
          <>
            <button 
              onClick={onSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </button>
            <button 
              onClick={onCancel}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <button 
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}