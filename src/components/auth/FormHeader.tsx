import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface FormHeaderProps {
  title: string
  subtitle: string
  backHref: string
  backText: string
}

export default function FormHeader({ title, subtitle, backHref, backText }: FormHeaderProps) {
  return (
    <div className="text-center mb-8">
      <Link 
        href={backHref} 
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft size={16} className="mr-1" />
        {backText}
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <p className="text-gray-600">
        {subtitle}
      </p>
    </div>
  )
}