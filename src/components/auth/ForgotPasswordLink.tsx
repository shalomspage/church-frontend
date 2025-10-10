import Link from 'next/link'

export default function ForgotPasswordLink() {
  return (
    <div className="text-right">
      <Link
        href="/auth/forgot-password"
        className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
      >
        Forgot your password?
      </Link>
    </div>
  )
}