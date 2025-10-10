import Link from 'next/link'
import { Calendar } from 'lucide-react'
import UpcomingEvents from '../upcoming-events/UpcomingEvents'

export default function Events() {
  return (
    <section 
      id="events" 
      className="py-20 relative"
      style={{
        background: `
          linear-gradient(
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.7)
          ),
          url("/images/hero-bg.jpg") center/cover
        `
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for worship, fellowship, and service opportunities in our community.
          </p>
        </div>

        {/* Events Grid */}
        <UpcomingEvents />
        
        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/events"
            className="inline-flex items-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            <Calendar size={20} className="mr-2" />
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}