import { DollarSign } from 'lucide-react'

export default function ComingSoonBanner() {
  return (
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
  )
}