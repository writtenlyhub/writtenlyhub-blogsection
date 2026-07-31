"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { NewsletterModal } from '@/components/ui/NewsletterModal';
import { trackEvent } from '@/lib/analytics';
import { HelpCircle } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

export function NewsletterPopup({ data }: { data?: any }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Use CMS data or fallback to defaults
  const title = data?.title || 'Subscribe to Newsletter';
  const description = data?.description || 'Join 5,000+ marketers receiving our weekly insights on content strategy, SEO, and digital writing.';
  const buttonText = data?.buttonText || 'Subscribe Now';
  const isActive = data?.isActive !== false; // Default to true if undefined

  const [isInlineVisible, setIsInlineVisible] = useState(false);

  // Global event listener to open modal from anywhere (e.g. CTA blocks)
  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('open-newsletter-modal', handleOpenModal);
    return () => window.removeEventListener('open-newsletter-modal', handleOpenModal);
  }, []);

  // Self-contained observer to watch all inline CTA elements
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let pollInterval: NodeJS.Timeout;
    const visibilityMap = new Map<Element, boolean>();

    const setupObserver = (elements: NodeListOf<Element>) => {
      observer = new IntersectionObserver(
        (entries) => {
          let hasChanges = false;
          entries.forEach(entry => {
            if (visibilityMap.get(entry.target) !== entry.isIntersecting) {
              visibilityMap.set(entry.target, entry.isIntersecting);
              hasChanges = true;
            }
          });
          
          if (hasChanges) {
            // Hide if ANY inline CTA is currently visible
            const isAnyVisible = Array.from(visibilityMap.values()).some(v => v === true);
            setIsInlineVisible(isAnyVisible);
          }
        },
        { threshold: 0 }
      );
      elements.forEach(el => observer?.observe(el));
    };

    // Find elements immediately, or poll if they render later (like RichText blocks)
    const findAndObserve = () => {
      const els = document.querySelectorAll('[data-newsletter-cta="true"]');
      if (els.length > 0) {
        setupObserver(els);
        return true;
      }
      return false;
    };

    if (!findAndObserve()) {
      // Keep polling until we find them, since some blocks might be injected later
      // We cap it at 10 polls (5 seconds) so we don't poll forever on pages with no CTAs
      let polls = 0;
      pollInterval = setInterval(() => {
        polls++;
        if (findAndObserve() || polls > 10) {
          clearInterval(pollInterval);
        }
      }, 500);
    }

    return () => {
      if (observer) observer.disconnect();
      clearInterval(pollInterval);
    };
  }, []);
  useEffect(() => {
    if (!isActive || isDismissed) return;
    
    // If inline section is visible, hide popup immediately
    if (isInlineVisible) {
      setIsVisible(false);
      return;
    }

    // Wait a bit before showing to avoid immediate aggressiveness 
    // or when scrolling past the inline section
    const timer = setTimeout(() => {
      setIsVisible(true);
      trackEvent('newsletter_popup_opened', { source: 'Blog Popup' });
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, [isActive, isDismissed, isInlineVisible]);

  if (isDismissed || !isActive) return null;

  return (
    <>
      <div 
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-[calc(100%-2rem)] max-w-[340px] bg-surface-container-lowest border-t-[6px] border-t-writtenly-orange border-l border-r border-b border-outline-variant/30 rounded-b-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-out 
          ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none'}`}
      >
        {/* Header section (Clickable to toggle) */}
        <button 
          onClick={() => setIsMinimized(!isMinimized)}
          className="flex items-center justify-between w-full px-5 py-4 hover:bg-surface-container-low transition-colors"
        >
          <span className="font-label-md text-[11px] font-bold uppercase tracking-widest text-primary truncate">
            {title}
          </span>
          <div className="flex items-center gap-1 shrink-0 ml-4">
            <ChevronDown size={20} className={`text-outline transition-transform duration-300 ${isMinimized ? 'rotate-180' : ''}`} />
            <HelpCircle className="text-outline hover:text-error transition-colors text-[18px] ml-1" />
          </div>
        </button>

        {/* Expandable content area */}
        <div 
          className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${isMinimized ? 'max-h-0 py-0 opacity-0' : 'max-h-[500px] pb-6 opacity-100'}`}
        >
          <p className="text-[14px] md:text-[15px] text-on-surface-variant leading-relaxed mb-6">
            {description}
          </p>
          <div className="block w-full">
            <Button 
              ref={triggerRef}
              onClick={() => setIsModalOpen(true)}
              variant="primary" 
              className="w-full text-sm font-bold uppercase tracking-wider py-3.5"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>

      <NewsletterModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source="Blog Popup"
        triggerRef={triggerRef}
      />
    </>
  );
}
