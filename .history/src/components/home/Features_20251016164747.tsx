import Link from 'next/link'
import MinistryCard from '@/components/ministries/MinistryCard'
import { featuredMinistries } from '@/data/ministries'

export default function Features() {
  return (
    <section id="ministries" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ministries & Programs
          </h2>
          <p className="text-l text-gray-600 max-w-2xl mx-auto">
            Discover opportunities to grow in faith, serve others, and connect with our church family.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMinistries.map((ministry) => (
            <MinistryCard 
              key={ministry.id}
              ministry={ministry}
              size="large"
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/ministries"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold text-lg transition-colors"
          >
            Explore All Ministries
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}