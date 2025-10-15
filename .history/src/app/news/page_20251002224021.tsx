import Link from 'next/link'
import { Newspaper, Calendar, User, ArrowRight } from 'lucide-react'

export default function NewsPage() {
  const featuredPosts = [
    {
      id: 1,
      title: 'Sunday Sermon: The Power of Faith',
      excerpt: 'Join us this Sunday as we explore how faith can move mountains in our daily lives.',
      date: '2024-01-15',
      author: 'Pastor John',
      category: 'Sermon'
    },
    {
      id: 2,
      title: 'Church Picnic Announcement',
      excerpt: 'Annual church picnic coming up next month. Save the date for food, games, and fellowship!',
      date: '2024-01-12',
      author: 'Sister Mary',
      category: 'Announcement'
    },
    {
      id: 3,
      title: 'Youth Group Winter Retreat',
      excerpt: 'Our youth group winter retreat registration is now open. Limited spots available!',
      date: '2024-01-10',
      author: 'Brother David',
      category: 'Event'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Church News & Updates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest announcements, sermons, and events from our church community.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </div>
                    <Link 
                      href="#" 
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read more <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
          <Newspaper size={48} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            News System Coming Soon
          </h3>
          <p className="text-blue-700 mb-4">
            We&apos;re working on a complete news and blog system where you&apos;ll be able to read sermons, 
            announcements, and ministry updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Subscribe to Updates
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Suggest a Topic
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
