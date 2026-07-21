"use client";

import React, { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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

  return (
    <div 
      className="fixed top-16 left-0 h-[2px] w-full bg-writtenly-orange z-50 origin-left transition-transform duration-150 ease-out"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
}
