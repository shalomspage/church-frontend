export interface Testimony {
  id: string
  name: string
  role: string
  image: string
  title: string
  excerpt: string
  content: string
  date: string
  category: 'Healing' | 'Salvation' | 'Provision' | 'Deliverance' | 'Restoration'
  likes: number
  verified: boolean
}

export const testimonies: Testimony[] = [
  {
    id: 'healing-miracles',
    name: 'Sarah Johnson',
    role: 'Church Member',
    image: '/images/testimonies/sarah.jpg',
    title: 'Healed from Chronic Illness',
    excerpt: 'After five years of suffering, God completely healed me during our healing service.',
    content: `For five long years, I battled with a debilitating autoimmune disease that left me in constant pain and unable to work. Doctors had told me there was no cure, only management. But during our church's healing service last month, as the congregation prayed, I felt a warmth spread through my body. The chronic pain that had been my constant companion suddenly vanished. I went back to my doctor, and all tests came back normal. God's healing power is real and active today!`,
    date: '2024-01-15',
    category: 'Healing',
    likes: 42,
    verified: true
  },
  {
    id: 'financial-breakthrough',
    name: 'Michael Chen',
    role: 'Business Owner',
    image: '/images/testimonies/michael.jpg',
    title: 'Miraculous Financial Provision',
    excerpt: 'God provided exactly what we needed when our business was about to collapse.',
    content: `Our family business was on the verge of bankruptcy after the economic downturn. We had exhausted all our resources and didn't know where to turn. During a Wednesday night service, Pastor spoke about God's provision, and we felt led to sow a seed faith offering - our last $500. Within two weeks, we received an unexpected contract that saved our business and provided for all our needs. God is faithful to His promises!`,
    date: '2024-01-12',
    category: 'Provision',
    likes: 35,
    verified: true
  },
  {
    id: 'family-restoration',
    name: 'The Williams Family',
    role: 'Church Family',
    image: '/images/testimonies/williams.jpg',
    title: 'Family Restored After Separation',
    excerpt: 'Our marriage was saved and our family reunited through prayer and counseling.',
    content: `After 15 years of marriage, we found ourselves separated and considering divorce. The stress of life had driven a wedge between us, and we couldn't see a way forward. Through the church's marriage counseling ministry and the prayers of our small group, God began to heal our hearts. He restored our love for each other and gave us new tools for communication. Today, we're stronger than ever and helping other couples facing similar challenges.`,
    date: '2024-01-10',
    category: 'Restoration',
    likes: 28,
    verified: true
  },
  {
    id: 'freedom-addiction',
    name: 'David Martinez',
    role: 'Youth Leader',
    image: '/images/testimonies/david.jpg',
    title: 'Delivered from Addiction',
    excerpt: 'Set free from a 10-year addiction through the power of prayer and community.',
    content: `I struggled with substance addiction for over a decade. I had been through multiple rehab programs but always relapsed. When I finally surrendered my life to Christ at our church's altar call, something shifted. The craving that had controlled me for years was gone. Through the support of our recovery ministry and daily prayer, I've been completely free for 18 months. Now I get to help others find the same freedom in Christ.`,
    date: '2024-01-08',
    category: 'Deliverance',
    likes: 51,
    verified: true
  },
  {
    id: 'salvation-story',
    name: 'Emily Rodriguez',
    role: 'College Student',
    image: '/images/testimonies/emily.jpg',
    title: 'Found Purpose in Christ',
    excerpt: 'From emptiness to purpose - my journey to salvation changed everything.',
    content: `As a college student, I had everything the world says should make you happy: good grades, friends, and a bright future. But I felt empty inside, like something was missing. One day, a friend invited me to church, and I heard the gospel for the first time. When I gave my life to Jesus, that emptiness was filled with peace and purpose. Now I'm involved in our campus ministry, sharing this hope with other students.`,
    date: '2024-01-05',
    category: 'Salvation',
    likes: 23,
    verified: true
  },
  {
    id: 'healing-cancer',
    name: 'Brother James Wilson',
    role: 'Retired Teacher',
    image: '/images/testimonies/james.jpg',
    title: 'Healed from Stage 4 Cancer',
    excerpt: 'Doctors had no hope, but God had the final say over my health.',
    content: `When I was diagnosed with stage 4 cancer, the doctors gave me six months to live. The chemotherapy was brutal, and I was losing hope. Our church family surrounded me with prayer and support. During one particularly difficult night, I felt God's presence so strongly and heard Him say, "I am your healer." The next scan showed the tumors had shrunk dramatically. Within three months, I was declared cancer-free. To God be all the glory!`,
    date: '2024-01-03',
    category: 'Healing',
    likes: 67,
    verified: true
  },
  {
    id: 'business-miracles',
    name: 'Sister Grace Thompson',
    role: 'Entrepreneur',
    image: '/images/testimonies/grace.jpg',
    title: 'God\'s Guidance in Business',
    excerpt: 'How following God\'s direction led to unexpected business success.',
    content: `I started my small business with a lot of dreams but very little capital. Instead of following conventional business wisdom, I felt God leading me to approach things differently - to prioritize integrity over profit and service over sales. While it seemed risky, doors began to open miraculously. Clients were referred unexpectedly, contracts came through at just the right time, and today we're thriving beyond what I imagined. God honors obedience!`,
    date: '2024-01-01',
    category: 'Provision',
    likes: 19,
    verified: true
  },
  {
    id: 'mental-health-freedom',
    name: 'Rachel Kim',
    role: 'Counselor',
    image: '/images/testimonies/rachel.jpg',
    title: 'Freedom from Anxiety and Depression',
    excerpt: 'After years of struggling, I found true peace in Jesus Christ.',
    content: `I had battled anxiety and depression since my teenage years. Therapy and medication helped manage the symptoms, but I never felt truly free. When I encountered Jesus in a real way during a worship night, something broke off me. The constant fear and heaviness lifted, and for the first time, I experienced genuine peace. Now I use my experience to help others as a Christian counselor, pointing them to the ultimate Healer.`,
    date: '2023-12-28',
    category: 'Deliverance',
    likes: 38,
    verified: true
  }
]

export const featuredTestimonies = testimonies.slice(0, 4)