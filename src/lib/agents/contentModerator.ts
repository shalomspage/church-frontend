export interface ModerationResult {
  isApproved: boolean;
  flags: string[];
  confidence: number;
  suggestedChanges?: string[];
}

class ContentModeratorAgent {
  private inappropriateTerms = [
    // Add terms you want to filter
    'hate', 'violence', 'harassment' // etc.
  ];

  private warningPatterns = [
    /(\b\d{10,}\b)/, // Phone numbers
    /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/, // Email addresses
    /(http|https):\/\/[^\s]+/ // URLs
  ];

  async moderateContent(content: string, context: 'prayer' | 'event' | 'comment'): Promise<ModerationResult> {
    const flags: string[] = [];
    let confidence = 1.0;

    // Check for inappropriate language
    const inappropriateFound = this.inappropriateTerms.some(term => 
      content.toLowerCase().includes(term.toLowerCase())
    );

    if (inappropriateFound) {
      flags.push('inappropriate_language');
      confidence -= 0.3;
    }

    // Check for personal information
    const personalInfoFound = this.warningPatterns.some(pattern => 
      pattern.test(content)
    );

    if (personalInfoFound) {
      flags.push('potential_personal_information');
      confidence -= 0.2;
    }

    // Length checks based on context
    if (context === 'prayer' && content.length > 1000) {
      flags.push('content_too_long');
      confidence -= 0.1;
    }

    if (context === 'comment' && content.length < 10) {
      flags.push('content_too_short');
      confidence -= 0.1;
    }

    const isApproved = confidence > 0.6 && !flags.includes('inappropriate_language');

    return {
      isApproved,
      flags,
      confidence,
      suggestedChanges: this.generateSuggestions(flags)
    };
  }

  private generateSuggestions(flags: string[]): string[] {
    const suggestions: string[] = [];

    if (flags.includes('inappropriate_language')) {
      suggestions.push('Please remove any inappropriate language');
    }

    if (flags.includes('potential_personal_information')) {
      suggestions.push('Consider removing phone numbers, email addresses, or URLs');
    }

    if (flags.includes('content_too_long')) {
      suggestions.push('Try to keep your prayer request under 1000 characters');
    }

    if (flags.includes('content_too_short')) {
      suggestions.push('Please provide more details so others can pray effectively');
    }

    return suggestions;
  }
}

export const contentModerator = new ContentModeratorAgent();