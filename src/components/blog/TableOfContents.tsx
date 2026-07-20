'use client';

import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const lenis = useLenis();

  useEffect(() => {
    // Wait a brief moment for the HTML content to render
    const extractHeadings = () => {
      const elements = Array.from(document.querySelectorAll('article h2, article h3'));
      
      const items: TOCItem[] = elements.map((el, index) => {
        // Ensure each heading has an ID
        if (!el.id) {
          el.id = `heading-${index}`;
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: el.tagName.toLowerCase() === 'h2' ? 2 : 3,
        };
      });
      
      setHeadings(items);
    };

    extractHeadings();
    
    // Setup intersection observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    const elements = document.querySelectorAll('article h2, article h3');
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -120 });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block pr-4" style={{ scrollbarWidth: 'none' }}>
      <h4 className="font-label-md text-label-md font-bold text-writtenly-navy/50 tracking-wider mb-6">ON THIS PAGE</h4>
      <ul className="flex flex-col gap-3 font-body-md text-body-md">
        {headings.map((heading) => (
          <li 
            key={heading.id} 
            className={`transition-colors ${heading.level === 3 ? 'ml-4' : ''}`}
          >
            <a 
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block leading-snug border-l-2 pl-4 py-1 transition-all ${
                activeId === heading.id 
                  ? 'border-writtenly-orange text-writtenly-navy font-bold' 
                  : 'border-outline-variant/30 text-on-surface-variant/70 hover:text-writtenly-orange hover:border-writtenly-orange/50'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
