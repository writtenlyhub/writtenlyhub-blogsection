'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

// Global counter for active scroll locks to prevent race conditions
// when multiple overlays attempt to lock/unlock the body.
let lockCount = 0;

/**
 * A centralized hook for managing body scroll locking.
 * Handles native body overflow and pauses the Lenis smooth scroller.
 * Uses reference counting to support multiple simultaneous locks safely.
 * 
 * @param isLocked Whether the scroll should be currently locked by the calling component.
 */
export function useBodyScrollLock(isLocked: boolean) {
  const lenis = useLenis();
  const wasLocked = useRef(false);

  useEffect(() => {
    if (isLocked) {
      if (!wasLocked.current) {
        lockCount++;
        wasLocked.current = true;
      }

      // If this is the first lock, disable scroll globally
      if (lockCount === 1) {
        document.body.style.overflow = 'hidden';
        lenis?.stop();
      }
    } else {
      if (wasLocked.current) {
        lockCount = Math.max(0, lockCount - 1);
        wasLocked.current = false;
        
        // If no locks remain, restore scroll globally
        if (lockCount === 0) {
          document.body.style.overflow = '';
          lenis?.start();
        }
      }
    }

    // Cleanup on unmount to prevent permanent locks if the component is removed
    return () => {
      if (wasLocked.current) {
        lockCount = Math.max(0, lockCount - 1);
        wasLocked.current = false;
        
        if (lockCount === 0) {
          document.body.style.overflow = '';
          lenis?.start();
        }
      }
    };
  }, [isLocked, lenis]);
}
