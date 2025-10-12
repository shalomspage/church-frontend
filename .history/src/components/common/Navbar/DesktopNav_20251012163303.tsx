import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, LayoutDashboard, User, LogOut } from 'lucide-react'
import NavItems from './NavItems'
import { NavItem, AuthSectionProps } from './types'

interface DesktopNavProps extends AuthSectionProps {
  navItems: NavItem[]
  isActivePath: (path: string) => boolean
}

export default function DesktopNav({ 
  navItems, 
  isActivePath, 
  isAuthenticated, 
  user, 
  onLogout 
}: DesktopNavProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getUserInitials = () => {
    if (!user) return 'U'
    const { firstName, lastName, username } = user
    
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`
    } else if (firstName) {
      return firstName[0]
    } else if (username) {
      return username[0]
    }
    
    return 'U'
  }

  const getUserDisplayName = () => {
    if (!user) return 'User'
    
    const { firstName, lastName, username } = user
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    } else if (firstName) {
      return firstName
    } else if (username) {
      return username
    }
    
    return 'User'
  }

  return (
    <div className="hidden md:flex items-center space-x-8">
      <div className="flex items-center space-x-6">
        <NavItems 
          items={navItems} 
          isActivePath={isActivePath} 
        />
      </div>

      <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            {/* User Avatar/Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {getUserInitials()}
              </div>
              <span className="hidden lg:inline">{getUserDisplayName()}</span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                {/* Dashboard Link */}
                <Link
                  href="/dashboard"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>

                {/* Profile Link */}
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(false)
                    onLogout()
                  }}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          // Login/Signup buttons for non-authenticated users
          <div className="flex items-center space-x-2">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}