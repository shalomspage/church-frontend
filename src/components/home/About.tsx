import Link from 'next/link'

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
              <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">⛪</div>
                  <div className="text-lg font-semibold">Worship Services</div>
                  <div className="text-blue-100 text-sm mt-1">Sundays 10AM</div>
                </div>
              </div>
              <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <div className="text-center text-white">
                  <div className="text-3xl mb-1">👥</div>
                  <div className="text-md font-semibold">Community</div>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <div className="text-center text-white">
                  <div className="text-3xl mb-1">🙏</div>
                  <div className="text-md font-semibold">Prayer</div>
                </div>
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">📖</div>
                  <div className="text-lg font-semibold">Bible Study</div>
                  <div className="text-purple-100 text-sm mt-1">Wednesdays 7PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
