import Link from 'next/link'
import Image from 'next/image'
import { Ministry } from '@/data/ministries'

interface MinistryCardProps {
  ministry: Ministry
  size?: 'small' | 'large'
}

const colorClasses = {
  blue: 'bg-blue-100',
  red: 'bg-red-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100',
  teal: 'bg-teal-100'
}

export default function MinistryCard({ ministry, size = 'large' }: MinistryCardProps) {
  const imageSize = size === 'small' ? { width: 48, height: 48 } : { width: 400, height: 192 }
  
  return (
    <Link 
      href={ministry.link}
      className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 block"
    >
      <div className={`${size === 'small' ? 'w-12 h-12' : 'w-full h-48'} rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
        <Image 
          src={ministry.image}
          alt={ministry.title}
          width={imageSize.width}
          height={imageSize.height}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
        {ministry.title}
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed text-lg">
        {ministry.description}
      </p>
      <div className="text-blue-600 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
        Learn more
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}