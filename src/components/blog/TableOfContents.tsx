"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { TocItem } from '@/types/blog';
import { SocialShare } from '@/components/blog/SocialShare';

export interface TableOfContentsProps {
  items: TocItem[];
  isDesktop?: boolean;
  isMobile?: boolean;
}

interface NestedTocItem extends TocItem {
  children: TocItem[];
}

export function TableOfContents({ items, isDesktop, isMobile }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [mobileExpanded, setMobileExpanded] = useState<boolean>(false);

  const nestedItems = useMemo(() => {
    const result: NestedTocItem[] = [];
    let currentH2: NestedTocItem | null = null;

    items.forEach(item => {
      if (item.level === 2) {
        currentH2 = { ...item, children: [] };
        result.push(currentH2);
      } else if (item.level === 3 && currentH2) {
        currentH2.children.push(item);
      }
    });

    return result;
  }, [items]);

  useEffect(() => {
    const headingElements = items
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];
    
    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -40% 0px',
        threshold: 0
      }
    );

    headingElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [items]);

  const showToc = items && items.length >= 2;

  if (!showToc && !isDesktop) {
    return null;
  }

  // Determine which H2 group is currently active (either the H2 itself or one of its H3s)
  const activeParentId = useMemo(() => {
    for (const item of nestedItems) {
      if (item.id === activeId || item.children.some(child => child.id === activeId)) {
        return item.id;
      }
    }
    return '';
  }, [activeId, nestedItems]);

  const renderTocList = () => (
    <nav aria-labelledby="toc-heading" className="flex flex-col gap-0.5">
      {nestedItems.map(item => {
        const isGroupActive = activeParentId === item.id;
        const hasChildren = item.children.length > 0;
        const isItemActive = activeId === item.id;

        return (
          <div key={item.id} className="flex flex-col">
            <a
              href={`#${item.id}`}
              onClick={() => setMobileExpanded(false)}
              className={`block py-2 px-3 text-[14px] leading-snug transition-all duration-75 ${
                isItemActive
                  ? 'bg-primary/5 text-primary font-medium'
                  : isGroupActive
                  ? 'text-primary font-medium'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest'
              }`}
            >
              {item.title}
            </a>
            
            {hasChildren && (
              <div 
                className={`flex flex-col overflow-hidden transition-all duration-150 ease-in-out ${
                  isGroupActive || !isDesktop ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {item.children.map(child => {
                  const isChildActive = activeId === child.id;
                  return (
                    <a
                      key={child.id}
                      href={`#${child.id}`}
                      onClick={() => setMobileExpanded(false)}
                      className={`block py-1.5 pl-6 pr-3 text-[13px] leading-snug transition-all duration-75 ${
                        isChildActive
                          ? 'bg-primary/5 text-primary font-medium'
                          : 'text-on-surface-variant/80 hover:text-primary hover:bg-surface-container-lowest'
                      }`}
                    >
                      {child.title}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  if (isDesktop) {
    return (
      <aside className="hidden lg:block w-full max-w-[320px]">
        <div className="flex flex-col gap-6">
          {showToc && (
            <div className="bg-transparent flex flex-col gap-1">
              <h2 id="toc-heading" className="font-bold text-[16px] text-on-surface mb-2 shrink-0 px-3">
                Contents
              </h2>
              <div className="pr-2">
                {renderTocList()}
              </div>
            </div>
          )}

          <div className={`${showToc ? 'pt-6 border-t border-outline-variant' : ''} shrink-0`}>
            <span className="font-label-sm text-label-sm font-bold uppercase text-outline mb-4 block">Share</span>
            <SocialShare title="Check out this article" layout="horizontal" />
          </div>
        </div>
      </aside>
    );
  }

  // Mobile / Tablet logic
  return (
    <aside className="block lg:hidden w-full border-y border-outline-variant/40 py-2 mb-8 mt-2">
      <button 
        onClick={() => setMobileExpanded(!mobileExpanded)}
        aria-expanded={mobileExpanded}
        aria-controls="toc-mobile-content"
        className="w-full flex items-center justify-between py-4"
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-outline text-[20px]">menu_book</span>
          <h2 id="toc-heading-mobile" className="font-label-md text-label-md font-bold text-primary uppercase m-0">
            Table of Contents
          </h2>
        </div>
        <span className={`material-symbols-outlined text-outline transition-transform duration-300 md:hidden ${mobileExpanded ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      
      <div 
        id="toc-mobile-content"
        className={`md:max-h-[2000px] md:opacity-100 transition-all duration-300 ease-in-out overflow-hidden ${
          mobileExpanded ? 'max-h-[2000px] opacity-100 pb-6' : 'max-h-0 opacity-0 md:pb-6'
        }`}
      >
        <div className="pt-2">
          {renderTocList()}
        </div>
      </div>
    </aside>
  );
}
