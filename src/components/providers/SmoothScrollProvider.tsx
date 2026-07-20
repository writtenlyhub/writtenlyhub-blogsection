'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';

export interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * A highly optimized, production-ready smooth scroll provider.
 * Automatically disables itself on touch devices or when the user 
 * has a system-level preference for reduced motion.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    // Default to false for SSR safety and to ensure native scroll acts as the ultimate fallback.
    const [shouldEnable, setShouldEnable] = useState(false);

    useEffect(() => {
      // 1. Accessibility: Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      // 2. Device Capability: Check for primary coarse pointer (touchscreens)
      // This is far more robust than screen-width checks for handling tablets and foldables.
      const coarsePointer = window.matchMedia('(pointer: coarse)');

      const evaluateCapabilities = () => {
        // Only enable if user doesn't prefer reduced motion and isn't primarily using a touch device
        setShouldEnable(!prefersReducedMotion.matches && !coarsePointer.matches);
      };

      // Initial evaluation
      evaluateCapabilities();

      // 3. Listen for dynamic changes (e.g., attaching a mouse, changing accessibility settings)
      prefersReducedMotion.addEventListener('change', evaluateCapabilities);
      coarsePointer.addEventListener('change', evaluateCapabilities);

      return () => {
        prefersReducedMotion.removeEventListener('change', evaluateCapabilities);
        coarsePointer.removeEventListener('change', evaluateCapabilities);
      };
    }, []);

    // By dynamically updating options rather than unmounting ReactLenis, 
    // we prevent re-renders of the entire layout children tree.
    return (
      <MotionConfig reducedMotion="user">
        <ReactLenis
          root
          options={{
            lerp: 0.09, // Subtle inertia, exactly as requested (0.08 - 0.1)
            smoothWheel: shouldEnable, // Dynamically toggle based on capabilities
            syncTouch: false, // Explicitly preserve native touch scrolling
          }}
        >
          {children}
        </ReactLenis>
      </MotionConfig>
    );
}
