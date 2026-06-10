import type { CacheClient, CacheSetOptions } from "./cache-client";

type CacheEntry = {
  value: unknown;
  expiresAt?: number;
};

export class MemoryCacheClient implements CacheClient {
  private readonly store = new Map<string, CacheEntry>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) {
      return null;
    }

    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, options?: CacheSetOptions): Promise<void> {
    const expiresAt = options?.ttlSeconds
      ? Date.now() + options.ttlSeconds * 1000
      : undefined;
    this.store.set(key, { value, expiresAt });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }

  async invalidateByPrefix(prefix: string): Promise<void> {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
      }
    }
  }

  async disconnect(): Promise<void> {
    this.store.clear();
  }
}
