import { Mail, Phone, MapPin } from 'lucide-react'
import { Worker, WorkerCardProps } from '@/types/workers'

const getRoleLabel = (role: string) => {
  const roles: { [key: string]: string } = {
    SENIOR_PASTOR: 'Senior Pastor',
    WORSHIP_LEADER: 'Worship Leader',
    YOUTH_PASTOR: 'Youth Pastor',
    DEACON: 'Deacon',
    ELDER: 'Elder',
    VOLUNTEER: 'Volunteer'
  }
  return roles[role] || role
}

export default function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Avatar */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-4xl text-white">👤</div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {worker.name}
        </h3>
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mb-3">
          {getRoleLabel(worker.role)}
        </span>
        
        <p className="text-gray-600 text-sm mb-4">
          {worker.bio}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Mail size={14} className="mr-2" />
            {worker.email}
          </div>
          <div className="flex items-center">
            <Phone size={14} className="mr-2" />
            {worker.phone}
          </div>
          <div className="flex items-center">
            <MapPin size={14} className="mr-2" />
            {worker.department}
          </div>
        </div>

        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors">
          View Profile
        </button>
      </div>
    </div>
  )
}