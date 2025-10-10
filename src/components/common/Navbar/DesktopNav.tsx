import Link from 'next/link'
import { Church } from 'lucide-react'
import NavItems from './NavItems'
import AuthSection from './AuthSection'
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
  return (
    <div className="hidden md:flex items-center space-x-8">
      <div className="flex items-center space-x-6">
        <NavItems 
          items={navItems} 
          isActivePath={isActivePath} 
        />
      </div>

      <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
        <AuthSection 
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={onLogout}
        />
      </div>
    </div>
  )
}