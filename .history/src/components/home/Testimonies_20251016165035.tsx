import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import TestimonyCard from '@/components/testimonies/TestimonyCard'
import { featuredTestimonies } from '@/data/testimonies'

export default function Testimonies() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-yellow-500" size={24} fill="currentColor" />
            <h2 className="text-4xl font-bold text-gray-900">
              Powerful Testimonies
            </h2>
            <Star className="text-yellow-500" size={24} fill="currentColor" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how God is transforming lives in our church community through these amazing stories of faith.
          </p>
        </div>

        {/* Testimonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {featuredTestimonies.map((testimony) => (
            <TestimonyCard key={testimony.id} testimony={testimony} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/testimonies"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold text-lg transition-colors group"
          >
            View All Testimonies
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}