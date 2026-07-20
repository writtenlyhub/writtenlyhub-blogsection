'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

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
  duration = 0.3
}: FadeInProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 20 };
      case 'down': return { y: -20 };
      case 'left': return { x: 20 };
      case 'right': return { x: -20 };
      default: return { x: 0, y: 0 };
    }
  };

  const hiddenState = { opacity: 0, ...getDirectionOffset() };
  const visibleState = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hiddenState}
      whileInView={visibleState}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration, 
        delay, 
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  );
}
