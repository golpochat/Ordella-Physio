export type MockRedisClient = {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, ttlSeconds?: number) => Promise<void>;
  del: (key: string) => Promise<void>;
  exists: (key: string) => Promise<boolean>;
  clear: () => void;
  dump: () => Record<string, { value: string; expiresAt?: number }>;
};

export function createMockRedisClient(): MockRedisClient {
  const store = new Map<string, { value: string; expiresAt?: number }>();

  function isExpired(entry: { expiresAt?: number }): boolean {
    return entry.expiresAt !== undefined && entry.expiresAt <= Date.now();
  }

  return {
    async get(key) {
      const entry = store.get(key);
      if (!entry || isExpired(entry)) {
        store.delete(key);
        return null;
      }
      return entry.value;
    },

    async set(key, value, ttlSeconds) {
      store.set(key, {
        value,
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
      });
    },

    async del(key) {
      store.delete(key);
    },

    async exists(key) {
      const entry = store.get(key);
      if (!entry || isExpired(entry)) {
        store.delete(key);
        return false;
      }
      return true;
    },

    clear() {
      store.clear();
    },

    dump() {
      return Object.fromEntries(store.entries());
    },
  };
}
