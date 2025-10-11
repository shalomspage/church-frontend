'use client'

import { useState } from 'react'
import ProfileHeader from '@/components/dashboard/profile/ProfileHeader'
import AvatarSection from '@/components/dashboard/profile/AvatarSection'
import ProfileForm from '@/components/dashboard/profile/ProfileForm'
import SecuritySection from '@/components/dashboard/profile/SecuritySection'

interface User {
  name: string
  email: string
  phone: string
  address: string
  bio: string
  avatar: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
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
        <ProfileHeader 
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AvatarSection 
            user={user}
            isEditing={isEditing}
          />
          
          <div className="lg:col-span-2">
            <ProfileForm 
              user={user}
              setUser={setUser}
              isEditing={isEditing}
            />
            
            <SecuritySection />
          </div>
        </div>
      </div>
    </div>
  )
}