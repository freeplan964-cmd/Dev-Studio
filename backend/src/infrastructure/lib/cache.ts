/**
 * In-process TTL cache — no external dependencies.
 *
 * Suitable for short-lived, read-heavy data that doesn't change often:
 *   - Remote job listings      (30 s TTL)
 *   - Planner presets          (5 min TTL)
 *   - Auth user lookups        (30 s TTL)
 *   - Global interview seeds   (10 min TTL)
 */

interface Entry<T> {
  value: T;
  expiresAt: number;
}

export class MemoryCache {
  private store = new Map<string, Entry<unknown>>();

  set<T>(key: string, value: T, ttlMs: number): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  invalidate(key: string): void {
    this.store.delete(key);
  }

  invalidatePrefix(prefix: string): void {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) this.store.delete(key);
    }
  }

  /** Returns current number of live (non-expired) entries. */
  size(): number {
    const now = Date.now();
    let count = 0;
    for (const entry of this.store.values()) {
      if (now <= entry.expiresAt) count++;
    }
    return count;
  }

  clear(): void {
    this.store.clear();
  }
}

/** Singleton cache shared across the process. */
export const cache = new MemoryCache();

/** TTL constants (milliseconds) */
export const TTL = {
  SHORT:   30_000,        // 30 s  — auth lookups, volatile data
  MEDIUM:  5 * 60_000,    // 5 min — job listings, presets
  LONG:    10 * 60_000,   // 10 min — global seeds, rarely-changing data
} as const;
