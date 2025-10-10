// src/lib/agents/bibleEventAgent.ts - FIXED TYPES
import axios from "axios";

interface NewsApiArticle {
  title: string;
  description?: string | null;
  url?: string;
  source?: { name?: string } | null;
  publishedAt?: string;
  isBreaking?: boolean; // ADDED THIS
}

interface GNewsArticle {
  title: string;
  description: string;
  url: string;
  source: { name: string };
  publishedAt: string;
}

export interface EventBiblePassage {
  title: string;
  description?: string | null;
  category: string;
  biblePassage: string;
  bibleVerse: string;
  explanation: string;
  source?: string | null;
  url?: string | null;
  isBreaking?: boolean;
}

const BIBLE_PASSAGES: Record<string, { passage: string; verse: string; explanation: string }[]> = {
  peace: [
    {
      passage: "John 14:27",
      verse: "Peace I leave with you; my peace I give you.",
      explanation: "Jesus offers divine peace amidst worldly conflicts"
    },
    {
      passage: "Philippians 4:6-7", 
      verse: "Do not be anxious about anything...",
      explanation: "God's peace guards our hearts in troubling times"
    },
    {
      passage: "Isaiah 26:3",
      verse: "You will keep in perfect peace those whose minds are steadfast...",
      explanation: "Steadfast trust in God brings perfect peace"
    }
  ],
  protection: [
    {
      passage: "Psalm 91:1-2",
      verse: "Whoever dwells in the shelter of the Most High...",
      explanation: "God is our refuge and fortress in times of danger"
    },
    {
      passage: "Psalm 46:1",
      verse: "God is our refuge and strength...",
      explanation: "God is our ever-present help in trouble"
    }
  ],
  healing: [
    {
      passage: "James 5:16",
      verse: "The prayer of a righteous person is powerful and effective.",
      explanation: "Prayer brings healing and restoration"
    },
    {
      passage: "Psalm 147:3",
      verse: "He heals the brokenhearted...",
      explanation: "God binds up our wounds and heals our pain"
    }
  ],
  guidance: [
    {
      passage: "Proverbs 3:5-6",
      verse: "Trust in the Lord with all your heart...",
      explanation: "God directs our paths when we trust Him"
    },
    {
      passage: "Psalm 32:8",
      verse: "I will instruct you and teach you...",
      explanation: "God promises to guide us with His eye"
    }
  ],
  strength: [
    {
      passage: "Isaiah 40:31",
      verse: "But those who hope in the Lord will renew their strength...",
      explanation: "God renews our strength when we wait on Him"
    },
    {
      passage: "Philippians 4:13",
      verse: "I can do all this through him who gives me strength.",
      explanation: "Christ empowers us for every situation"
    }
  ],
  provision: [
    {
      passage: "Philippians 4:19",
      verse: "And my God will meet all your needs...",
      explanation: "God promises to supply all our needs"
    },
    {
      passage: "Matthew 6:31-33",
      verse: "So do not worry, saying, 'What shall we eat?'...",
      explanation: "God knows our needs and provides when we seek Him first"
    }
  ],
  leadership: [
    {
      passage: "1 Timothy 2:1-2",
      verse: "I urge, then, first of all, that petitions, prayers...",
      explanation: "We should pray for those in authority"
    },
    {
      passage: "Proverbs 11:14",
      verse: "For lack of guidance a nation falls...",
      explanation: "Wise leadership brings stability to nations"
    }
  ],
  family: [
    {
      passage: "Joshua 24:15",
      verse: "But as for me and my household, we will serve the Lord.",
      explanation: "The commitment to serve God as a family"
    },
    {
      passage: "Ephesians 6:1-4",
      verse: "Children, obey your parents... Fathers, do not exasperate your children...",
      explanation: "God's design for family relationships"
    }
  ],
  nation: [
    {
      passage: "2 Chronicles 7:14",
      verse: "If my people, who are called by my name...",
      explanation: "God's promise for healing our land"
    },
    {
      passage: "Psalm 33:12",
      verse: "Blessed is the nation whose God is the Lord...",
      explanation: "Nations are blessed when they follow God"
    }
  ]
};

const KEYWORD_MAP: Record<string, string> = {
  war: "peace", conflict: "peace", violence: "peace",
  earthquake: "protection", flood: "protection", hurricane: "protection", storm: "protection", disaster: "protection",
  famine: "provision", poverty: "provision", hunger: "provision", economy: "provision",
  health: "healing", hospital: "healing", disease: "healing", pandemic: "healing", medical: "healing",
  government: "leadership", election: "nation", president: "leadership", leader: "leadership", politics: "leadership",
  unity: "unity", division: "unity", reconciliation: "unity",
  protest: "leadership", crisis: "strength", emergency: "protection",
  family: "family", children: "family", marriage: "family", parents: "family",
  church: "guidance", pastor: "leadership", faith: "strength", hope: "strength",
  education: "guidance", school: "guidance", students: "guidance",
  environment: "provision", climate: "provision", nature: "provision"
};

