import Redis from "ioredis";

import { env } from "../config";
import type { RateLimitIncrementResult, RedisLikeClient } from "./rate-limit-store";
import { getInMemoryRateLimitStore, RedisRateLimitStore, type RateLimitStore } from "./rate-limit-store";

let redisClient: Redis | null = null;
let redisRateLimitStore: RedisRateLimitStore | null = null;
let usingRedis = false;

function buildRedisKey(key: string): string {
  return `${env.REDIS_KEY_PREFIX}${key}`;
}

function wrapRedis(client: Redis): RedisLikeClient {
  return {
    incr: (key) => client.incr(buildRedisKey(key)),
    pexpire: (key, milliseconds) => client.pexpire(buildRedisKey(key), milliseconds),
    pttl: (key) => client.pttl(buildRedisKey(key)),
  };
}

export function isRedisEnabled(): boolean {
  return usingRedis;
}

export function getRedisClient(): Redis | null {
  return redisClient;
}

export function getRateLimitStore(): RateLimitStore {
  if (redisRateLimitStore) {
    return redisRateLimitStore;
  }

  return getInMemoryRateLimitStore();
}

export async function connectRedis(): Promise<void> {
  if (!env.REDIS_URL || redisClient) {
    return;
  }

  const client = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 2,
    enableOfflineQueue: false,
  });

  client.on("error", (error) => {
    console.warn("[redis] connection error", error.message);
  });

  try {
    await client.ping();
    redisClient = client;
    redisRateLimitStore = new RedisRateLimitStore(wrapRedis(client));
    usingRedis = true;
    console.log("[redis] connected for distributed rate limiting");
  } catch (error) {
    console.warn("[redis] unavailable — using in-memory rate limits", error);
    await client.quit().catch(() => undefined);
  }
}

export async function disconnectRedis(): Promise<void> {
  if (!redisClient) {
    return;
  }

  await redisClient.quit();
  redisClient = null;
  redisRateLimitStore = null;
  usingRedis = false;
}

export async function incrementBruteForceCounter(
  key: string,
  windowMs: number,
): Promise<RateLimitIncrementResult> {
  const store = getRateLimitStore();
  return store.increment(`brute:${key}`, windowMs);
}
