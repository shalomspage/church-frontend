import NewsCard from '@/components/news/NewsCard'
import { newsPosts, featuredPosts } from '@/data/news'
import { Newspaper, Calendar, Users } from 'lucide-react'

export default function NewsPage() {
  const allPosts = newsPosts

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Church News & Updates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest sermons, announcements, prayer points, and testimonies from our church community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <Newspaper className="text-blue-600 mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-gray-900">{allPosts.length}</div>
            <div className="text-gray-600">Total Posts</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <Calendar className="text-green-600 mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-gray-900">
              {allPosts.filter(post => post.category === 'Sermon').length}
            </div>
            <div className="text-gray-600">Sermons</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <Users className="text-purple-600 mx-auto mb-3" size={32} />
            <div className="text-2xl font-bold text-gray-900">
              {allPosts.reduce((total, post) => total + post.likes, 0)}
            </div>
            <div className="text-gray-600">Total Likes</div>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {allPosts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <Newspaper size={48} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            Stay Connected
          </h3>
          <p className="text-blue-700 mb-4 max-w-2xl mx-auto">
            Never miss an update! Subscribe to our newsletter to receive sermons, prayer points, 
            and church announcements directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}