import type { CacheClient } from "./cache-client";
import { MemoryCacheClient } from "./memory-cache";
import { RedisCacheClient } from "./redis-cache";

export type CreateCacheClientOptions = {
  redisUrl?: string;
  keyPrefix?: string;
};

export function createCacheClient(options: CreateCacheClientOptions = {}): CacheClient {
  if (options.redisUrl) {
    return new RedisCacheClient({
      url: options.redisUrl,
      keyPrefix: options.keyPrefix,
    });
  }

  return new MemoryCacheClient();
}
