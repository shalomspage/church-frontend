import Link from 'next/link'
import { Calendar } from 'lucide-react'
import EventCard from '@/components/events/EventCard'
import { featuredEvents, upcomingEvents } from '@/data/events' // Import both

export default function Events() {
  // Show only first 4 featured upcoming events on homepage
  const homePageEvents = featuredEvents.slice(0, 4)

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
          url("/images/homepage/hero-bg.jpg") center/cover
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

        {/* Events Grid - Only show if there are featured events */}
        {homePageEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              {homePageEvents.map((event) => (
                <EventCard 
                  key={event.id}
                  event={event}
                  showImage={true}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No upcoming events scheduled. Check back soon!</p>
          </div>
        )}

        {/* CTA - Only show if there are more events */}
        {upcomingEvents.length > 4 && (
          <div className="text-center">
            <Link 
              href="/events"
              className="inline-flex items-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <Calendar size={20} className="mr-2" />
              View All {upcomingEvents.length} Events
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}