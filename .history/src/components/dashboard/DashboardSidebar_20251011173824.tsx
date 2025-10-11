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
  Newspaper,
  Heart,
  Calendar,
  DollarSign
} from 'lucide-react'

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface SidebarItem {
  path: string
  label: string
  icon: React.ComponentType<{ size?: number }>
  isAdmin?: boolean
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  const sidebarItems: SidebarItem[] = [
    // Dashboard items
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/notifications', label: 'Notifications', icon: Bell },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
    { path: '/dashboard/staff', label: 'Staff', icon: Users },
    
    // Main site navigation (optional - for quick access)
    { path: '/', label: 'Home', icon: Church },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/prayer', label: 'Prayer', icon: Heart },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/donations', label: 'Give', icon: DollarSign },
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

        {/* User info (optional) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">User Name</p>
              <p className="text-xs text-gray-500 truncate">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}