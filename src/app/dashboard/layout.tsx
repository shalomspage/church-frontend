'use client'

import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { useState } from 'react'


interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header with hamburger menu */}
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            <div className="w-6"></div> {/* Spacer for balance */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}