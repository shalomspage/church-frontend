'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'
import type { RootState } from '../../../redux/store'
import { Church, Newspaper, Heart, Calendar, DollarSign } from 'lucide-react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import { NavItem } from './types'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
    setIsMenuOpen(false)
  }

  // Only public navigation items - no dashboard/auth items
  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: Church },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/prayer', label: 'Prayer', icon: Heart },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/donations', label: 'Give', icon: DollarSign },
  ]

  const isActivePath = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center space-x-2">
            <Church className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 md:hidden lg:inline">
              ChurchApp
            </span>
          </Link> */}

          <DesktopNav
            navItems={navItems}
            isActivePath={isActivePath}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />

          <MobileNav
            navItems={navItems}
            isActivePath={isActivePath}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>
    </nav>
  )
}