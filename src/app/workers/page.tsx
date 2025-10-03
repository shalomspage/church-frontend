import { Users, Mail, Phone, MapPin } from 'lucide-react'

export default function WorkersPage() {
  const workers = [
    {
      id: 1,
      name: 'Pastor John Smith',
      role: 'SENIOR_PASTOR',
      email: 'pastor.john@church.org',
      phone: '(555) 123-4567',
      department: 'Leadership',
      bio: 'Leading our church with vision and compassion for over 10 years.',
      avatar: '/images/workers/pastor-john.jpg'
    },
    {
      id: 2,
      name: 'Sister Mary Johnson',
      role: 'WORSHIP_LEADER', 
      email: 'mary.johnson@church.org',
      phone: '(555) 123-4568',
      department: 'Worship',
      bio: 'Passionate about leading God\'s people in authentic worship.',
      avatar: '/images/workers/mary-johnson.jpg'
    },
    {
      id: 3,
      name: 'Brother David Wilson',
      role: 'YOUTH_PASTOR',
      email: 'david.wilson@church.org', 
      phone: '(555) 123-4569',
      department: 'Youth',
      bio: 'Dedicated to mentoring the next generation of believers.',
      avatar: '/images/workers/david-wilson.jpg'
    },
    {
      id: 4,
      name: 'Deacon Robert Brown',
      role: 'DEACON',
      email: 'robert.brown@church.org',
      phone: '(555) 123-4570',
      department: 'Service',
      bio: 'Serving the congregation with humility and dedication.',
      avatar: '/images/workers/robert-brown.jpg'
    }
  ]

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Church Staff & Leaders
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated team serving our church community with love and commitment.
          </p>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workers.map((worker) => (
            <div key={worker.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
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
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-2xl mx-auto">
            <Users size={48} className="text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              Join Our Ministry Team
            </h3>
            <p className="text-blue-700 mb-4">
              Interested in serving? We&apos;re always looking for dedicated volunteers to help with various ministries.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact About Volunteering
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}