"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export function NewsletterPopup({ data }: { data?: any }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use CMS data or fallback to defaults
  const title = data?.title || 'Subscribe to Newsletter';
  const description = data?.description || 'Join 5,000+ marketers receiving our weekly insights on content strategy, SEO, and digital writing.';
  const buttonText = data?.buttonText || 'Subscribe Now';
  const buttonLink = data?.buttonLink || '#newsletter';
  const isActive = data?.isActive !== false; // Default to true if undefined

  // Delay the popup appearance by 3 seconds so it's not instantly aggressive
  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isActive]);

  if (isDismissed || !isVisible || !isActive) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-[calc(100%-2rem)] max-w-[340px] bg-surface-container-lowest border-t-[6px] border-t-writtenly-orange border-l border-r border-b border-outline-variant/30 rounded-b-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-out animate-in slide-in-from-bottom-10 fade-in">
      {/* Header section (Clickable to toggle) */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className="flex items-center justify-between w-full px-5 py-4 hover:bg-surface-container-low transition-colors"
      >
        <span className="font-label-md text-[11px] font-bold uppercase tracking-widest text-primary truncate">
          {title}
        </span>
        <div className="flex items-center gap-1 shrink-0 ml-4">
          <span className={`material-symbols-outlined text-outline transition-transform duration-300 text-[20px] ${isMinimized ? 'rotate-180' : ''}`}>
            expand_more
          </span>
          <span 
            className="material-symbols-outlined text-outline hover:text-error transition-colors text-[18px] ml-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
          >
            close
          </span>
        </div>
      </button>

      {/* Expandable content area */}
      <div 
        className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${isMinimized ? 'max-h-0 py-0 opacity-0' : 'max-h-[500px] pb-6 opacity-100'}`}
      >
        <p className="text-[14px] md:text-[15px] text-on-surface-variant leading-relaxed mb-6">
          {description}
        </p>
        <a href={buttonLink} className="no-underline block w-full">
          <Button variant="primary" className="w-full text-sm font-bold uppercase tracking-wider py-3.5">
            {buttonText}
          </Button>
        </a>
      </div>
    </div>
  );
}
