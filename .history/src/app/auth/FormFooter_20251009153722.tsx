import Link from 'next/link'

interface FormFooterProps {
  question: string
  linkText: string
  linkHref: string
}

export default function FormFooter({ question, linkText, linkHref }: FormFooterProps) {
  return (
    <div className="mt-6 text-center">
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