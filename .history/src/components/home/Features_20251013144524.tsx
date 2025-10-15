import Link from 'next/link'
import Image from 'next/image'

export default function Features() {
  const features = [
    {
      image: '/images/homepage/worship-service.jpg', // Path to your image
      title: 'Sunday Services',
      description: 'Join us for inspiring worship services every Sunday and Wednesday.',
      link: '/sunday-service',
      color: 'blue'
    },
    {
      image: '/images/freeindeed-service.jpg',
      title: 'Freeindeed Service',
      description: '24/7 prayer support and weekly prayer meetings for all needs.',
      link: '/freeindeed-service',
      color: 'red'
    },
    {
      image: '/images/deliverance-service.jpg',
      title: 'Deliverance Service',
      description: 'Deepen your faith through our various Bible study groups.',
      link: '/deliverance-service',
      color: 'green'
    },
    {
      image: '/images/upper-room.jpg',
      title: 'Upper Room Confrience',
      description: 'Connect with others in our community small groups.',
      link: '/confrience',
      color: 'purple'
    },
    {
      image: '/images/events.jpg',
      title: 'Events',
      description: 'Join our community events, retreats, and special services.',
      link: '/events',
      color: 'orange'
    },
    {
      image: '/images/evangelism.jpg',
      title: 'Evangelism',
      description: 'Come see our facilities and meet our welcoming community.',
      link: '/evangelism',
      color: 'teal'
    }
  ]

  const colorClasses = {
    blue: 'bg-blue-100',
    red: 'bg-red-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    orange: 'bg-orange-100',
    teal: 'bg-teal-100'
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
          {features.map((feature, index) => (
            <Link 
              key={index}
              href={feature.link}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="w-full h-48 rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={192}
                  className="object-cover w-full h-full"
                />
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
          ))}
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