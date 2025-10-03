'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Camera, Trash2, Save } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@church.org',
    phone: '(555) 123-4567',
    address: '123 Church Street, City, State 12345',
    bio: 'Active member of the church community, serving in the worship team.',
    avatar: '/images/avatars/user-default.jpg'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    // In real app, this would call the API
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Section */}
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

          {/* Profile Information */}
          <div className="lg:col-span-2">
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
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 items-center">
                    <MapPin size={16} className="mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={user.address}
                      onChange={(e) => setUser({ ...user, address: e.target.value })}
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
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{user.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Password Reset Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Security
              </h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}