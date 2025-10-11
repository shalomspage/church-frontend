'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Bell, 
  User, 
  Users, 
  X,
  Church,
  LogOut
} from 'lucide-react'

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface SidebarItem {
  path: string
  label: string
  icon: React.ComponentType<{ size?: number }>
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  // Only dashboard-specific items
  const sidebarItems: SidebarItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/notifications', label: 'Notifications', icon: Bell },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
    { path: '/dashboard/workers', label: 'Staff', icon: Users },
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50
        w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Church className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ChurchApp</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => onClose()}
                className={`
                  flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                  ${active 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer with back to main site */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50 space-y-3">
          {/* Back to main site */}
          <Link 
            href="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:text-gray-900 transition-colors"
          >
            <Church size={20} />
            <span>Back to Main Site</span>
          </Link>

          {/* Logout button */}
          <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}