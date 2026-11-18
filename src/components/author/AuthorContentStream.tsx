'use client';

import React, { useState, useMemo } from 'react';
import { UI_Blog } from '@/types/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { Search, ChevronDown, FileText, Loader2 } from 'lucide-react';

interface AuthorContentStreamProps {
  authorName: string;
  articles: UI_Blog[];
  totalAllCount: number;
  totalBlogsCount: number;
  totalNewsCount: number;
}

export function AuthorContentStream({
  authorName,
  articles,
  totalAllCount,
  totalBlogsCount,
  totalNewsCount,
}: AuthorContentStreamProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'news'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const firstName = authorName.split(' ')[0] || authorName;

  // Filter and sort items
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // 1. Filter by content type tab
    if (activeTab === 'blog') {
      result = result.filter((a) => a.contentType === 'blog');
    } else if (activeTab === 'news') {
      result = result.filter((a) => a.contentType === 'news');
    }

    // 2. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt?.toLowerCase().includes(q) ||
          a.category?.title?.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    result.sort((a, b) => {
      const timeA = new Date(a.publishedDate || 0).getTime();
      const timeB = new Date(b.publishedDate || 0).getTime();
      return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [articles, activeTab, searchQuery, sortBy]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 250);
  };

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-container-max mx-auto px-6 md:px-gutter">
        {/* Tabs & Search/Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-12 border-b border-outline-variant/30">
          {/* Content Type Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0" id="filter-tab-group">
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                setVisibleCount(9);
              }}
              className={`px-5 py-2.5 rounded-full font-label-md text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-writtenly-navy text-white font-bold shadow-xs'
                  : 'text-on-surface-variant font-medium hover:text-writtenly-navy hover:bg-surface-container'
              }`}
            >
              All Content ({totalAllCount})
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('blog');
                setVisibleCount(9);
              }}
              className={`px-5 py-2.5 rounded-full font-label-md text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-writtenly-navy text-white font-bold shadow-xs'
                  : 'text-on-surface-variant font-medium hover:text-writtenly-navy hover:bg-surface-container'
              }`}
            >
              Blogs &amp; Guides ({totalBlogsCount})
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('news');
                setVisibleCount(9);
              }}
              className={`px-5 py-2.5 rounded-full font-label-md text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-writtenly-navy text-white font-bold shadow-xs'
                  : 'text-on-surface-variant font-medium hover:text-writtenly-navy hover:bg-surface-container'
              }`}
            >
              News &amp; Market Updates ({totalNewsCount})
            </button>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/70 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(9);
                }}
                placeholder={`Search ${firstName}'s articles...`}
                className="w-full pl-10 pr-4 py-2.5 text-body-md rounded-full bg-surface-container-lowest text-on-surface placeholder:text-outline border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-writtenly-orange transition-all shadow-xs"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="w-full sm:w-auto appearance-none bg-surface-container-lowest text-writtenly-navy font-label-md text-xs sm:text-sm pl-4 pr-10 py-2.5 rounded-full border border-outline-variant/40 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-writtenly-orange font-semibold"
              >
                <option value="newest">Sort by: Newest First</option>
                <option value="oldest">Sort by: Oldest First</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-writtenly-navy pointer-events-none w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-writtenly-navy tracking-tight">
              Published Articles by {firstName}
            </h2>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant/80 mt-1">
              Thought leadership, comprehensive frameworks, and industry analysis.
            </p>
          </div>
          <span className="hidden sm:inline-block font-label-md text-xs sm:text-sm text-on-surface-variant font-medium">
            Showing {displayedArticles.length} of {filteredArticles.length} stories
          </span>
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 ? (
          <div className="bg-surface-container-low rounded-2xl p-12 text-center border border-outline-variant/30 max-w-xl mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-4 text-on-surface-variant">
              <FileText className="w-8 h-8 opacity-60" />
            </div>
            <h4 className="font-headline-md text-lg text-writtenly-navy font-bold mb-2">
              No articles found
            </h4>
            <p className="font-body-md text-sm text-on-surface-variant mb-6">
              {searchQuery
                ? `No articles matched your search query "${searchQuery}".`
                : `${firstName} has not published articles in this category yet.`}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-5 py-2 rounded-full bg-writtenly-navy text-white font-label-md text-xs font-semibold hover:bg-writtenly-navy-hover transition-colors cursor-pointer"
              >
                Clear Search Query
              </button>
            )}
          </div>
        ) : (
          <>
            {/* 3-Column Responsive Blog Cards Grid (Native BlogCard Component) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {displayedArticles.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Pagination / Load More */}
            {hasMore && (
              <div className="mt-16 flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-surface-container text-writtenly-navy font-label-md text-sm font-bold hover:bg-surface-container-high transition-colors shadow-xs cursor-pointer disabled:opacity-75"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-writtenly-orange" />
                      <span>Fetching records...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More Articles</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
                <span className="font-body-md text-xs text-on-surface-variant">
                  Showing {displayedArticles.length} of {filteredArticles.length} published stories
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
