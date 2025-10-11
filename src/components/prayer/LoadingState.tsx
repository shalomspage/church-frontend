import { Heart } from 'lucide-react'

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
        <div>Loading prayer suggestions...</div>
      </div>
    </div>
  )
}