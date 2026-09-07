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
}

/**
 * A highly optimized, subtle entrance animation wrapper.
 * Automatically strips motion if the user prefers reduced motion.
 * Uses a conservative 20px translation to feel premium, not distracting.
 */
export function FadeIn({ 
  children, 
  delay = 0, 
  className = '', 
  direction = 'up', 
  duration = 1.2
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only mount the animation logic on the client.
  // If JS fails, hydration fails, or we are on the server, the content remains fully visible.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 40 };
      case 'down': return { y: -40 };
      case 'left': return { x: 40 };
      case 'right': return { x: -40 };
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
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
