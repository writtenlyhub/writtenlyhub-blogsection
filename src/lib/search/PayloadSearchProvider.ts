import { getPayloadClient } from '../api/payload';
import { SearchProvider, SearchOptions, SearchResponse, SearchResult } from './types';

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateSnippet(text: string, query: string): string {
  if (!text || !query) return '';
  const cleanText = text.replace(/<[^>]*>?/gm, ''); // strip html just in case
  const matchIndex = cleanText.toLowerCase().indexOf(query.toLowerCase());
  
  if (matchIndex === -1) {
    const rawSnippet = cleanText.substring(0, 150) + (cleanText.length > 150 ? '...' : '');
    return escapeHtml(rawSnippet);
  }

  const start = Math.max(0, matchIndex - 50);
  const end = Math.min(cleanText.length, matchIndex + query.length + 50);
  let snippet = cleanText.substring(start, end);

  // HTML escape the snippet first to prevent XSS
  snippet = escapeHtml(snippet);

  // Safe highlighting using regex
  // We must HTML-escape the query too, because the snippet is now escaped
  const htmlEscapedQuery = escapeHtml(query);
  const regex = new RegExp(`(${escapeRegExp(htmlEscapedQuery)})`, 'gi');
  snippet = snippet.replace(regex, '<mark>$1</mark>');

  return (start > 0 ? '...' : '') + snippet + (end < cleanText.length ? '...' : '');
}

export class PayloadSearchProvider implements SearchProvider {
  async search(query: string, options?: SearchOptions): Promise<SearchResponse> {
    const startTime = performance.now();
    const limit = options?.limit || 10;
    const page = parseInt(options?.cursor || '1', 10);
    const maxFetch = 100; // Hard limit for memory scoring

    const payload = await getPayloadClient();
    
    // Normalize query
    const normalizedQuery = query.toLowerCase().trim();
    
    // Fetch up to 100 matching documents
    const payloadRes = await payload.find({
      collection: 'blogs',
      where: {
        and: [
          { _status: { equals: 'published' } },
          { searchDocument: { like: normalizedQuery } }
        ]
      },
      depth: 1, // need category and author info
      limit: maxFetch,
    });

    // Score and Rank
    const scoredResults: SearchResult[] = payloadRes.docs.map((doc: any) => {
      let score = 0;
      const titleLower = (doc.title || '').toLowerCase();
      const excerptLower = (doc.excerpt || '').toLowerCase();
      const catLower = typeof doc.category === 'object' ? (doc.category?.title || '').toLowerCase() : '';
      const contentLower = (doc.searchDocument || '').toLowerCase();

      if (titleLower.includes(normalizedQuery)) score += 100;
      if (excerptLower.includes(normalizedQuery)) score += 60;
      if (catLower.includes(normalizedQuery)) score += 40;
      if (contentLower.includes(normalizedQuery)) score += 30; // matched somewhere in the body

      return {
        id: doc.id,
        type: 'blog',
        title: doc.title,
        url: `/blog/${doc.slug}`,
        snippet: generateSnippet(doc.excerpt || doc.searchDocument || '', normalizedQuery),
        relevanceScore: score,
        metadata: {
          category: typeof doc.category === 'object' ? doc.category?.title : undefined,
          author: typeof doc.author === 'object' ? doc.author?.name : undefined,
          date: doc.publishedDate || doc.createdAt,
          readTime: doc.readTime,
          imageUrl: typeof doc.featuredImage === 'object' ? doc.featuredImage?.url : undefined,
        }
      };
    });

    // Sort by relevance
    scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Paginate in memory
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = scoredResults.slice(startIndex, endIndex);

    const nextCursor = endIndex < scoredResults.length ? (page + 1).toString() : undefined;

    return {
      results: paginatedResults,
      total: scoredResults.length,
      query,
      searchTimeMs: Math.round(performance.now() - startTime),
      nextCursor,
    };
  }
}
