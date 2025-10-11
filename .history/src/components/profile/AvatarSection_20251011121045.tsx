import { Camera, Trash2 } from 'lucide-react'

interface User {
  name: string
  email: string
  avatar: string
}

interface AvatarSectionProps {
  user: User
  isEditing: boolean
}

export default function AvatarSection({ user, isEditing }: AvatarSectionProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl">
              👤
            </div>
            {isEditing && (
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Camera size={16} />
                </button>
                <button className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {user.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Church Member
          </p>

          {/* Avatar Upload Info */}
          {isEditing && (
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p>Supported formats: JPG, PNG, GIF</p>
              <p>Max file size: 5MB</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}