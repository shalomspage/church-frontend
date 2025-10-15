import MinistryCard from '@/components/ministries/MinistryCard'
import { ministries } from '@/data/ministries'

export default function MinistriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Ministries
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all the ministries and programs at our church. There's a place for everyone to grow, serve, and connect.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry) => (
            <MinistryCard 
              key={ministry.id}
              ministry={ministry}
              size="large"
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always starting new ministries and programs to serve our community better. 
            Contact us if you have ideas or want to start a new ministry.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Contact Us About Ministries
          </button>
        </div>
      </div>
    </div>
  )
}