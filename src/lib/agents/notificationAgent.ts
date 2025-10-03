export interface UserPreferences {
  prayerReminders: boolean;
  eventReminders: boolean;
  communityUpdates: boolean;
  prayerAnswerNotifications: boolean;
  preferredTime: string; // "morning", "afternoon", "evening"
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'prayer' | 'event' | 'community' | 'answer';
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  sentAt: Date;
}

interface Event {
  id: string;
  title: string;
  time: string;
}

interface User {
  id: string;
  preferences: UserPreferences;
}

interface PrayerRequest {
  id: string;
}

class NotificationAgent {
  async generatePrayerReminder(userId: string, preferences: UserPreferences): Promise<Notification | null> {
    if (!preferences.prayerReminders) return null;

    const messages = [
      "Time for your daily prayer moment. What's on your heart today?",
      "Your prayer community is here for you. Any requests to share?",
      "Take a moment to connect with God. Need prayer inspiration?",
      "Your prayer friends are praying. Would you like to join them?"
    ];

    return {
      id: `prayer-${Date.now()}`,
      userId,
      title: "Prayer Reminder",
      message: messages[Math.floor(Math.random() * messages.length)],
      type: 'prayer',
      priority: 'medium',
      actionUrl: '/prayer',
      sentAt: new Date()
    };
  }

  async generateEventReminder(event: Event, users: User[]): Promise<Notification[]> {
    const notifications: Notification[] = [];

    for (const user of users) {
      if (user.preferences.eventReminders) {
        notifications.push({
          id: `event-${event.id}-${user.id}`,
          userId: user.id,
          title: `Upcoming: ${event.title}`,
          message: `Don't forget about ${event.title} tomorrow at ${event.time}`,
          type: 'event',
          priority: 'medium',
          actionUrl: `/events/${event.id}`,
          sentAt: new Date()
        });
      }
    }

    return notifications;
  }

  async generatePrayerAnswerNotification(request: PrayerRequest, user: User): Promise<Notification | null> {
    if (!user.preferences.prayerAnswerNotifications) return null;

    return {
      id: `answer-${request.id}`,
      userId: user.id,
      title: "Prayer Update",
      message: `Someone shared an update on a prayer request you've been following`,
      type: 'answer',
      priority: 'low',
      actionUrl: `/prayer/${request.id}`,
      sentAt: new Date()
    };
  }

  shouldSendNotification(preferences: UserPreferences, timeOfDay: string): boolean {
    return preferences.preferredTime === timeOfDay;
  }
}

export const notificationAgent = new NotificationAgent();