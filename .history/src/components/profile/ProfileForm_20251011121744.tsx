import { User, Mail, Phone, MapPin } from 'lucide-react'

interface User {
  name: string
  email: string
  phone: string
  address: string
  bio: string
  avatar: string
}

interface ProfileFormProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  isEditing: boolean
}

export default function ProfileForm({ user, setUser, isEditing }: ProfileFormProps) {
  const handleChange = (field: keyof User, value: string) => {
    setUser(prevUser => ({ ...prevUser, [field]: value }))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <User size={20} className="mr-2" />
        Personal Information
      </h3>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <p className="text-gray-900">{user.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Mail size={16} className="mr-2" />
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <p className="text-gray-900">{user.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 items-center">
            <Phone size={16} className="mr-2" />
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={user.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <p className="text-gray-900">{user.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
            <MapPin size={16} className="mr-2" />
            Address
          </label>
          {isEditing ? (
            <textarea
              value={user.address}
              onChange={(e) => handleChange('address', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <p className="text-gray-900">{user.address}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          {isEditing ? (
            <textarea
              value={user.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <p className="text-gray-900">{user.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}