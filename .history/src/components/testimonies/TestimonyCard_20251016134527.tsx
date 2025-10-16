'use client'

import { Calendar, User, Heart, Share2, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Testimony } from '@/data/testimonies'
import { useState } from 'react'
import Image from 'next/image'

interface TestimonyCardProps {
  testimony: Testimony
  compact?: boolean
}

const categoryStyles = {
  Healing: 'bg-green-100 text-green-800',
  Salvation: 'bg-blue-100 text-blue-800',
  Provision: 'bg-yellow-100 text-yellow-800',
  Deliverance: 'bg-purple-100 text-purple-800',
  Restoration: 'bg-orange-100 text-orange-800'
}

export default function TestimonyCard({ testimony, compact = false }: TestimonyCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(testimony.likes)

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
      title: testimony.title,
      text: testimony.excerpt,
      url: `${window.location.origin}/testimonies/${testimony.id}`
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

  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {testimony.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{testimony.name}</h3>
              {testimony.verified && (
                <CheckCircle size={14} className="text-blue-500 flex-shrink-0" />
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{testimony.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryStyles[testimony.category]}`}>
                {testimony.category}
              </span>
              
              <Link 
                href={`/testimonies/${testimony.id}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
              >
                Read story
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryStyles[testimony.category]}`}>
            {testimony.category}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            {new Date(testimony.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {testimony.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {testimony.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <User size={14} className="mr-1" />
            <span className="font-medium">{testimony.name}</span>
            {testimony.verified && (
              <CheckCircle size={12} className="text-blue-500 ml-1" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Share2 size={14} />
            </button>

            <Link
              href={`/testimonies/${testimony.id}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}