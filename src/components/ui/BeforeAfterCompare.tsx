'use client';

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import Image from 'next/image';
import { GripVertical } from 'lucide-react';

interface BeforeAfterCompareProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  aspectRatio?: string;
}

export default function BeforeAfterCompare({
  beforeImage,
  afterImage,
  beforeAlt = 'Before',
  afterAlt = 'After',
  aspectRatio = 'aspect-[848/1264]'
}: BeforeAfterCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percentage);
  };

  const onMouseMove = (e: globalThis.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: globalThis.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectRatio} rounded-2xl shadow-2xl border border-border-subtle overflow-hidden cursor-ew-resize select-none group`}
      onMouseDown={(e: MouseEvent) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e: TouchEvent) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Background) */}
      <Image 
        src={afterImage} 
        alt={afterAlt} 
        fill 
        className="object-cover pointer-events-none" 
        priority
      />

      {/* Before Image (Foreground, clipped) */}
      <div 
        className="absolute top-0 left-0 bottom-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || '100vw' }}>
          <Image 
            src={beforeImage} 
            alt={beforeAlt} 
            fill 
            className="object-cover max-w-none pointer-events-none" 
            priority
          />
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-transform duration-75"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-container text-primary-container transition-transform group-hover:scale-110">
          <GripVertical size={20} />
        </div>
      </div>
    </div>
  );
}
