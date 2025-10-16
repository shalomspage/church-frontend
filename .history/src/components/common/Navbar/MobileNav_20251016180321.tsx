import { X, Menu, LayoutDashboard, User } from 'lucide-react'
import NavItems from './NavItems'
import AuthSection from './AuthSection'
import { NavItem, AuthSectionProps } from './types'
import Link from 'next/link'

interface MobileNavProps extends AuthSectionProps {
  navItems: NavItem[]
  isActivePath: (path: string) => boolean
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export default function MobileNav({
  navItems,
  isActivePath,
  isAuthenticated,
  user,
  onLogout,
  isMenuOpen,
  onToggleMenu
}: MobileNavProps) {
  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={onToggleMenu}
        className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
            onClick={onToggleMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white/10 shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Menu</span>
                <button
                  onClick={onToggleMenu}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-2">
                  <NavItems 
                    items={navItems} 
                    isActivePath={isActivePath}
                    onItemClick={onToggleMenu}
                    isMobile={true}
                  />
                  
                  {/* Dashboard Link for Mobile (only when authenticated) */}
                  {isAuthenticated && (
                    <Link
                      href="/dashboard"
                      onClick={onToggleMenu}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard size={20} />
                      <span>Dashboard</span>
                    </Link>
                  )}
                </div>

                {/* Auth Section */}
                <div className="border-t border-gray-200 mt-4 pt-4 px-4">
                  <AuthSection 
                    isAuthenticated={isAuthenticated}
                    user={user}
                    onLogout={onLogout}
                    onCloseMenu={onToggleMenu}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}