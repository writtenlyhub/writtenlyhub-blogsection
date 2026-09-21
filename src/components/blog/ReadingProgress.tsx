"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById('reading-progress-container'));

    let ticking = false;
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((currentScroll / scrollHeight) * 100);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!container) return null;

  return createPortal(
    <div 
      className="h-full w-full bg-writtenly-orange origin-left transition-transform duration-150 ease-out"
      style={{ transform: `scaleX(${progress / 100})` }}
    />,
    container
  );
}
