import Redis from "ioredis";
import type { CacheClient, CacheSetOptions } from "./cache-client";

export type RedisCacheClientOptions = {
  url: string;
  keyPrefix?: string;
};

export class RedisCacheClient implements CacheClient {
  private readonly redis: Redis;
  private readonly keyPrefix: string;

  constructor(options: RedisCacheClientOptions) {
    this.redis = new Redis(options.url, { maxRetriesPerRequest: 3 });
    this.keyPrefix = options.keyPrefix ?? "ordella:";
  }

  private toKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.redis.get(this.toKey(key));
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as T;
  }

  async set<T>(key: string, value: T, options?: CacheSetOptions): Promise<void> {
    const serialized = JSON.stringify(value);
    const redisKey = this.toKey(key);

    if (options?.ttlSeconds) {
      await this.redis.set(redisKey, serialized, "EX", options.ttlSeconds);
      return;
    }

    await this.redis.set(redisKey, serialized);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(this.toKey(key));
  }

  async invalidateByPrefix(prefix: string): Promise<void> {
    const pattern = this.toKey(`${prefix}*`);
    let cursor = "0";

    do {
      const [nextCursor, keys] = await this.redis.scan(cursor, "MATCH", pattern, "COUNT", 100);
      cursor = nextCursor;

      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } while (cursor !== "0");
  }

  async disconnect(): Promise<void> {
    await this.redis.quit();
  }
}
