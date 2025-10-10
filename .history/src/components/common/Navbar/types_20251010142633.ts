import { LucideIcon } from 'lucide-react'

export interface NavItem {
  path: string
  label: string
  icon: LucideIcon
}

export interface AuthSectionProps {
  isAuthenticated: boolean
  user: any // You can use your User type here
  onLogout: () => void
  onCloseMenu?: () => void
  isMobile?: boolean
}

export interface NavItemsProps {
  items: NavItem[]
  isActivePath: (path: string) => boolean
  onItemClick?: () => void
  isMobile?: boolean
}