export class BibleEventAgent {
  private apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
  private baseUrl = "https://gnews.io/api/v4/top-headlines";

  // Enhanced to fetch breaking/urgent news
  async fetchBreakingNews(location = "world"): Promise<NewsApiArticle[]> {
    if (!this.apiKey) {
      console.log("No API key found, using fallback events");
      return this.getFallbackEvents();
    }

    try {
      const countryCode = this.getCountryCode(location);
      
      // Strategy 1: Search for breaking news keywords
      const breakingKeywords = [
        'breaking', 'urgent', 'crisis', 'emergency', 'disaster', 
        'attack', 'earthquake', 'flood', 'hurricane', 'fire',
        'shooting', 'explosion', 'accident', 'outbreak', 'protest'
      ];

      // Try multiple approaches to get breaking news
      const breakingArticles = await this.fetchWithBreakingKeywords(countryCode, breakingKeywords);
      
      if (breakingArticles.length > 0) {
        console.log(`Found ${breakingArticles.length} breaking news articles`);
        return breakingArticles;
      }

      // Strategy 2: Get latest news and filter for urgency
      const latestArticles = await this.fetchLatestNews(countryCode);
      const urgentArticles = this.filterUrgentNews(latestArticles);
      
      return urgentArticles.length > 0 ? urgentArticles : latestArticles.slice(0, 4);

    } catch (err) {
      console.error("BibleEventAgent.fetchBreakingNews error:", err);
      return this.getFallbackEvents();
    }
  }

