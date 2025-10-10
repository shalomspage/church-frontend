import { X, Menu } from 'lucide-react'
import NavItems from './NavItems'
import AuthSection from './AuthSection'
import { NavItem, AuthSectionProps } from './types'

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
      <button
        onClick={onToggleMenu}
        className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 py-4">
          <div className="space-y-2">
            <NavItems 
              items={navItems} 
              isActivePath={isActivePath}
              onItemClick={() => onToggleMenu()}
              isMobile={true}
            />
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
            <AuthSection 
              isAuthenticated={isAuthenticated}
              user={user}
              onLogout={onLogout}
              onCloseMenu={() => onToggleMenu()}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}