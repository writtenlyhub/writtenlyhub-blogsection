export interface SearchOptions {
  limit?: number;
  cursor?: string; // For future cursor pagination, or stringified page for now
  filters?: {
    category?: string;
    author?: string;
    [key: string]: any;
  };
}

export interface SearchResult {
  id: string;
  type: 'blog' | 'author' | 'category';
  title: string;
  url: string;
  snippet?: string;
  relevanceScore: number;
  semanticScore?: number; // Future AI search support
  
  // Extra metadata for rich cards
  metadata?: {
    category?: string;
    author?: string;
    date?: string;
    readTime?: string;
    imageUrl?: string;
  };
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  searchTimeMs: number;
  nextCursor?: string;
}

export interface SearchProvider {
  search(query: string, options?: SearchOptions): Promise<SearchResponse>;
  index?(document: any): Promise<void>;
  remove?(id: string): Promise<void>;
  rebuild?(): Promise<void>;
}
