import { RateLimitProvider, RateLimitResult } from './provider';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class MemoryRateLimitProvider implements RateLimitProvider {
  private store = new Map<string, RateLimitEntry>();

  async check(identifier: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || entry.resetAt < now) {
      // Create new or reset entry
      const resetAt = now + windowMs;
      this.store.set(identifier, { count: 1, resetAt });
      return {
        success: true,
        limit,
        remaining: limit - 1,
        reset: resetAt,
      };
    }

    if (entry.count >= limit) {
      // Exceeded limit
      return {
        success: false,
        limit,
        remaining: 0,
        reset: entry.resetAt,
      };
    }

    // Increment count
    entry.count += 1;
    this.store.set(identifier, entry);

    return {
      success: true,
      limit,
      remaining: limit - entry.count,
      reset: entry.resetAt,
    };
  }
}

// Singleton instance for development
export const memoryRateLimiter = new MemoryRateLimitProvider();
