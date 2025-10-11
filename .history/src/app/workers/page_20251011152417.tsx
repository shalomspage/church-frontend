'use client'

import { Users } from 'lucide-react'
import WorkersHeader from '@/components/workers/WorkersHeader'
import WorkersGrid from '@/components/workers/WorkersGrid'
import VolunteerCTA from '@/components/workers/VolunteerCTA'
import { Worker } from '@/types/workers'

export default function WorkersPage() {
  const workers: Worker[] = [
    {
      id: 1,
      name: 'Pastor John Smith',
      role: 'SENIOR_PASTOR',
      email: 'pastor.john@church.org',
      phone: '(555) 123-4567',
      department: 'Leadership',
      bio: 'Leading our church with vision and compassion for over 10 years.',
      avatar: '/images/workers/pastor-john.jpg'
    },
    {
      id: 2,
      name: 'Sister Mary Johnson',
      role: 'WORSHIP_LEADER', 
      email: 'mary.johnson@church.org',
      phone: '(555) 123-4568',
      department: 'Worship',
      bio: 'Passionate about leading God\'s people in authentic worship.',
      avatar: '/images/workers/mary-johnson.jpg'
    },
    {
      id: 3,
      name: 'Brother David Wilson',
      role: 'YOUTH_PASTOR',
      email: 'david.wilson@church.org', 
      phone: '(555) 123-4569',
      department: 'Youth',
      bio: 'Dedicated to mentoring the next generation of believers.',
      avatar: '/images/workers/david-wilson.jpg'
    },
    {
      id: 4,
      name: 'Deacon Robert Brown',
      role: 'DEACON',
      email: 'robert.brown@church.org',
      phone: '(555) 123-4570',
      department: 'Service',
      bio: 'Serving the congregation with humility and dedication.',
      avatar: '/images/workers/robert-brown.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WorkersHeader />
        <WorkersGrid workers={workers} />
        <VolunteerCTA />
      </div>
    </div>
  )
}