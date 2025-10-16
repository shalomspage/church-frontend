import TestimonyCard from '@/components/testimonies/TestimonyCard'
import { testimonies } from '@/data/testimonies'
import { Star, Users, Heart, Share2 } from 'lucide-react'

export default function TestimoniesPage() {
  const totalLikes = testimonies.reduce((total, testimony) => total + testimony.likes, 0)
  const categories = [...new Set(testimonies.map(t => t.category))]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-yellow-500" size={32} fill="currentColor" />
            <h1 className="text-4xl font-bold text-gray-900">
              Powerful Testimonies
            </h1>
            <Star className="text-yellow-500" size={32} fill="currentColor" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read amazing stories of God's faithfulness, healing, provision, and transformation in our church family.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <Users className="text-blue-600 mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-gray-900">{testimonies.length}</div>
            <div className="text-gray-600">Testimonies</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <Heart className="text-red-600 mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-gray-900">{totalLikes}</div>
            <div className="text-gray-600">Total Encouragements</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <Share2 className="text-green-600 mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>

        {/* All Testimonies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Testimonies ({testimonies.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonies.map((testimony) => (
              <TestimonyCard key={testimony.id} testimony={testimony} compact={false} />
            ))}
          </div>
        </div>

        {/* Share Your Story CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-8 text-center text-white">
          <Star size={48} className="text-yellow-300 mx-auto mb-4" fill="currentColor" />
          <h3 className="text-2xl font-bold mb-2">
            Share Your Story
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Has God done something amazing in your life? Your testimony could encourage and inspire others in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Share Your Testimony
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Pastoral Team
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}