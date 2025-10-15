export interface NewsPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: 'Sermon' | 'Announcement' | 'Event' | 'Prayer' | 'Testimony'
  sermonLink?: string
  prayerPoints: string[]
  likes: number
  liked?: boolean // Track if current user liked the post
  image?: string
  duration?: string // For sermons
  bibleVerse?: string // For sermons
}

export const newsPosts: NewsPost[] = [
  {
    id: 'sunday-sermon-faith',
    title: 'Sunday Sermon: The Power of Faith',
    excerpt: 'Join us this Sunday as we explore how faith can move mountains in our daily lives.',
    content: `In this powerful message, we delve into the depths of what it means to walk by faith and not by sight. Faith is the substance of things hoped for, the evidence of things not seen. Through biblical examples and practical applications, we discover how to strengthen our faith and see God move in miraculous ways.`,
    date: '2024-01-15',
    author: 'Pastor John Smith',
    category: 'Sermon',
    sermonLink: 'https://youtube.com/live/sermon-link',
    prayerPoints: [
      'Pray for increased faith in your personal life',
      'Ask God to help you trust Him in difficult situations',
      'Pray for faith to believe for healing and miracles',
      'Intercede for family members who need salvation',
      'Pray for the faith of our church community to grow'
    ],
    likes: 42,
    duration: '45 min',
    bibleVerse: 'Hebrews 11:1'
  },
  {
    id: 'prayer-night-january',
    title: 'January Prayer Night Recap',
    excerpt: 'Powerful testimonies and breakthroughs from our monthly prayer night.',
    content: `Our January prayer night was filled with the presence of God. We witnessed incredible testimonies of healing, restoration, and divine intervention. The atmosphere was charged with faith as we interceded for our city, nation, and personal needs.`,
    date: '2024-01-12',
    author: 'Sister Mary Johnson',
    category: 'Prayer',
    prayerPoints: [
      'Continue praying for our city leaders',
      'Pray for spiritual awakening in our community',
      'Intercede for the homeless and needy',
      'Pray for divine protection over our church',
      'Ask God for wisdom in upcoming decisions'
    ],
    likes: 28
  },
  {
    id: 'youth-winter-retreat',
    title: 'Youth Group Winter Retreat Registration',
    excerpt: 'Our youth group winter retreat registration is now open. Limited spots available!',
    content: `We're excited to announce our annual Winter Retreat for youth ages 13-18. This year's theme is "Unshakable" based on Hebrews 12:28. Join us for three days of worship, teaching, fun activities, and life-changing encounters with God.`,
    date: '2024-01-10',
    author: 'Brother David Wilson',
    category: 'Event',
    prayerPoints: [
      'Pray for the youth attending the retreat',
      'Ask God to prepare hearts for transformation',
      'Pray for safety during travel and activities',
      'Intercede for the speakers and worship team',
      'Pray for lasting impact in young lives'
    ],
    likes: 35
  },
  {
    id: 'healing-testimony',
    title: 'Miracle Healing Testimony',
    excerpt: 'Brother Michael shares his powerful testimony of divine healing from chronic illness.',
    content: `For five years, I struggled with a debilitating condition that doctors said was incurable. But through the prayers of this church family and unwavering faith, God completely healed me during last month's healing service. I want to glorify God for His mercy and power.`,
    date: '2024-01-08',
    author: 'Brother Michael Brown',
    category: 'Testimony',
    prayerPoints: [
      'Thank God for His healing power',
      'Pray for others needing healing',
      'Ask God to increase our faith for miracles',
      'Pray for medical professionals',
      'Thank God for His faithfulness'
    ],
    likes: 67
  },
  {
    id: 'community-outreach',
    title: 'Community Outreach Program Launch',
    excerpt: 'New outreach initiative to serve our local community starting next month.',
    content: `We're launching a new community outreach program focused on serving the practical and spiritual needs of our neighborhood. This includes food distribution, counseling services, and neighborhood prayer walks.`,
    date: '2024-01-05',
    author: 'Deacon Robert Green',
    category: 'Announcement',
    prayerPoints: [
      'Pray for divine appointments',
      'Ask God to open hearts in our community',
      'Pray for resources and volunteers',
      'Intercede for lasting impact',
      'Pray for protection over the team'
    ],
    likes: 23
  },
  {
    id: 'wednesday-sermon-grace',
    title: 'Wednesday Sermon: Understanding Grace',
    excerpt: 'Deep dive into the transformative power of God\'s amazing grace.',
    content: `Grace is not just a theological concept - it's the very power of God that transforms lives. In this message, we explore how grace saves us, sustains us, and empowers us to live victorious Christian lives.`,
    date: '2024-01-03',
    author: 'Pastor John Smith',
    category: 'Sermon',
    sermonLink: 'https://youtube.com/live/grace-sermon',
    prayerPoints: [
      'Pray for deeper understanding of grace',
      'Ask God to help you extend grace to others',
      'Pray for freedom from legalism',
      'Intercede for those struggling to receive grace',
      'Thank God for His unmerited favor'
    ],
    likes: 39,
    duration: '38 min',
    bibleVerse: 'Ephesians 2:8-9'
  }
]

export const featuredPosts = newsPosts.slice(0, 3)