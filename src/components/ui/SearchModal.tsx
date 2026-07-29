'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  id: string;
  type: 'blog' | 'author' | 'category';
  title: string;
  url: string;
  snippet?: string;
  metadata?: {
    category?: string;
    readTime?: string;
    author?: string;
  };
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  searchTimeMs: number;
}

const TRENDING_SEARCHES = ['SEO', 'Content Marketing', 'AI', 'Next.js'];

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<{ total: number; timeMs: number } | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load recent searches
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recentSearches');
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch (e) {}
      }
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim();
    let updated = [cleanTerm, ...recentSearches.filter(s => s.toLowerCase() !== cleanTerm.toLowerCase())];
    updated = updated.slice(0, 10); // cap at 10
    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch logic
  useEffect(() => {
    let active = true;

    if (!debouncedQuery.trim()) {
      setResults([]);
      setMeta(null);
      setIsLoading(false);
      return;
    }

    const fetchSearch = async () => {
      setIsLoading(true);
      setSelectedIndex(-1);
      try {
        const res = await fetch(`/api/v1/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (!res.ok) throw new Error('Search failed');
        const data: SearchResponse = await res.json();
        if (active) {
          setResults(data.results);
          setMeta({ total: data.total, timeMs: data.searchTimeMs });
        }
      } catch (err) {
        console.error(err);
        if (active) setResults([]);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchSearch();
    return () => { active = false; };
  }, [debouncedQuery]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  const handleSelect = useCallback((url: string, term?: string) => {
    if (term) saveRecentSearch(term);
    else saveRecentSearch(query);
    
    onClose();
    router.push(url);
  }, [query, recentSearches, router, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Determine what list is currently shown
      let items: Array<{ url?: string; term?: string }> = [];
      
      if (query.trim() && results.length > 0) {
        items = results.map(r => ({ url: r.url, term: r.title }));
      } else if (!query.trim() && !isLoading) {
        // Shown recent + trending
        items = [
          ...recentSearches.map(rs => ({ term: rs })),
          ...TRENDING_SEARCHES.map(ts => ({ term: ts }))
        ];
      }
      
      const actionableItems = items.length;
      
      if (actionableItems === 0) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < actionableItems - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < actionableItems) {
          e.preventDefault();
          const selected = items[selectedIndex];
          if (selected.url) {
            handleSelect(selected.url);
          } else if (selected.term) {
            setQuery(selected.term);
            inputRef.current?.focus();
            setSelectedIndex(-1);
          }
        } else if (query.trim()) {
          // If no specific item selected, go to blog archive search
          e.preventDefault();
          saveRecentSearch(query);
          onClose();
          router.push(`/blog?q=${encodeURIComponent(query)}`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, query, handleSelect, onClose, router, recentSearches, isLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-surface w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-outline-variant transform transition-all">
        {/* Search Input Area */}
        <div className="flex items-center px-4 py-4 border-b border-outline-variant bg-surface-container-lowest">
          <span className="material-symbols-outlined text-on-surface-variant text-[24px] mr-3">search</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-on-surface font-body-lg placeholder-on-surface-variant/50"
            placeholder="Search documentation, articles, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="p-1 rounded hover:bg-surface-container-low text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
          <div className="ml-3 px-2 py-1 bg-surface-container-low rounded text-[10px] font-bold text-on-surface-variant border border-outline-variant hidden sm:block">
            ESC
          </div>
        </div>

        {/* Results Area */}
        <div ref={resultsRef} className="flex-1 overflow-y-auto p-2">
          
          {isLoading && query.trim() ? (
            <div className="p-4 flex flex-col gap-4">
              <div className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Searching...</div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse flex flex-col gap-2 p-3">
                  <div className="h-5 bg-surface-container-high rounded w-3/4"></div>
                  <div className="h-4 bg-surface-container-low rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : query.trim() && results.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 flex justify-between items-center text-xs font-bold text-outline uppercase tracking-wider">
                <span>Articles</span>
                {meta && <span className="lowercase text-outline-variant font-normal">{meta.total} results in {meta.timeMs}ms</span>}
              </div>
              <ul className="flex flex-col">
                {results.map((res, idx) => (
                  <li key={res.id}>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg flex flex-col gap-1 transition-colors ${
                        idx === selectedIndex ? 'bg-surface-container-low' : 'hover:bg-surface-container-lowest'
                      }`}
                      onClick={() => handleSelect(res.url)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-headline-sm text-primary font-bold line-clamp-1">
                          {res.title}
                        </h4>
                        {res.metadata?.category && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary-container/20 text-secondary-container px-2 py-1 rounded shrink-0">
                            {res.metadata.category}
                          </span>
                        )}
                      </div>
                      {res.snippet && (
                        <p 
                          className="text-sm text-on-surface-variant line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: res.snippet }}
                        />
                      )}
                      <div className="flex items-center gap-3 text-xs text-outline mt-1 font-label-sm">
                        {res.metadata?.author && <span>By {res.metadata.author}</span>}
                        {res.metadata?.readTime && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-outline-variant" />
                            <span>{res.metadata.readTime}</span>
                          </>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : query.trim() && !isLoading ? (
             <div className="p-8 text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">search_off</span>
                <p className="font-headline-sm text-on-surface mb-2">No results found for "{query}"</p>
                <div className="text-on-surface-variant text-sm flex flex-col gap-1">
                  <span>Suggestions:</span>
                  <span>• Check your spelling</span>
                  <span>• Try fewer words</span>
                </div>
             </div>
          ) : (
            <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="px-3 py-2 text-xs font-bold text-outline uppercase tracking-wider">
                    Recent Searches
                  </div>
                  <ul className="flex flex-col">
                    {recentSearches.map((rs, idx) => (
                      <li key={idx}>
                        <button 
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                            idx === selectedIndex ? 'bg-surface-container-low text-primary' : 'text-on-surface-variant hover:bg-surface-container-lowest hover:text-primary'
                          }`}
                          onClick={() => {
                            setQuery(rs);
                            inputRef.current?.focus();
                            setSelectedIndex(-1);
                          }}
                          onMouseEnter={() => setSelectedIndex(idx)}
                        >
                          <span className="material-symbols-outlined text-[16px] text-outline-variant">history</span>
                          {rs}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <div className="px-3 py-2 text-xs font-bold text-outline uppercase tracking-wider">
                  Trending
                </div>
                <ul className="flex flex-col">
                  {TRENDING_SEARCHES.map((ts, idx) => {
                    const globalIdx = recentSearches.length + idx;
                    return (
                      <li key={idx}>
                        <button 
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                            globalIdx === selectedIndex ? 'bg-surface-container-low text-primary' : 'text-on-surface-variant hover:bg-surface-container-lowest hover:text-primary'
                          }`}
                          onClick={() => {
                            setQuery(ts);
                            inputRef.current?.focus();
                            setSelectedIndex(-1);
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                        >
                          <span className="material-symbols-outlined text-[16px] text-writtenly-orange">trending_up</span>
                          {ts}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-3 bg-surface-container-lowest border-t border-outline-variant flex items-center gap-6 hidden sm:flex">
          <div className="flex items-center gap-2 text-xs font-label-md text-outline">
            <span className="material-symbols-outlined text-[14px]">keyboard_return</span>
            <span>to select</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-label-md text-outline">
            <span className="material-symbols-outlined text-[14px]">unfold_more</span>
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-label-md text-outline">
            <span className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant font-bold leading-none tracking-widest text-[10px]">ESC</span>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
