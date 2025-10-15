'use client'

import { Calendar, User, ArrowRight, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import { NewsPost } from '@/data/news'
import { useState } from 'react'

interface NewsCardProps {
  post: NewsPost
}

const categoryStyles = {
  Sermon: 'bg-blue-100 text-blue-800',
  Announcement: 'bg-green-100 text-green-800',
  Event: 'bg-purple-100 text-purple-800',
  Prayer: 'bg-orange-100 text-orange-800',
  Testimony: 'bg-red-100 text-red-800'
}

export default function NewsCard({ post }: NewsCardProps) {
  const [isLiked, setIsLiked] = useState(post.liked || false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isLiked) {
      setLikeCount(prev => prev - 1)
    } else {
      setLikeCount(prev => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: `${window.location.origin}/news/${post.id}`
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryStyles[post.category]}`}>
            {post.category}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Sermon specific info */}
        {post.category === 'Sermon' && (
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            {post.duration && (
              <span>Duration: {post.duration}</span>
            )}
            {post.bibleVerse && (
              <span>Text: {post.bibleVerse}</span>
            )}
          </div>
        )}

        {/* Prayer Points Preview */}
        {post.prayerPoints.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Prayer Points:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {post.prayerPoints.slice(0, 2).map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="line-clamp-2">{point}</span>
                </li>
              ))}
              {post.prayerPoints.length > 2 && (
                <li className="text-blue-600 text-sm">
                  +{post.prayerPoints.length - 2} more prayer points
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <User size={14} className="mr-1" />
            {post.author}
          </div>

          <div className="flex items-center gap-2">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Share2 size={16} />
            </button>

            <Link
              href={`/news/${post.id}`}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Read more <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}