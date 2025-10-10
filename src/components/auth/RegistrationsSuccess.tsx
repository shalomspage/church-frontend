import { CheckCircle, Mail, ArrowLeft, UserPlus } from 'lucide-react'
import Button from '@/components/ui/Button'

interface RegistrationSuccessProps {
  email: string
  onBackToLogin: () => void
  onCreateAnother: () => void
}

export default function RegistrationSuccess({ 
  email, 
  onBackToLogin, 
  onCreateAnother 
}: RegistrationSuccessProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Account Created Successfully!
        </h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <Mail className="w-5 h-5 text-blue-600 mr-2" />
            <p className="text-blue-800 font-medium">Verification Email Sent</p>
          </div>
          <p className="text-blue-700 text-sm">
            We've sent a verification link to <strong>{email}</strong>. 
            Please check your inbox and verify your email address.
          </p>
        </div>

        <p className="text-gray-600 mb-2">
          Your account has been created successfully. You can now sign in to access your dashboard.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          If you don't see the email, please check your spam folder.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onBackToLogin}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>

          <button
            onClick={onCreateAnother} 
            className="w-full py-2 px-4 text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Create Another Account
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            What's Next?
          </h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Verify your email address</li>
            <li>• Complete your profile</li>
            <li>• Explore church features</li>
            <li>• Join prayer groups</li>
          </ul>
        </div>
      </div>
    </div>
  )
}