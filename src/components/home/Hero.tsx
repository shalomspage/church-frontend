import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/homepage/hero-bg.avif"
          alt="Our church community worshiping together"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Welcome to Our
          <span className="block text-blue-300">Church Family</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Connecting hearts, transforming lives through faith, love, and community. 
          Join us in worship and service.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/auth/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Join Our Community
          </Link>
          <Link 
            href="/events"
            className="border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            View Services
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-blue-400">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-300">500+</div>
            <div className="text-blue-100">Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-300">52</div>
            <div className="text-blue-100">Services Yearly</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-300">15</div>
            <div className="text-blue-100">Ministries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-300">24/7</div>
            <div className="text-blue-100">Prayer Support</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}
