export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface RateLimitProvider {
  /**
   * Check if a specific identifier has exceeded the rate limit.
   * @param identifier Typically the IP address.
   * @param limit Max requests allowed in the window.
   * @param windowMs The time window in milliseconds.
   */
  check(identifier: string, limit: number, windowMs: number): Promise<RateLimitResult>;
}
