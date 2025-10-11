import { Users } from 'lucide-react'

export default function VolunteerCTA() {
  return (
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
  )
}