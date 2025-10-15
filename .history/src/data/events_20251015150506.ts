export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  attendees: number
  type: 'Service' | 'Study' | 'Social' | 'Outreach' | 'Prayer'
  image?: string
  featured: boolean // For homepage
  duration?: string
  contactPerson?: string
}

export const events: Event[] = [
  {
    id: 'sunday-worship-jan21',
    title: 'Sunday Worship Service',
    date: '2024-01-21',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly worship service with communion and special guest choir performance.',
    attendees: 120,
    type: 'Service',
    image: '/images/events/sunday-service.jpg',
    featured: true,
    duration: '2 hours'
  },
  {
    id: 'bible-study-romans',
    title: 'Bible Study - Book of Romans',
    date: '2024-01-24',
    time: '7:00 PM',
    location: 'Fellowship Hall',
    description: 'Weekly Bible study focusing on the Book of Romans. All ages welcome.',
    attendees: 35,
    type: 'Study',
    image: '/images/events/bible-study.jpg',
    featured: true,
    duration: '1.5 hours'
  },
  {
    id: 'youth-game-night',
    title: 'Youth Group Game Night',
    date: '2024-01-26',
    time: '6:30 PM',
    location: 'Youth Center',
    description: 'Fun games, food, and fellowship for our youth. Bring your friends!',
    attendees: 45,
    type: 'Social',
    image: '/images/events/youth-night.jpg',
    featured: true,
    duration: '3 hours'
  },
  {
    id: 'prayer-meeting',
    title: 'Weekly Prayer Meeting',
    date: '2024-01-25',
    time: '6:00 PM',
    location: 'Prayer Room',
    description: 'Come together for corporate prayer and intercession for our church and community.',
    attendees: 25,
    type: 'Prayer',
    image: '/images/events/prayer-meeting.jpg',
    featured: true,
    duration: '1 hour'
  },
  // More upcoming events
  {
    id: 'mens-breakfast',
    title: 'Men\'s Fellowship Breakfast',
    date: '2024-01-27',
    time: '8:00 AM',
    location: 'Fellowship Hall',
    description: 'Monthly men\'s breakfast with guest speaker on Christian leadership.',
    attendees: 40,
    type: 'Social',
    image: '/images/events/mens-breakfast.jpg',
    featured: false,
    duration: '2 hours'
  },
  {
    id: 'womens-retreat',
    title: 'Women\'s Ministry Retreat',
    date: '2024-02-02',
    time: '9:00 AM',
    location: 'Church Campground',
    description: 'Annual women\'s retreat focusing on spiritual renewal and fellowship.',
    attendees: 80,
    type: 'Social',
    image: '/images/events/womens-retreat.jpg',
    featured: false,
    duration: '2 days'
  },
  {
    id: 'community-outreach',
    title: 'Community Food Drive',
    date: '2024-01-28',
    time: '1:00 PM',
    location: 'Church Parking Lot',
    description: 'Help us serve our community by organizing and distributing food packages.',
    attendees: 60,
    type: 'Outreach',
    image: '/images/events/food-drive.jpg',
    featured: false,
    duration: '4 hours'
  },
  {
    id: 'wednesday-service',
    title: 'Wednesday Healing Service',
    date: '2024-01-31',
    time: '7:00 PM',
    location: 'Main Sanctuary',
    description: 'Mid-week service focusing on healing, testimony, and prayer for needs.',
    attendees: 75,
    type: 'Service',
    image: '/images/events/healing-service.jpg',
    featured: false,
    duration: '1.5 hours'
  },
  {
    id: 'marriage-seminar',
    title: 'Marriage Enrichment Seminar',
    date: '2024-02-10',
    time: '9:00 AM',
    location: 'Conference Center',
    description: 'One-day seminar for couples to strengthen their marriage through biblical principles.',
    attendees: 50,
    type: 'Study',
    image: '/images/events/marriage-seminar.jpg',
    featured: false,
    duration: '6 hours'
  },
  {
    id: 'youth-outreach',
    title: 'Youth Community Outreach',
    date: '2024-02-03',
    time: '2:00 PM',
    location: 'Local Community Center',
    description: 'Youth-led outreach program to serve and connect with our local community.',
    attendees: 30,
    type: 'Outreach',
    image: '/images/events/youth-outreach.jpg',
    featured: false,
    duration: '3 hours'
  },
  {
    id: 'sunday-worship-jan28',
    title: 'Sunday Worship Service',
    date: '2024-01-28',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for worship and a special message from our pastor.',
    attendees: 120,
    type: 'Service',
    image: '/images/events/sunday-service.jpg',
    featured: false,
    duration: '2 hours'
  },
  {
    id: 'financial-peace',
    title: 'Financial Peace University',
    date: '2024-02-05',
    time: '6:30 PM',
    location: 'Conference Room',
    description: 'Learn biblical principles for managing money and achieving financial freedom.',
    attendees: 25,
    type: 'Study',
    image: '/images/events/financial-peace.jpg',
    featured: false,
    duration: '2 hours'
  }
]

// Get only upcoming events (future dates)
export const upcomingEvents = events
  .filter(event => new Date(event.date) >= new Date())
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

// Get featured events for homepage (only upcoming ones)
export const featuredEvents = upcomingEvents.filter(event => event.featured)