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
      <div className="min-h-screen bg-gray-50 py-8">
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/testimonies"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to All Testimonies
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
           <div className="p-8 border-b border-gray-200">
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
      <div className="flex items-center justify-between mb-2">
        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${categoryStyles[testimony.category]}`}>
          {testimony.category} Testimony
        </span>
        <div className="flex items-center text-lg text-gray-600 font-semibold">
          <Calendar size={20} className="mr-2" />
          {new Date(testimony.date).toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        {testimony.title}
      </h1>
      
      <div className="flex items-center text-lg text-gray-600">
        <User size={20} className="mr-2" />
        <span className="font-semibold">{testimony.name}</span>
        {testimony.verified && (
          <CheckCircle size={20} className="text-blue-500 ml-2" />
        )}
        <span className="text-gray-500 ml-2">• {testimony.role}</span>
      </div>
    </div>
  </div>

  {/* Like and Share Buttons */}
  <div className="flex items-center gap-4 mt-4">
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

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-xl text-gray-600 leading-relaxed mb-6 italic border-l-4 border-blue-500 pl-4">
                "{testimony.excerpt}"
              </div>
              
              <div className="text-gray-700 leading-relaxed space-y-4">
                {testimony.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-lg leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Verified Badge */}
            {testimony.verified && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle size={20} className="text-blue-600 mr-2" />
                  <span className="text-blue-800 font-semibold">
                    This testimony has been verified by our pastoral team
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleLike}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center ${
                  isLiked
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart size={24} className="mr-3" fill={isLiked ? 'currentColor' : 'none'} />
                {isLiked ? 'Liked' : 'Encourage'} ({likeCount})
              </button>
              
              <button
                onClick={handleShare}
                className="flex-1 border border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center"
              >
                <Share2 size={24} className="mr-3" />
                Share Testimony
              </button>
            </div>
          </div>
        </div>

        {/* More Testimonies CTA */}
        <div className="mt-8 text-center">
          <Link 
            href="/testimonies"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            <Star size={20} className="mr-2" fill="currentColor" />
            Read More Testimonies
          </Link>
        </div>
      </div>
    </div>
  )
}