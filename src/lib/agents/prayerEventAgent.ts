// src/lib/agents/prayerEventAgent.ts
import axios from "axios";
import { prayerAgent } from "./prayerAgent"; // named import — matches your agent

// Minimal type-safe shape for NewsAPI article items we use
interface NewsApiArticle {
  title: string;
  description?: string | null;
  url?: string;
  source?: { name?: string } | null;
}

export interface EventPrayer {
  title: string;
  description?: string | null;
  category: string;
  prayerPrompt: string;
  source?: string | null;
  url?: string | null;
}

const KEYWORD_MAP: Record<string, string> = {
  war: "peace",
  conflict: "peace",
  earthquake: "protection",
  flood: "protection",
  famine: "provision",
  poverty: "provision",
  health: "healing",
  hospital: "healing",
  disease: "healing",
  government: "leadership",
  election: "nation",
  unity: "unity",
  violence: "peace",
  protest: "leadership",
  family: "family",
  church: "revival",
  mission: "missions",
  pastor: "leadership",
  faith: "faith",
  hope: "strength",
};

export class PrayerEventAgent {
  private apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  private baseUrl = "https://newsapi.org/v2/top-headlines";

  // Fetch raw news articles (typed)
  async fetchCurrentEvents(location = "world"): Promise<NewsApiArticle[]> {
    try {
      const res = await axios.get<{ articles: NewsApiArticle[] }>(this.baseUrl, {
        params: {
          q: location,
          language: "en",
          apiKey: this.apiKey,
          pageSize: 5,
        },
      });

      const articles = res.data?.articles ?? [];
      return articles;
    } catch (err) {
      console.error("prayerEventAgent.fetchCurrentEvents error:", err);
      return [];
    }
  }

  // Very small rule-based classifier (scans title + description)
  classifyEventCategory(title = "", description?: string | null): string {
    const text = (title + " " + (description ?? "")).toLowerCase();
    for (const key of Object.keys(KEYWORD_MAP)) {
      if (text.includes(key)) {
        return KEYWORD_MAP[key];
      }
    }
    return "guidance";
  }

  // Convert a news article into an EventPrayer using prayerAgent to craft the prompt
  async generatePrayerFromArticle(article: NewsApiArticle): Promise<EventPrayer> {
    const category = this.classifyEventCategory(article.title, article.description);
    // Use your prayerAgent's generator; falls back inside that agent if needed.
    const prayerPrompt = await prayerAgent.generatePrayerPrompt(category, article.title);
    return {
      title: article.title,
      description: article.description ?? null,
      category,
      prayerPrompt,
      source: article.source?.name ?? null,
      url: article.url ?? null,
    };
  }

  // Public: get a short list of prayer-ready events for a location
  async getPrayerEvents(location = "world"): Promise<EventPrayer[]> {
    const articles = await this.fetchCurrentEvents(location);
    if (!articles || articles.length === 0) return [];

    const slice = articles.slice(0, 5); // take up to 5 articles
    const prayers = await Promise.all(slice.map((a) => this.generatePrayerFromArticle(a)));
    return prayers;
  }
}

export const prayerEventAgent = new PrayerEventAgent();
