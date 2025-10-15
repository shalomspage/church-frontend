'use client'

import { notFound } from 'next/navigation'
import { newsPosts } from '@/data/news'
import { Calendar, User, ArrowLeft, Heart, Share2, Play, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function NewsDetailPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [post, setPost] = useState<(typeof newsPosts)[0] | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
      
      const foundPost = newsPosts.find(p => p.id === resolved.id)
      setPost(foundPost || null)
      
      if (foundPost) {
        setIsLiked(foundPost.liked || false)
        setLikeCount(foundPost.likes)
      }
    }
    resolveParams()
  }, [params])

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading post...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1)
    } else {
      setLikeCount(prev => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(shareData.url)
      alert('Link copied to clipboard!')
    }
  }

  const categoryStyles = {
    Sermon: 'bg-blue-100 text-blue-800',
    Announcement: 'bg-green-100 text-green-800',
    Event: 'bg-purple-100 text-purple-800',
    Prayer: 'bg-orange-100 text-orange-800',
    Testimony: 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/news"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to All News
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${categoryStyles[post.category]}`}>
                {post.category}
              </span>
              <div className="flex items-center text-lg text-gray-600 font-semibold">
                <Calendar size={20} className="mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-lg text-gray-600">
                <User size={20} className="mr-2" />
                By {post.author}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-lg transition-colors ${
                    isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                  <span className="font-semibold">{likeCount}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-lg text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Share2 size={24} />
                  <span className="font-semibold">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sermon Specific Info */}
          {post.category === 'Sermon' && (
            <div className="bg-blue-50 border-b border-blue-200 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-sm text-blue-800">
                  {post.duration && (
                    <div className="flex items-center">
                      <Play size={16} className="mr-2" />
                      Duration: {post.duration}
                    </div>
                  )}
                  {post.bibleVerse && (
                    <div className="flex items-center">
                      <BookOpen size={16} className="mr-2" />
                      Text: {post.bibleVerse}
                    </div>
                  )}
                </div>
                {post.sermonLink && (
                  <a
                    href={post.sermonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Play size={20} className="mr-2" />
                    Watch Sermon
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="text-gray-700 leading-relaxed">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Prayer Points */}
            {post.prayerPoints.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen size={24} className="mr-3 text-blue-600" />
                  Prayer Points
                </h3>
                <ul className="space-y-3">
                  {post.prayerPoints.map((point, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-blue-500 font-semibold mr-3 mt-1">{index + 1}.</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleLike}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center ${
                  isLiked
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart size={24} className="mr-3" fill={isLiked ? 'currentColor' : 'none'} />
                {isLiked ? 'Liked' : 'Like'} ({likeCount})
              </button>
              
              <button
                onClick={handleShare}
                className="flex-1 border border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center"
              >
                <Share2 size={24} className="mr-3" />
                Share Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}