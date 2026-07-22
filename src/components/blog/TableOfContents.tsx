"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { TocItem } from '@/types/blog';

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
        rootMargin: '-140px 0px -80% 0px',
        threshold: 0
      }
    );

    headingElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) {
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
    <nav className="flex flex-col gap-1">
      {nestedItems.map(item => {
        const isGroupActive = activeParentId === item.id;
        const hasChildren = item.children.length > 0;
        const isItemActive = activeId === item.id;

        return (
          <div key={item.id} className="flex flex-col">
            <a
              href={`#${item.id}`}
              onClick={() => setMobileExpanded(false)}
              className={`block py-2.5 px-4 text-[15px] border-l-[3px] transition-all duration-200 ${
                isItemActive
                  ? 'border-writtenly-orange bg-surface-container-low text-primary font-medium'
                  : isGroupActive
                  ? 'border-transparent text-primary font-medium'
                  : 'border-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest'
              }`}
            >
              {item.title}
            </a>
            
            {hasChildren && (
              <div 
                className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                  isGroupActive || !isDesktop ? 'max-h-[1000px] opacity-100 py-1' : 'max-h-0 opacity-0'
                }`}
              >
                {item.children.map(child => {
                  const isChildActive = activeId === child.id;
                  return (
                    <a
                      key={child.id}
                      href={`#${child.id}`}
                      onClick={() => setMobileExpanded(false)}
                      className={`block py-2 pl-6 pr-4 text-[14px] border-l-[3px] transition-all duration-200 ${
                        isChildActive
                          ? 'border-writtenly-orange bg-surface-container-low text-primary font-medium'
                          : 'border-transparent text-on-surface-variant/80 hover:text-primary hover:bg-surface-container-lowest'
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
        <div className="flex flex-col gap-8">
          <div className="bg-transparent flex flex-col gap-stack-md">
            <h3 className="font-headline-md text-[18px] font-bold text-primary mb-3 border-b border-outline-variant pb-4">
              Table of Contents
            </h3>
            {renderTocList()}
          </div>

          <div className="pt-6 border-t border-outline-variant shrink-0">
            <span className="text-xs font-bold uppercase tracking-widest text-outline mb-4 block">Share</span>
            <div className="flex items-center gap-4">
              <a className="text-on-surface-variant hover:text-secondary-container transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </a>
              <a className="text-on-surface-variant hover:text-secondary-container transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">alternate_email</span>
              </a>
              <a className="text-on-surface-variant hover:text-secondary-container transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">link</span>
              </a>
              <a className="text-on-surface-variant hover:text-secondary-container transition-colors" href="#">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // Mobile / Tablet logic
  return (
    <aside className="block lg:hidden w-full bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden">
      <button 
        onClick={() => setMobileExpanded(!mobileExpanded)}
        className="w-full flex items-center justify-between p-5 md:pointer-events-none"
      >
        <h3 className="font-headline-md text-[18px] font-bold text-primary m-0">
          Table of Contents
        </h3>
        <span className={`material-symbols-outlined transition-transform duration-300 md:hidden ${mobileExpanded ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      
      <div 
        className={`md:max-h-[2000px] md:opacity-100 transition-all duration-300 ease-in-out ${
          mobileExpanded ? 'max-h-[2000px] opacity-100 pb-5' : 'max-h-0 opacity-0 md:pb-5'
        }`}
      >
        <div className="px-5 border-t border-outline-variant/50 pt-3 md:border-t-0 md:pt-0">
          {renderTocList()}
        </div>
      </div>
    </aside>
  );
}
