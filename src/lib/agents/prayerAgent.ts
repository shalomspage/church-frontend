export interface PrayerSuggestion {
  topic: string;
  bibleVerse: string;
  prompt: string;
  category: 'thanksgiving' | 'healing' | 'guidance' | 'peace' | 'strength';
}

export interface PrayerRequest {
  id: string;
  title: string;
  content: string;
  category: string;
  isPublic: boolean;
  userId: string;
  createdAt: Date;
}

class PrayerCompanionAgent {
  private categories = ['thanksgiving', 'healing', 'guidance', 'peace', 'strength'] as const;
  private bibleVerses = {
    thanksgiving: ["1 Thessalonians 5:18", "Psalm 100:4", "Philippians 4:6"],
    healing: ["James 5:16", "Psalm 147:3", "Jeremiah 17:14"],
    guidance: ["Proverbs 3:5-6", "Psalm 32:8", "James 1:5"],
    peace: ["Philippians 4:7", "John 14:27", "Isaiah 26:3"],
    strength: ["Isaiah 40:31", "Philippians 4:13", "Psalm 46:1"]
  };

  // Suggest prayer topics based on user activity and context
  async suggestPrayerTopics(userPrayerHistory: PrayerRequest[]): Promise<PrayerSuggestion[]> {
    const recentCategories = this.getRecentCategories(userPrayerHistory);
    const needsVariety = this.needsCategoryVariety(recentCategories);
    
    const suggestions: PrayerSuggestion[] = [];

    // Always include thanksgiving
    suggestions.push(this.createThanksgivingSuggestion());

    // Add suggestions based on user's prayer patterns
    if (needsVariety) {
      const underusedCategories = this.getUnderusedCategories(recentCategories);
      underusedCategories.forEach(category => {
        suggestions.push(this.createCategorySuggestion(category));
      });
    } else {
      // Build on user's current focus
      recentCategories.slice(0, 2).forEach(category => {
        suggestions.push(this.createCategorySuggestion(category));
      });
    }

    return suggestions.slice(0, 3); // Return top 3 suggestions
  }

  // Generate prayer prompt based on specific need
  async generatePrayerPrompt(category: string, specificNeed?: string): Promise<string> {
    const prompts: Record<string, string> = {
      thanksgiving: `Heavenly Father, thank you for ${specificNeed || 'your endless blessings and grace'}. Help me to maintain a grateful heart in all circumstances.`,
      healing: `Lord Jesus, I come to you seeking healing for ${specificNeed || 'this situation'}. Bring your restorative power and comfort to this need.`,
      guidance: `Holy Spirit, guide me in ${specificNeed || 'the decisions ahead'}. Give me wisdom and clarity according to your perfect will.`,
      peace: `Prince of Peace, calm my heart about ${specificNeed || 'these worries'}. Help me to trust in your sovereignty and love.`,
      strength: `Almighty God, strengthen me for ${specificNeed || 'the challenges I face'}. Fill me with your power and endurance.`
    };

    return prompts[category] || prompts.guidance;
  }

  // Analyze prayer requests for pastoral insights
  analyzePrayerPatterns(requests: PrayerRequest[]): { trendingNeeds: string[], commonThemes: string[] } {
    const recentRequests = requests.filter(req => 
      new Date(req.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    const categoryCounts = recentRequests.reduce((acc, req) => {
      acc[req.category] = (acc[req.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const trendingNeeds = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);

    return {
      trendingNeeds,
      commonThemes: this.extractCommonThemes(recentRequests)
    };
  }

  private getRecentCategories(history: PrayerRequest[]): string[] {
    const recent = history.filter(req => 
      new Date(req.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    return recent.map(req => req.category);
  }

  private needsCategoryVariety(categories: string[]): boolean {
    const uniqueCategories = new Set(categories).size;
    return uniqueCategories < 3 || categories.length < 5;
  }

  private getUnderusedCategories(recentCategories: string[]): string[] {
    const categoryCounts = recentCategories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return this.categories.filter(category => !categoryCounts[category] || categoryCounts[category] < 2);
  }

  private createThanksgivingSuggestion(): PrayerSuggestion {
    const verses = this.bibleVerses.thanksgiving;
    return {
      topic: "Gratitude and Thanksgiving",
      bibleVerse: verses[Math.floor(Math.random() * verses.length)],
      prompt: "Reflect on recent blessings and express gratitude",
      category: 'thanksgiving'
    };
  }

  private createCategorySuggestion(category: string): PrayerSuggestion {
    const categoryKey = category as keyof typeof this.bibleVerses;
    const verses = this.bibleVerses[categoryKey] || this.bibleVerses.guidance;
    
    const topics: Record<string, string> = {
      healing: "Healing and Restoration",
      guidance: "Divine Guidance",
      peace: "Inner Peace",
      strength: "Spiritual Strength"
    };

    return {
      topic: topics[category] || "Spiritual Growth",
      bibleVerse: verses[Math.floor(Math.random() * verses.length)],
      prompt: `Bring your ${category} needs before God`,
      category: category as PrayerSuggestion['category']
    };
  }

  private extractCommonThemes(requests: PrayerRequest[]): string[] {
    const commonWords = ['family', 'health', 'work', 'faith', 'relationship', 'finances', 'peace'];
    const themes: string[] = [];
    
    requests.forEach(request => {
      commonWords.forEach(word => {
        if (request.content.toLowerCase().includes(word) && !themes.includes(word)) {
          themes.push(word);
        }
      });
    });

    return themes.slice(0, 5);
  }
}

export const prayerAgent = new PrayerCompanionAgent();