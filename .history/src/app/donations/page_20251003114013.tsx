import { DollarSign, Users } from 'lucide-react'

export default function DonationsPage() {
  const campaigns = [
    {
      id: 1,
      title: 'Building Fund',
      description: 'Help us expand our sanctuary to accommodate our growing congregation.',
      target: 50000,
      raised: 32500,
      donors: 147
    },
    {
      id: 2,
      title: 'Missions Outreach',
      description: 'Support our mission teams serving communities locally and abroad.',
      target: 25000,
      raised: 18200,
      donors: 89
    },
    {
      id: 3,
      title: 'Youth Ministry',
      description: 'Fund activities, equipment, and resources for our youth programs.',
      target: 15000,
      raised: 9200,
      donors: 63
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Give & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your generous giving supports our ministries and helps spread God&apos;s love in our community.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Campaigns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => {
              const progress = (campaign.raised / campaign.target) * 100
              return (
                <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {campaign.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Raised: ${campaign.raised.toLocaleString()}</span>
                        <span>Goal: ${campaign.target.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        {campaign.donors} donors
                      </div>
                      <div className="text-green-600 font-semibold">
                        {progress.toFixed(1)}% funded
                      </div>
                    </div>

                    <button className="w-full mt-4 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                      <DollarSign size={16} className="mr-2" />
                      Give Now
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <DollarSign size={48} className="text-yellow-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-yellow-900 mb-2">
            Online Giving Coming Soon
          </h3>
          <p className="text-yellow-700 mb-4">
            We&apos;re implementing a secure online giving platform where you can make one-time 
            or recurring donations, track your giving history, and support specific ministries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
              Learn More
            </button>
            <button className="border border-yellow-600 text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition-colors">
              Contact Treasurer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
