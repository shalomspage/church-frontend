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
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="p-4 sm:p-6">
        {/* Header - Stacked on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${categoryStyles[post.category]} self-start`}>
            {post.category}
          </span>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Calendar size={12} className="mr-1" />
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Title - Adjusted for mobile */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt - Smaller on mobile */}
        <p className="text-lg text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Sermon specific info - Stacked on mobile */}
        {post.category === 'Sermon' && (
          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 text-xs sm:text-sm text-gray-500 mb-3">
            {post.duration && (
              <span className="bg-gray-50 px-2 py-1 rounded">Duration: {post.duration}</span>
            )}
            {post.bibleVerse && (
              <span className="bg-gray-50 px-2 py-1 rounded">Text: {post.bibleVerse}</span>
            )}
          </div>
        )}

        {/* Prayer Points Preview - Adjusted spacing */}
        {post.prayerPoints.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <h4 className="text-xl font-semibold text-gray-700 mb-1 sm:mb-2">Prayer Points:</h4>
            <ul className="text-md text-gray-600 space-y-1">
              {post.prayerPoints.slice(0, 2).map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2 flex-shrink-0 mt-0.5">•</span>
                  <span className="line-clamp-2 leading-relaxed">{point}</span>
                </li>
              ))}
              {post.prayerPoints.length > 2 && (
                <li className="text-blue-600 text-xs sm:text-sm">
                  +{post.prayerPoints.length - 2} more prayer points
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Footer - Stacked on mobile */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 sm:gap-0">
          {/* Author */}
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <User size={12} className="mr-1" />
            <span className="truncate">{post.author}</span>
          </div>

          {/* Actions - Better spacing for touch */}
          <div className="flex items-center justify-between xs:justify-end gap-3">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs sm:text-sm transition-colors min-h-[32px] px-2 ${
                isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              <span className="min-w-[20px] text-center">{likeCount}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center text-xs sm:text-sm text-gray-500 hover:text-blue-600 transition-colors min-h-[32px] px-2"
            >
              <Share2 size={14} />
            </button>

            {/* Read More - Better touch target */}
            <Link
              href={`/news/${post.id}`}
              className="inline-flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium min-h-[32px] px-2"
            >
              Read more 
              <ArrowRight size={12} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}