import Link from 'next/link'
import { Calendar } from 'lucide-react'
import UpcomingEvents from '../upcoming-events/UpcomingEvents'

export default function Events() {
  return (
    <section 
      id="events" 
      className="py-20 bg-white relative"
      style={{
        '--image-opacity': '0.3',
        '--overlay-opacity': '0.7',
        '--blur-amount': '2px',
      } as React.CSSProperties}
    >
      {/* Background with CSS Variables */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/events-bg.jpg")',
            opacity: 'var(--image-opacity, 0.3)',
            filter: 'blur(var(--blur-amount, 2px))',
          }}
        />
        
        {/* Customizable Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 30% 40%,
                transparent 0%,
                rgba(255, 255, 255, var(--overlay-opacity, 0.7)) 70%
              ),
              linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.9) 0%,
                rgba(255, 255, 255, 0.6) 50%,
                rgba(255, 255, 255, 0.9) 100%
              )
            `,
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Your content remains the same */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for worship, fellowship, and service opportunities in our community.
          </p>
        </div>

        <UpcomingEvents />
        
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