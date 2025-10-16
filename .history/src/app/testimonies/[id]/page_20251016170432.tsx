'use client'

import { notFound } from 'next/navigation'
import { testimonies } from '@/data/testimonies'
import { Calendar, User, ArrowLeft, Heart, Share2, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function TestimonyDetailPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [testimony, setTestimony] = useState<(typeof testimonies)[0] | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
      
      const foundTestimony = testimonies.find(t => t.id === resolved.id)
      setTestimony(foundTestimony || null)
      
      if (foundTestimony) {
        setIsLiked(false)
        setLikeCount(foundTestimony.likes)
      }
    }
    resolveParams()
  }, [params])

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading testimony...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!testimony) {
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
      title: testimony.title,
      text: testimony.excerpt,
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
    Healing: 'bg-green-100 text-green-800',
    Salvation: 'bg-blue-100 text-blue-800',
    Provision: 'bg-yellow-100 text-yellow-800',
    Deliverance: 'bg-purple-100 text-purple-800',
    Restoration: 'bg-orange-100 text-orange-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/testimonies"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to All Testimonies
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              {/* Category and Date */}
              <div className="flex flex-col gap-2 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryStyles[testimony.category]} self-start`}>
                  {testimony.category} Testimony
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  {new Date(testimony.date).toLocaleDateString('en-US', { 
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              {/* Profile and Title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                    <Image
                      src={testimony.image}
                      alt={testimony.name}
                      fill
                      className="object-cover"
                    />
                    {testimony.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                        <CheckCircle size={12} className="text-white" fill="currentColor" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                    {testimony.title}
                  </h1>
                  <div className="flex items-center text-sm text-gray-600">
                    <User size={14} className="mr-1" />
                    <span className="font-medium truncate">{testimony.name}</span>
                    {testimony.verified && (
                      <CheckCircle size={14} className="text-blue-500 ml-1" />
                    )}
                    <span className="text-gray-500 ml-1 truncate">• {testimony.role}</span>
                  </div>
                </div>
              </div>

              {/* Like and Share Buttons - Mobile */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                  <span className="font-semibold">{likeCount}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Share2 size={18} />
                  <span className="font-semibold">Share</span>
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block">
              <div className="flex items-start gap-6 mb-4">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                    <Image
                      src={testimony.image}
                      alt={testimony.name}
                      fill
                      className="object-cover"
                    />
                    {testimony.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                        <CheckCircle size={16} className="text-white" fill="currentColor" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Details */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${categoryStyles[testimony.category]} self-start lg:self-auto`}>
                      {testimony.category} Testimony
                    </span>
                    <div className="flex items-center text-base lg:text-lg text-gray-600 font-semibold">
                      <Calendar size={18} className="mr-2" />
                      {new Date(testimony.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3">
                    {testimony.title}
                  </h1>
                  
                  <div className="flex items-center text-base lg:text-lg text-gray-600">
                    <User size={18} className="mr-2" />
                    <span className="font-semibold">{testimony.name}</span>
                    {testimony.verified && (
                      <CheckCircle size={18} className="text-blue-500 ml-2" />
                    )}
                    <span className="text-gray-500 ml-2">• {testimony.role}</span>
                  </div>
                </div>
              </div>

              {/* Like and Share Buttons - Desktop */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-base transition-colors ${
                    isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  <span className="font-semibold">{likeCount}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-base text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Share2 size={20} />
                  <span className="font-semibold">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-6 sm:mb-8">
              <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6 italic border-l-2 sm:border-l-4 border-blue-500 pl-3 sm:pl-4">
                "{testimony.excerpt}"
              </div>
              
              <div className="text-gray-700 leading-relaxed space-y-3 sm:space-y-4">
                {testimony.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-base sm:text-lg leading-7 sm:leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Verified Badge */}
            {testimony.verified && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                  <span className="text-blue-800 font-semibold text-sm sm:text-base">
                    This testimony has been verified by our pastoral team
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                onClick={handleLike}
                className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-base transition-colors flex items-center justify-center ${
                  isLiked
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart size={20} className="mr-2 sm:mr-3" fill={isLiked ? 'currentColor' : 'none'} />
                {isLiked ? 'Liked' : 'Encourage'} ({likeCount})
              </button>
              
              <button
                onClick={handleShare}
                className="flex-1 border border-blue-600 text-blue-600 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-base hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center"
              >
                <Share2 size={20} className="mr-2 sm:mr-3" />
                Share Testimony
              </button>
            </div>
          </div>
        </div>

        {/* More Testimonies CTA */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link 
            href="/testimonies"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors"
          >
            <Star size={18} className="mr-2" fill="currentColor" />
            Read More Testimonies
          </Link>
        </div>
      </div>
    </div>
  )
}