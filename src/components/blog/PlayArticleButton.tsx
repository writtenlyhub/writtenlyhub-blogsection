'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export function PlayArticleButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesisAvailable(true);
      
      // Cleanup on unmount
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (!speechSynthesisAvailable) return;

    const synth = window.speechSynthesis;

    if (isPlaying) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
    } else {
      const article = document.querySelector('article');
      if (!article) return;
      
      // Extract text content from the article container
      const textToRead = article.innerText || article.textContent || '';
      
      if (!textToRead.trim()) return;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      // Optional: adjust rate or pitch here
      utterance.rate = 1.0;
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      
      synth.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if (!speechSynthesisAvailable) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!speechSynthesisAvailable) return null;

  return (
    <div className="flex flex-col shrink-0">
      <span className="text-xs font-bold uppercase tracking-widest text-outline mb-4 block">Listen</span>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="flex-1 !px-4 py-2 text-sm border-outline-variant hover:border-writtenly-orange hover:text-writtenly-orange hover:bg-writtenly-orange/5 transition-colors flex items-center justify-center gap-2"
          onClick={handlePlayPause}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isPlaying && !isPaused ? 'pause' : 'play_arrow'}
          </span>
          {isPlaying && !isPaused ? 'Pause' : isPlaying && isPaused ? 'Resume' : 'Play Article'}
        </Button>
        {isPlaying && (
          <Button 
            variant="outline" 
            className="!px-3 py-2 text-sm border-outline-variant hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
            onClick={handleStop}
            title="Stop"
            aria-label="Stop playback"
          >
            <span className="material-symbols-outlined text-[20px]">stop</span>
          </Button>
        )}
      </div>
    </div>
  );
}
