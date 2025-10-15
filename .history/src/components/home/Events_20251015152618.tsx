import Link from 'next/link'
import { Calendar } from 'lucide-react'
import EventCard from '@/components/events/EventCard'
import { featuredEvents, upcomingEvents } from '@/data/events'

export default function Events() {
  // Show only first 4 featured upcoming events on homepage
  const homePageEvents = featuredEvents.slice(0, 4)

  return (
    <section 
      id="events" 
      className="py-20 relative min-h-[600px]"
      style={{
        background: `
          linear-gradient(
            rgba(255, 255, 255, 0.85),
            rgba(255, 255, 255, 0.75)
          ),
          url("/images/homepage/hero-bg.jpg") center/cover fixed
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

        {/* Events Grid with backdrop container */}
        <div className="bg-black/5 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl">
          {homePageEvents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {homePageEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className={`${
                    index === 0 ? 'lg:col-span-2' : ''
                  } transition-transform duration-300 hover:scale-[1.02]`}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No upcoming events scheduled. Check back soon!</p>
            </div>
          )}

          {/* CTA - Only show if there are more events */}
          {upcomingEvents.length > 4 && (
            <div className="text-center mt-8 pt-6 border-t border-white/20">
              <Link 
                href="/events"
                className="inline-flex items-center bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/50 shadow-lg hover:shadow-xl"
              >
                <Calendar size={20} className="mr-2" />
                View All {upcomingEvents.length} Events
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}