'use client'

import { Calendar, User, Heart, Share2, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Testimony } from '@/data/testimonies'
import { useState } from 'react'
import Image from 'next/image'
import ShareModal from '@/components/shared/ShareModal'

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
  const [imageError, setImageError] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

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
    
    const shareUrl = `${window.location.origin}/testimonies/${testimony.id}`
    const shareData = {
      title: testimony.title,
      text: testimony.excerpt,
      url: shareUrl
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      setShowShareModal(true)
    }
  }

  // Fallback to initials if image fails to load
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  if (compact) {
    return (
      <>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                {!imageError ? (
                  <Image
                    src={testimony.image}
                    alt={testimony.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(testimony.name)}
                  </div>
                )}
                {testimony.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                    <CheckCircle size={12} className="text-white" fill="currentColor" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{testimony.name}</h3>
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

        {/* Share Modal for Compact View */}
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title="Testimony"
          shareText="Copy the link to share this testimony:"
          url={`${window.location.origin}/testimonies/${testimony.id}`}
        />
      </>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <div className="p-6">
          {/* Header with image and details */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                {!imageError ? (
                  <Image
                    src={testimony.image}
                    alt={testimony.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-semibold text-lg">
                    {getInitials(testimony.name)}
                  </div>
                )}
                {testimony.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                    <CheckCircle size={14} className="text-white" fill="currentColor" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{testimony.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{testimony.role}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  {new Date(testimony.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
              
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryStyles[testimony.category]}`}>
                {testimony.category}
              </span>
            </div>
          </div>

          {/* Testimony Content */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {testimony.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {testimony.excerpt}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                }`}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                <span>{likeCount}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Share2 size={16} />
              </button>
            </div>

            <Link
              href={`/testimonies/${testimony.id}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>

      {/* Share Modal for Regular View */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Testimony"
        shareText="Copy the link to share this testimony:"
        url={`${window.location.origin}/testimonies/${testimony.id}`}
      />
    </>
  )
}