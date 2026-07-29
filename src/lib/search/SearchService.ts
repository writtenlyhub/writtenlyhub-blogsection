import { SearchProvider, SearchOptions, SearchResponse } from './types';
import { PayloadSearchProvider } from './PayloadSearchProvider';

class SearchService {
  private provider: SearchProvider;

  constructor(provider?: SearchProvider) {
    // Default to Payload Search, can be swapped later for Typesense/MeiliSearch
    this.provider = provider || new PayloadSearchProvider();
  }

  async search(query: string, options?: SearchOptions): Promise<SearchResponse> {
    if (!query || query.trim() === '') {
      return {
        results: [],
        total: 0,
        query: '',
        searchTimeMs: 0,
      };
    }
    
    // Safety caps
    const safeQuery = query.substring(0, 100); // Max 100 chars
    return this.provider.search(safeQuery, options);
  }
}

// Export a singleton instance
export const searchService = new SearchService();