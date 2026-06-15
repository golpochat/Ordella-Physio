export type RateLimitCheckResult = {
  limited: boolean;
  retryAfterSeconds: number;
  count: number;
};

type MemoryBucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, MemoryBucket>();

function checkMemoryRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitCheckResult {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfterSeconds: 0, count: 1 };
  }

  bucket.count += 1;
  memoryBuckets.set(key, bucket);

  const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  if (bucket.count > limit) {
    return { limited: true, retryAfterSeconds, count: bucket.count };
  }

  return { limited: false, retryAfterSeconds: 0, count: bucket.count };
}

type UpstashPipelineResult = {
  result: number;
};

async function upstashPipeline(commands: Array<Array<string | number>>): Promise<number[]> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Upstash Redis is not configured");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Upstash request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as UpstashPipelineResult[];
  return payload.map((entry) => Number(entry.result));
}

async function checkUpstashRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitCheckResult> {
  const redisKey = `${process.env.UPSTASH_REDIS_KEY_PREFIX ?? "ordella-frontend:"}rate:${key}`;

  const [hitCount] = await upstashPipeline([["INCR", redisKey]]);

  if (hitCount === 1) {
    await upstashPipeline([["PEXPIRE", redisKey, windowMs]]);
  }

  const [ttlMs] = await upstashPipeline([["PTTL", redisKey]]);
  const retryAfterSeconds = Math.max(1, Math.ceil((ttlMs > 0 ? ttlMs : windowMs) / 1000));

  if (hitCount > limit) {
    return { limited: true, retryAfterSeconds, count: hitCount };
  }

  return { limited: false, retryAfterSeconds: 0, count: hitCount };
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitCheckResult> {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return await checkUpstashRateLimit(key, limit, windowMs);
    } catch (error) {
      console.warn("[rate-limit] Upstash unavailable, using in-memory fallback", error);
    }
  }

  return checkMemoryRateLimit(key, limit, windowMs);
}
