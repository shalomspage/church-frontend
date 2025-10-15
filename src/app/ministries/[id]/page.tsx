import { notFound } from 'next/navigation'
import { ministries } from '@/data/ministries'
import Image from 'next/image'

interface PageProps {
  params: {
    id: string
  }
}

export default function MinistryDetailPage({ params }: PageProps) {
  const ministry = ministries.find(m => m.id === params.id)

  if (!ministry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={ministry.image}
            alt={ministry.title}
            fill
            className="object-cover"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {ministry.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {ministry.description}
        </p>
        
        <div className="prose prose-lg max-w-none">
          {/* Add detailed content for each ministry here */}
          <p>More details about this ministry coming soon...</p>
        </div>
      </div>
    </div>
  )
}

// Generate static paths for all ministries
export async function generateStaticParams() {
  return ministries.map((ministry) => ({
    id: ministry.id,
  }))
}