  // Search for breaking news using urgent keywords
  private async fetchWithBreakingKeywords(countryCode: string, keywords: string[]): Promise<NewsApiArticle[]> {
    try {
      // Try each keyword until we find breaking news
      for (const keyword of keywords) {
        const url = `${this.baseUrl}?token=${this.apiKey}&lang=en&max=4&country=${countryCode}&q="${keyword}"`;
        const res = await axios.get<{ articles: GNewsArticle[] }>(url);
        
        const articles = res.data?.articles ?? [];
        const validArticles = this.filterValidArticles(articles);
        
        if (validArticles.length > 0) {
          console.log(`Found breaking news with keyword: ${keyword}`);
          return validArticles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source,
            publishedAt: article.publishedAt,
            isBreaking: true
          }));
        }
      }
    } catch (err) {
      console.error("Error fetching with breaking keywords:", err);
    }
    
    return [];
  }

  // Fetch latest news and identify urgent ones
  private async fetchLatestNews(countryCode: string): Promise<NewsApiArticle[]> {
    try {
      const url = `${this.baseUrl}?token=${this.apiKey}&lang=en&max=10&country=${countryCode}`;
      const res = await axios.get<{ articles: GNewsArticle[] }>(url);
      
      const articles = res.data?.articles ?? [];
      return this.filterValidArticles(articles);
    } catch (err) {
      console.error("Error fetching latest news:", err);
      return [];
    }
  }

  // Filter for urgent/breaking news based on content analysis
  private filterUrgentNews(articles: NewsApiArticle[]): NewsApiArticle[] {
    const urgentKeywords = [
      'breaking', 'urgent', 'crisis', 'emergency', 'disaster', 'alert',
      'attack', 'shooting', 'explosion', 'fire', 'earthquake', 'flood',
      'hurricane', 'tornado', 'accident', 'crash', 'outbreak', 'protest',
      'riot', 'evacuation', 'warning', 'danger', 'critical', 'fatal'
    ];

    return articles.filter(article => {
      const text = (article.title + " " + (article.description || "")).toLowerCase();
      
      // Check for breaking news indicators
      const hasUrgentKeyword = urgentKeywords.some(keyword => text.includes(keyword));
      const hasBreakingFormat = article.title.toLowerCase().includes('breaking:') || 
                               article.title.toLowerCase().includes('urgent:') ||
                               article.title.toUpperCase() === article.title; // ALL CAPS often indicates urgency
      
      return hasUrgentKeyword || hasBreakingFormat;
    }).slice(0, 4); // Return max 4 urgent articles
  }

  // Filter out invalid articles
  private filterValidArticles(articles: GNewsArticle[]): NewsApiArticle[] {
    return articles.filter(article => 
      article.title && 
      !article.title.includes('[Removed]') &&
      !article.title.toLowerCase().includes('removed') &&
      article.title.length > 10 &&
      !article.title.toLowerCase().includes('sports') && // Exclude sports
      !article.title.toLowerCase().includes('entertainment') // Exclude entertainment
    ).map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source,
      publishedAt: article.publishedAt
    }));
  }

  // Enhanced country code mapping
  private getCountryCode(location: string): string {
    const countryMap: Record<string, string> = {
      // North America
      'us': 'us', 'usa': 'us', 'united states': 'us', 'america': 'us',
      'canada': 'ca', 'can': 'ca',
      'mexico': 'mx', 'mex': 'mx',
      
      // Europe
      'uk': 'gb', 'united kingdom': 'gb', 'britain': 'gb', 'england': 'gb',
      'germany': 'de', 'deutschland': 'de',
      'france': 'fr', 'française': 'fr',
      'italy': 'it', 'italia': 'it',
      'spain': 'es', 'españa': 'es',
      'netherlands': 'nl', 'holland': 'nl',
      'belgium': 'be',
      'switzerland': 'ch',
      'austria': 'at',
      'portugal': 'pt',
      'sweden': 'se',
      'norway': 'no',
      'denmark': 'dk',
      'finland': 'fi',
      'ireland': 'ie',
      'poland': 'pl',
      
      // Africa
      'nigeria': 'ng', 'nig': 'ng',
      'ghana': 'gh',
      'kenya': 'ke',
      'south africa': 'za', 'sa': 'za',
      'egypt': 'eg',
      'ethiopia': 'et',
      'tanzania': 'tz',
      'uganda': 'ug',
      
      // Asia
      'india': 'in', 'ind': 'in',
      'china': 'cn', 'chinese': 'cn',
      'japan': 'jp', 'japanese': 'jp',
      'south korea': 'kr', 'korea': 'kr',
      'australia': 'au', 'aus': 'au',
      'new zealand': 'nz', 'nz': 'nz',
      'singapore': 'sg',
      'malaysia': 'my',
      'indonesia': 'id',
      'philippines': 'ph',
      'thailand': 'th',
      'vietnam': 'vn',
      
      // South America
      'brazil': 'br', 'brasil': 'br',
      'argentina': 'ar',
      'colombia': 'co',
      'chile': 'cl',
      'peru': 'pe'
    };

    const normalizedLocation = location.toLowerCase().trim();
    return countryMap[normalizedLocation] || 'us'; // default to US
  }

  classifyEventCategory(title = "", description?: string | null): string {
    const text = (title + " " + (description ?? "")).toLowerCase();
    
    // Check for exact matches first
    for (const key of Object.keys(KEYWORD_MAP)) {
      if (text.includes(key)) {
        return KEYWORD_MAP[key];
      }
    }
    
    return "guidance"; // default category
  }

  getBiblePassageForCategory(category: string): { passage: string; verse: string; explanation: string } {
    const passages = BIBLE_PASSAGES[category] || BIBLE_PASSAGES.guidance;
    return passages[Math.floor(Math.random() * passages.length)];
  }

  generateBiblePassageFromArticle(article: NewsApiArticle): EventBiblePassage {
    const category = this.classifyEventCategory(article.title, article.description);
    const bibleContent = this.getBiblePassageForCategory(category);

    return {
      title: article.title,
      description: article.description ?? null,
      category,
      biblePassage: bibleContent.passage,
      bibleVerse: bibleContent.verse,
      explanation: bibleContent.explanation,
      source: article.source?.name ?? null,
      url: article.url ?? null,
      isBreaking: article.isBreaking || false // FIXED: removed 'any' type
    };
  }

  // Update main method to use breaking news
  async getBiblePassagesForEvents(location = "world"): Promise<EventBiblePassage[]> {
    const articles = await this.fetchBreakingNews(location);
    if (!articles || articles.length === 0) return [];

    const relevantArticles = articles.slice(0, 6);
    const biblePassages = relevantArticles.map(article => 
      this.generateBiblePassageFromArticle(article)
    );

    return biblePassages;
  }

  private getFallbackEvents(): NewsApiArticle[] {
    return [
      {
        title: "BREAKING: Emergency Response Activated in Affected Regions",
        description: "Urgent measures underway to address critical situation",
        source: { name: "Emergency News" },
        url: "#",
        isBreaking: true
      },
      {
        title: "Urgent: Community Rally for Disaster Relief",
        description: "Immediate assistance mobilized for those in need",
        source: { name: "Relief Network" },
        url: "#",
        isBreaking: true
      },
      {
        title: "Crisis Response: Global Leaders Convene Emergency Meeting",
        description: "International coordination for urgent situation resolution",
        source: { name: "World News" },
        url: "#",
        isBreaking: true
      },
      {
        title: "Critical Development in Healthcare Situation",
        description: "Important updates on pressing medical matters",
        source: { name: "Health Alert" },
        url: "#"
      }
    ];
  }
}

export const bibleEventAgent = new BibleEventAgent();