import React from 'react'
import { Heart, Users, Star, Target, Church, Calendar } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Church size={64} className="mx-auto mb-6 text-blue-200" />
          <h1 className="text-2xl lg:text-4xl font-bold mb-4">About Our Church</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Welcome to a community where faith grows, lives are transformed, and God's love is shared with everyone.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in faith and built on the foundation of God's Word, our church has been a beacon of hope 
                  and transformation in our community for over two decades. What started as a small gathering of 
                  believers has grown into a vibrant family united by God's love.
                </p>
                <p>
                  Through seasons of change and growth, our commitment remains the same: to share the life-changing 
                  message of Jesus Christ and to be a place where everyone can experience God's grace, find purpose, 
                  and build meaningful relationships.
                </p>
                <p>
                  Every Sunday, we gather not just as a congregation, but as a family—ready to worship, learn, 
                  and support one another in our spiritual journeys.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <Calendar size={48} className="text-blue-600 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700">Serving our community since 2005</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <Target size={48} className="text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To lead people into a growing relationship with Jesus Christ by creating environments 
                where individuals are encouraged and equipped to pursue intimacy with God, community 
                with insiders, and influence with outsiders.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <Star size={48} className="text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a multicultural community of believers transforming our city through the power 
                of the Gospel, known for our love, generosity, and commitment to making disciples 
                who make disciples.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Heart size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do as a church family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Biblical Truth",
                description: "We are committed to teaching and living by the truth of God's Word.",
                icon: "📖"
              },
              {
                title: "Authentic Community",
                description: "We believe life change happens best in the context of relationships.",
                icon: "👥"
              },
              {
                title: "Heartfelt Worship",
                description: "We express our love for God through passionate and authentic worship.",
                icon: "🎵"
              },
              {
                title: "Intentional Discipleship",
                description: "We are committed to helping everyone grow in their relationship with Jesus.",
                icon: "🌱"
              },
              {
                title: "Generous Service",
                description: "We serve our church, community, and world with open hands and hearts.",
                icon: "🤝"
              },
              {
                title: "Spiritual Growth",
                description: "We provide pathways for continuous spiritual development and maturity.",
                icon: "🚀"
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-3">{value.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users size={48} className="text-blue-200 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">What to Expect</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your first visit to our church should be refreshing and welcoming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Friendly Atmosphere",
                description: "From the moment you arrive, you'll be welcomed by our friendly greeters and made to feel at home."
              },
              {
                title: "Engaging Worship",
                description: "Our services feature contemporary worship music and relevant, biblical teaching that applies to everyday life."
              },
              {
                title: "Casual Dress",
                description: "Come as you are! Most people dress casually, so wear whatever makes you comfortable."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{index + 1}</span>
                </div>
                <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                <p className="text-blue-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Visit?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We'd love to welcome you to our church family. Join us this Sunday and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold text-lg transition-colors">
              Plan Your Visit
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-2 rounded-lg font-semibold text-lg transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage