import Link from 'next/link'

interface FormFooterProps {
  question: string
  linkText: string
  linkHref: string
  additionalLinks?: {
    text: string
    href: string
  }[]
}

export default function FormFooter({ 
  question, 
  linkText, 
  linkHref, 
  additionalLinks = [] 
}: FormFooterProps) {
  return (
    <div className="mt-6 text-center space-y-3">
      {additionalLinks.map((link, index) => (
        <div key={index}>
          <Link
            href={link.href}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            {link.text}
          </Link>
        </div>
      ))}
      <div className="text-sm text-gray-600">
        {question}{' '}
        <Link
          href={linkHref}
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          {linkText}
        </Link>
      </div>
    </div>
  )
}