'use client';
import { m, LazyMotion, useReducedMotion } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';

const loadFeatures = () => import('framer-motion').then((res) => res.domAnimation);

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  distance?: number;
  ease?: [number, number, number, number] | readonly [number, number, number, number];
}

/**
 * A highly optimized, subtle entrance animation wrapper.
 * Automatically strips motion if the user prefers reduced motion.
 * Uses a conservative translation to feel premium, not distracting.
 */
export function FadeIn({ 
  children, 
  delay = 0, 
  className = '', 
  direction = 'up', 
  duration = 1.2,
  distance,
  ease = [0.22, 1, 0.36, 1] as const
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only mount the animation logic on the client.
  // If JS fails, hydration fails, or we are on the server, the content remains fully visible.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const d = distance !== undefined ? distance : 30;

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: d };
      case 'down': return { y: -d };
      case 'left': return { x: d };
      case 'right': return { x: -d };
      default: return { x: 0, y: 0 };
    }
  };

  // 1. Server-side rendering (isMounted = false)
  // 2. Fallback if JS fails
  // 3. User prefers reduced motion
  if (!isMounted || prefersReducedMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  const hiddenState = { opacity: 0, ...getDirectionOffset() };
  const visibleState = { opacity: 1, x: 0, y: 0 };

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        className={className}
        initial={hiddenState}
        whileInView={visibleState}
        viewport={{ once: true, amount: 0.1, margin: "100px" }}
        transition={{ 
          duration, 
          delay, 
          ease
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
