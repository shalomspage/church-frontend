import Link from 'next/link'
import { NavItemsProps } from './types'

export default function NavItems({ 
  items, 
  isActivePath, 
  onItemClick, 
  isMobile = false 
}: NavItemsProps) {
  const baseClasses = "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors"
  const mobileClasses = "flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors"
  
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = isActivePath(item.path)
        const activeClasses = isActive 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
        
        return (
          <Link
            key={item.path}
            href={item.path}
            onClick={onItemClick}
            className={`${isMobile ? mobileClasses : baseClasses} ${activeClasses}`}
          >
            <Icon size={isMobile ? 20 : 16} className={isMobile ? '' : 'hidden lg:block'} />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </>
  )
}