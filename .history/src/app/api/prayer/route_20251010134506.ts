import { NextRequest, NextResponse } from 'next/server'
import { prayerAgent, PrayerRequest } from '@/lib/agents/prayerAgent'
import { contentModerator } from '@/lib/agents/contentModerator'

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    // Moderate content first
    const moderation = await contentModerator.moderateContent(content, 'prayer')
    
    if (!moderation.isApproved) {
      return NextResponse.json(
        { error: 'Content moderation failed', flags: moderation.flags },
        { status: 400 }
      )
    }

    // Save to database (your existing logic)
    // const prayer = await savePrayerRequest({ content, category, isPublic, userId })

    // Get new suggestions based on updated prayer history
    const userPrayerHistory: PrayerRequest[] = [] // Fetch from DB
    const suggestions = await prayerAgent.suggestPrayerTopics(userPrayerHistory)

    return NextResponse.json({
      success: true,
      prayer: { /* your prayer object */ },
      suggestions,
      moderationResult: moderation
    })

  } catch (error) {
    console.error('Prayer API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  const prayerHistory: PrayerRequest[] = [] // Fetch from DB
  const insights = prayerAgent.analyzePrayerPatterns(prayerHistory)
  const suggestions = await prayerAgent.suggestPrayerTopics(prayerHistory)

  return NextResponse.json({
    insights,
    suggestions
  })
}