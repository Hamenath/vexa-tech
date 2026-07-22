// In-memory sliding window rate limiter
const ipStore: Map<string, number[]> = new Map();

// Limits: 5 submissions per 60 minutes
const LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_LIMIT = 5;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  
  if (!ipStore.has(ip)) {
    ipStore.set(ip, [now]);
    return { allowed: true, remaining: MAX_LIMIT - 1 };
  }

  const timestamps = ipStore.get(ip) || [];
  // Filter out timestamps older than 1 hour
  const validTimestamps = timestamps.filter(t => now - t < LIMIT_WINDOW);
  
  if (validTimestamps.length >= MAX_LIMIT) {
    ipStore.set(ip, validTimestamps);
    return { allowed: false, remaining: 0 };
  }

  validTimestamps.push(now);
  ipStore.set(ip, validTimestamps);
  
  return { allowed: true, remaining: MAX_LIMIT - validTimestamps.length };
}
