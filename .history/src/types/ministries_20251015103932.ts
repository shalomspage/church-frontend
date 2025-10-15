export interface Ministry {
  id: string
  image: string
  title: string
  description: string
  link: string
  color: string
  featured: boolean // To mark which ones show on homepage
}

export const ministries: Ministry[] = [
  {
    id: 'sunday-services',
    image: '/images/sunday-service.jpg',
    title: 'Sunday Services',
    description: 'Join us for inspiring worship services every Sunday and Wednesday.',
    link: '/ministries/sunday-services',
    color: 'blue',
    featured: true
  },
  {
    id: 'freeindeed-service',
    image: '/images/freeindeed-service.jpg',
    title: 'Freeindeed Service',
    description: '24/7 prayer support and weekly prayer meetings for all needs.',
    link: '/ministries/freeindeed-service',
    color: 'red',
    featured: true
  },
  {
    id: 'deliverance-service',
    image: '/images/deliverance-service.jpg',
    title: 'Deliverance Service',
    description: 'Deepen your faith through our various Bible study groups.',
    link: '/ministries/deliverance-service',
    color: 'green',
    featured: true
  },
  {
    id: 'upper-room',
    image: '/images/upper-room.jpg',
    title: 'Upper Room Confrience',
    description: 'Connect with others in our community small groups.',
    link: '/ministries/upper-room',
    color: 'purple',
    featured: true
  },
  {
    id: 'women-blast',
    image: '/images/women-blast.jpg',
    title: 'Women Blast',
    description: 'Join our community events, retreats, and special services.',
    link: '/ministries/women-blast',
    color: 'orange',
    featured: true
  },
  {
    id: 'evangelism',
    image: '/images/evangelism.jpg',
    title: 'Evangelism',
    description: 'Come see our facilities and meet our welcoming community.',
    link: '/ministries/evangelism',
    color: 'teal',
    featured: true
  },
  // Additional ministries (not featured on homepage)
  {
    id: 'youth-ministry',
    image: '/images/youth-ministry.jpg',
    title: 'Youth Ministry',
    description: 'Engaging programs for youth to grow in their faith journey.',
    link: '/ministries/youth-ministry',
    color: 'blue',
    featured: false
  },
  {
    id: 'mens-fellowship',
    image: '/images/mens-fellowship.jpg',
    title: 'Men\'s Fellowship',
    description: 'Building strong Christian men through fellowship and discipleship.',
    link: '/ministries/mens-fellowship',
    color: 'red',
    featured: false
  },
  {
    id: 'womens-ministry',
    image: '/images/womens-ministry.jpg',
    title: 'Women\'s Ministry',
    description: 'Empowering women through Bible study and community support.',
    link: '/ministries/womens-ministry',
    color: 'purple',
    featured: false
  },
  {
    id: 'childrens-ministry',
    image: '/images/childrens-ministry.jpg',
    title: 'Children\'s Ministry',
    description: 'Nurturing young hearts in the love of Christ.',
    link: '/ministries/childrens-ministry',
    color: 'orange',
    featured: false
  },
  {
    id: 'outreach',
    image: '/images/outreach.jpg',
    title: 'Community Outreach',
    description: 'Serving our local community with love and compassion.',
    link: '/ministries/outreach',
    color: 'green',
    featured: false
  },
  {
    id: 'worship-arts',
    image: '/images/worship-arts.jpg',
    title: 'Worship Arts',
    description: 'Expressing worship through music, dance, and creative arts.',
    link: '/ministries/worship-arts',
    color: 'teal',
    featured: false
  }
]

export const featuredMinistries = ministries.filter(ministry => ministry.featured)