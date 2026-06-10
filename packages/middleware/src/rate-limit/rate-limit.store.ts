export interface RateLimitStore {
  increment(key: string, windowMs: number): Promise<{ count: number; resetAt: number }>;
}

export class InMemoryRateLimitStore implements RateLimitStore {
  private readonly buckets = new Map<string, { count: number; resetAt: number }>();

  async increment(key: string, windowMs: number): Promise<{ count: number; resetAt: number }> {
    const now = Date.now();
    const existing = this.buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      const resetAt = now + windowMs;
      const bucket = { count: 1, resetAt };
      this.buckets.set(key, bucket);
      return bucket;
    }

    existing.count += 1;
    this.buckets.set(key, existing);
    return existing;
  }
}

export interface RedisLikeClient {
  incr(key: string): Promise<number>;
  pexpire(key: string, milliseconds: number): Promise<number>;
  pttl(key: string): Promise<number>;
}

export class RedisRateLimitStore implements RateLimitStore {
  constructor(private readonly redis: RedisLikeClient) {}

  async increment(key: string, windowMs: number): Promise<{ count: number; resetAt: number }> {
    const count = await this.redis.incr(key);

    if (count === 1) {
      await this.redis.pexpire(key, windowMs);
    }

    const ttl = await this.redis.pttl(key);
    const resetAt = Date.now() + (ttl > 0 ? ttl : windowMs);

    return { count, resetAt };
  }
}
