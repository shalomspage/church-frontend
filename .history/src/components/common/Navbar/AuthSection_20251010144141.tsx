import Link from 'next/link'
import { User, LogOut, UserPlus, LogIn } from 'lucide-react'
import { AuthSectionProps } from './types'

export default function AuthSection({ 
  isAuthenticated, 
  user, 
  onLogout, 
  onCloseMenu, 
  isMobile = false 
}: AuthSectionProps) {
  const getUserDisplayName = () => {
    if (!user) return 'User'
    const { firstName, lastName, username } = user
    if (firstName && lastName) return `${firstName} ${lastName}`
    if (firstName) return firstName
    if (username) return username
    return 'User'
  }

  if (isAuthenticated) {
    return (
      <>
        <div className={`flex items-center ${isMobile ? 'space-x-3 px-3 py-2' : 'space-x-2'}`}>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={16} className="text-blue-600" />
          </div>
          <span className={`font-medium text-gray-700 ${isMobile ? 'text-base' : 'text-sm'}`}>
            {getUserDisplayName()}
          </span>
        </div>
        <button
          onClick={() => {
            onLogout()
            onCloseMenu?.()
          }}
          className={`flex items-center ${isMobile ? 'space-x-3 w-full px-3 py-2 text-base' : 'space-x-1 px-3 py-2 text-sm'} text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors`}
        >
          <LogOut size={isMobile ? 20 : 16} className={isMobile ? '' : 'hidden lg:block'} />
          <span>Logout</span>
        </button>
      </>
    )
  }

  // Auth buttons for non-authenticated users
  return (
    <>
      <Link
        href="/auth/login"
        onClick={onCloseMenu}
        className={`flex items-center ${isMobile ? 'space-x-3 px-3 py-2 text-base' : 'space-x-1 px-3 py-2 text-sm'} font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors`}
      >
        <LogIn size={isMobile ? 20 : 16} className={isMobile ? '' : 'hidden lg:block'} />
        <span>Sign In</span>
      </Link>
      <Link
        href="/auth/register"
        onClick={onCloseMenu}
        className={`flex items-center ${isMobile ? 'space-x-3 px-3 py-2 text-base' : 'space-x-1 px-3 py-2 text-sm'} font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors`}
      >
        <UserPlus size={isMobile ? 20 : 16} className={isMobile ? '' : 'hidden lg:block'} />
        <span>Sign Up</span>
      </Link>
    </>
  )
}