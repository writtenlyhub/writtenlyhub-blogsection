'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Square, Play, Pause } from 'lucide-react';

export function PlayArticleButton({ layout = 'default', inverted = false }: { layout?: 'default' | 'compact', inverted?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false);
  const [chunks, setChunks] = useState<{text: string, accumulatedChars: number}[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const isCanceledRef = useRef(false);

  const totalChars = chunks.length > 0 ? chunks[chunks.length - 1].accumulatedChars + chunks[chunks.length - 1].text.length : 0;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesisAvailable(true);
      
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || chunks.length === 0) return;

    const synth = window.speechSynthesis;
    let isCanceled = false;

    if (currentChunkIndex >= chunks.length) {
      setIsPlaying(false);
      setCurrentChunkIndex(0);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[currentChunkIndex].text);
    utterance.rate = 1.0;
    
    utterance.onboundary = (e) => {
      if (isCanceled) return;
      if (e.name === 'word') {
        setCurrentCharIndex(chunks[currentChunkIndex].accumulatedChars + e.charIndex);
      }
    };
    
    utterance.onend = () => {
      if (!isCanceled) {
        setCurrentChunkIndex(prev => prev + 1);
        if (currentChunkIndex + 1 < chunks.length) {
           setCurrentCharIndex(chunks[currentChunkIndex + 1].accumulatedChars);
        }
      }
    };
    
    utterance.onerror = (e) => {
       if (!isCanceled && e.error !== 'canceled' && e.error !== 'interrupted') {
         setIsPlaying(false);
         setIsPaused(false);
       }
    };

    // Workaround for Chrome sometimes getting stuck after cancel
    synth.resume();
    synth.speak(utterance);

    // If it was paused when chunk changed, pause it again
    if (isPaused) {
      synth.pause();
    }

    return () => {
      isCanceled = true;
      synth.cancel();
    };
  }, [currentChunkIndex, isPlaying, chunks]);

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
      
      const textToRead = article.innerText || article.textContent || '';
      if (!textToRead.trim()) return;

      let accChars = 0;
      const newChunks = textToRead.split(/([.!?\n]+)/).reduce((acc, curr, i, arr) => {
        if (i % 2 === 0) {
          const punc = arr[i+1] || '';
          const chunkText = (curr + punc).trim();
          if (chunkText) {
            acc.push({
               text: chunkText,
               accumulatedChars: accChars
            });
            accChars += chunkText.length;
          }
        }
        return acc;
      }, [] as {text: string, accumulatedChars: number}[]);

      setChunks(newChunks);
      setCurrentChunkIndex(0);
      setCurrentCharIndex(0);
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
    <div className={`shrink-0 ${layout === 'compact' ? 'flex items-center gap-2 sm:gap-3 w-auto' : 'flex flex-col w-full'}`}>
      {layout !== 'compact' && (
        <span className={`text-xs font-bold uppercase tracking-widest ${inverted ? 'text-white/60' : 'text-outline'} mb-4 block`}>Listen</span>
      )}
      
      <div className="flex items-center gap-2 shrink-0">
        <Button 
          variant={inverted ? 'invertedOutline' : 'outline'} 
          className={`${layout === 'compact' ? '!px-3 py-1.5 text-xs' : 'flex-1 !px-4 py-2 text-sm'} ${!inverted ? 'border-outline-variant hover:border-writtenly-orange hover:text-writtenly-orange hover:bg-writtenly-orange/5' : 'hover:border-writtenly-orange hover:text-writtenly-orange'} transition-colors flex items-center justify-center gap-2`}
          onClick={handlePlayPause}
        >
          {isPlaying && !isPaused ? (
            <Pause size={layout === 'compact' ? 18 : 20} />
          ) : (
            <Play size={layout === 'compact' ? 18 : 20} />
          )}
          {isPlaying && !isPaused ? 'Pause' : isPlaying && isPaused ? 'Resume' : 'Listen'}
        </Button>
        
        {isPlaying && (
          <Button 
            variant={inverted ? 'invertedOutline' : 'outline'} 
            className={`${layout === 'compact' ? '!px-2 py-1.5' : '!px-3 py-2'} text-sm ${!inverted ? 'border-outline-variant hover:border-red-500 hover:text-red-500 hover:bg-red-50' : 'hover:border-red-400 hover:text-red-400 hover:bg-red-500/20'} transition-colors flex items-center justify-center`}
            onClick={handleStop}
            title="Stop"
            aria-label="Stop playback"
          >
            <Square size={layout === 'compact' ? 18 : 20} />
          </Button>
        )}
      </div>

      {isPlaying && chunks.length > 0 && (
        <div className={`${layout === 'compact' ? 'flex items-center gap-2 w-[100px] sm:w-[150px]' : 'mt-4 flex items-center gap-3 px-1 w-full'}`}>
          <span className={`${layout === 'compact' ? 'text-[10px] min-w-[28px]' : 'text-[11px] min-w-[32px]'} font-bold ${inverted ? 'text-white/80' : 'text-on-surface-variant'} text-right tabular-nums shrink-0`}>
            {totalChars > 0 ? Math.round((currentCharIndex / totalChars) * 100) : 0}%
          </span>
          <div className="relative flex-1 flex items-center h-4">
            <input 
              type="range"
              min="0"
              max="100"
              value={totalChars > 0 ? (currentCharIndex / totalChars) * 100 : 0}
              onChange={(e) => {
                const percentage = Number(e.target.value);
                const targetChar = (percentage / 100) * totalChars;
                
                let targetChunkIndex = 0;
                for (let i = 0; i < chunks.length; i++) {
                  if (chunks[i].accumulatedChars <= targetChar) {
                    targetChunkIndex = i;
                  } else {
                    break;
                  }
                }
                
                setCurrentChunkIndex(targetChunkIndex);
                setCurrentCharIndex(chunks[targetChunkIndex].accumulatedChars);
                
                if (isPaused) {
                  setIsPaused(false);
                  window.speechSynthesis.resume();
                }
              }}
              className="absolute w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-writtenly-orange [&::-webkit-slider-thumb]:rounded-full focus:outline-none focus:ring-2 focus:ring-writtenly-orange/30 z-10"
              style={{
                background: `linear-gradient(to right, #fe6b00 ${totalChars > 0 ? (currentCharIndex / totalChars) * 100 : 0}%, ${inverted ? 'rgba(255,255,255,0.15)' : '#e5e7eb'} ${totalChars > 0 ? (currentCharIndex / totalChars) * 100 : 0}%)`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
