import Link from 'next/link'
import { Users, Heart, BookOpen, Calendar, Home, Users2 } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Users,
      title: 'Sunday Services',
      description: 'Join us for inspiring worship services every Sunday and Wednesday.',
      link: '/sunday-service',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Freeindeed Service',
      description: '24/7 prayer support and weekly prayer meetings for all needs.',
      link: '/freeindeed-service',
      color: 'red'
    },
    {
      icon: BookOpen,
      title: 'Deliverance Service',
      description: 'Deepen your faith through our various Bible study groups.',
      link: '/deliverance-service',
      color: 'green'
    },
    {
      icon: Users2,
      title: 'Upper Room Confrience',
      description: 'Connect with others in our community small groups.',
      link: '/confrience',
      color: 'purple'
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Join our community events, retreats, and special services.',
      link: '/events',
      color: 'orange'
    },
    {
      icon: Home,
      title: 'Envangelism',
      description: 'Come see our facilities and meet our welcoming community.',
      link: '/envangelism',
      color: 'teal'
    }
  ]

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    teal: 'bg-teal-100 text-teal-600'
  }

  return (
    <section id="ministries" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ministries & Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover opportunities to grow in faith, serve others, and connect with our church family.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link 
                key={index}
                href={feature.link}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="text-blue-600 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/ministries"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
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