// src/lib/agents/prayerAgent.ts
export type PrayerCategory =
  | "thanksgiving"
  | "healing"
  | "guidance"
  | "peace"
  | "strength"
  | "provision"
  | "protection"
  | "unity"
  | "salvation"
  | "deliverance"
  | "revival"
  | "wisdom"
  | "family"
  | "nation"
  | "missions"
  | "leadership"
  | "mercy"
  | "faith";

export interface PrayerSuggestion {
  topic: string;
  bibleVerse: string;
  prompt: string;
  category: PrayerCategory;
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

const CATEGORIES: PrayerCategory[] = [
  "thanksgiving", "healing", "guidance", "peace", "strength",
  "provision", "protection", "unity", "salvation", "deliverance",
  "revival", "wisdom", "family", "nation", "missions",
  "leadership", "mercy", "faith"
];

class PrayerCompanionAgent {
  private categories = CATEGORIES;

  private bibleVerses: Record<PrayerCategory, string[]> = {
    thanksgiving: ["1 Thessalonians 5:18", "Psalm 100:4", "Colossians 3:17"],
    healing: ["James 5:16", "Isaiah 53:5", "Psalm 147:3"],
    guidance: ["Proverbs 3:5-6", "Psalm 32:8", "James 1:5"],
    peace: ["John 14:27", "Philippians 4:7", "Isaiah 26:3"],
    strength: ["Philippians 4:13", "Isaiah 40:31", "Psalm 46:1"],
    provision: ["Philippians 4:19", "Matthew 6:31-33", "Psalm 23:1"],
    protection: ["Psalm 91:1-2", "2 Thessalonians 3:3", "Psalm 121:7-8"],
    unity: ["Psalm 133:1", "John 17:21", "Ephesians 4:3"],
    salvation: ["Romans 10:9", "John 3:16", "Acts 4:12"],
    deliverance: ["Psalm 34:17", "2 Samuel 22:2", "Colossians 1:13"],
    revival: ["2 Chronicles 7:14", "Habakkuk 3:2", "Psalm 85:6"],
    wisdom: ["James 1:5", "Proverbs 2:6", "Ecclesiastes 7:12"],
    family: ["Joshua 24:15", "Ephesians 6:1-4", "Proverbs 22:6"],
    nation: ["Psalm 33:12", "2 Chronicles 7:14", "Proverbs 14:34"],
    missions: ["Matthew 28:19", "Romans 10:14-15", "Mark 16:15"],
    leadership: ["1 Timothy 2:1-2", "Proverbs 11:14", "Exodus 18:21"],
    mercy: ["Luke 6:36", "Psalm 103:8", "Micah 6:8"],
    faith: ["Hebrews 11:1", "2 Corinthians 5:7", "Romans 10:17"]
  };

  private pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private normalizeCategory(cat?: string): PrayerCategory {
    if (!cat) return "guidance";
    const lower = cat.toLowerCase() as PrayerCategory;
    return this.categories.includes(lower) ? lower : "guidance";
  }

  async suggestPrayerTopics(userPrayerHistory: PrayerRequest[]): Promise<PrayerSuggestion[]> {
    const recentCategories = this.getRecentCategories(userPrayerHistory);
    const suggestions: PrayerSuggestion[] = [];

    suggestions.push(this.createCategorySuggestion("thanksgiving"));

    const unused = this.categories.filter(c => !recentCategories.includes(c));
    const randomExtra = unused.sort(() => 0.5 - Math.random()).slice(0, 2);

    [...randomExtra].forEach(cat => suggestions.push(this.createCategorySuggestion(cat)));

    return suggestions.slice(0, 3);
  }

  async generatePrayerPrompt(category: string, specificNeed?: string): Promise<string> {
    const cat = this.normalizeCategory(category);

    const base = {
      thanksgiving: `Heavenly Father, I thank You for ${specificNeed || "Your goodness and grace"}.`,
      healing: `Lord, please bring healing to ${specificNeed || "every broken area"} in my life.`,
      guidance: `Holy Spirit, guide me as I navigate ${specificNeed || "the path ahead"}.`,
      peace: `Prince of Peace, calm my heart amidst ${specificNeed || "uncertainty"}.`,
      strength: `Almighty God, fill me with strength to face ${specificNeed || "today's challenges"}.`,
      provision: `Jehovah Jireh, supply every need concerning ${specificNeed || "my situation"}.`,
      protection: `Lord, cover me and my loved ones from ${specificNeed || "every harm"}.`,
      unity: `Father, help us walk in unity and love within ${specificNeed || "our community"}.`,
      salvation: `God, open hearts to receive salvation in ${specificNeed || "our generation"}.`,
      deliverance: `Mighty Deliverer, break every chain hindering ${specificNeed || "my freedom"}.`,
      revival: `Lord, pour out revival over ${specificNeed || "Your church and nations"}.`,
      wisdom: `Grant me divine wisdom for ${specificNeed || "the decisions I face"}.`,
      family: `Bless and strengthen my family through ${specificNeed || "every circumstance"}.`,
      nation: `God, have mercy on our nation and guide ${specificNeed || "our leaders"}.`,
      missions: `Empower missionaries and believers to reach ${specificNeed || "the unreached"}.`,
      leadership: `Grant godly wisdom and humility to leaders guiding ${specificNeed || "our communities"}.`,
      mercy: `Lord, let Your mercy triumph over ${specificNeed || "judgment in my life"}.`,
      faith: `Strengthen my faith as I trust You in ${specificNeed || "this season"}.`
    };

    return base[cat] || base.guidance;
  }

  private getRecentCategories(history: PrayerRequest[]): PrayerCategory[] {
    const recent = history.filter(req =>
      new Date(req.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    return recent.map(req => this.normalizeCategory(req.category));
  }

  private createCategorySuggestion(category: PrayerCategory): PrayerSuggestion {
    const topics: Record<PrayerCategory, string> = {
      thanksgiving: "Gratitude and Thanksgiving",
      healing: "Healing and Restoration",
      guidance: "Divine Guidance",
      peace: "Inner Peace",
      strength: "Spiritual Strength",
      provision: "Divine Provision",
      protection: "Divine Protection",
      unity: "Unity and Love",
      salvation: "Salvation and Grace",
      deliverance: "Deliverance and Freedom",
      revival: "Revival and Renewal",
      wisdom: "Divine Wisdom",
      family: "Family and Relationships",
      nation: "National Transformation",
      missions: "Missions and Outreach",
      leadership: "Leadership and Service",
      mercy: "Mercy and Compassion",
      faith: "Faith and Trust"
    };

    return {
      topic: topics[category],
      bibleVerse: this.pickRandom(this.bibleVerses[category]),
      prompt: `Pray about ${topics[category].toLowerCase()} and invite God's presence into it.`,
      category
    };
  }
}

export const prayerAgent = new PrayerCompanionAgent();
