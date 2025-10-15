import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to Our Church Family
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are a vibrant community of believers dedicated to spreading God&apos;s love 
              and serving our neighbors. Founded on the principles of faith, hope, and 
              charity, we welcome everyone to join us in worship and fellowship.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our mission is to create a welcoming environment where individuals can 
              grow in their relationship with Christ, develop meaningful connections, 
              and make a positive impact in our community.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Contemporary & Traditional Worship Services</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Youth & Children&apos;s Ministries</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Community Outreach Programs</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/about"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Learn More About Us
              </Link>
              <Link 
                href="/visit"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Plan Your Visit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 rounded-xl overflow-hidden group">
                <Image
                  src="/images/homepage/worship-service.jpg"
                  alt="Sunday worship service at our church"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">Sunday Service</span>
                </div>
              </div>
              <div className="relative h-32 rounded-xl overflow-hidden group">
                <Image
                  src="/images/homepage/evangelism.jpg"
                  alt="Church community fellowship and connection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">Evangelism</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-32 rounded-xl overflow-hidden group">
                <Image
                  src="/images/homepage/prayer-group.jpg"
                  alt="Prayer group gathering and intercession"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">Free Indeed Service</span>
                </div>
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden group">
                <Image
                  src="/images/homepage/deliverance.jpg"
                  alt="Deliverance Service"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">Deliverance Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
