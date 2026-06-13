import { Injectable } from "@nestjs/common";
import type { RateLimitRecord, RateLimitUsageSnapshot } from "@/models/AIRateLimit";
import { GatewayRepository } from "@/repositories/gateway.repository";

type UsageBucket = {
  minute: { count: number; tokens: number; windowStart: number };
  hour: { count: number; windowStart: number };
  day: { count: number; tokens: number; windowStart: number };
};

@Injectable()
export class RateLimitService {
  private readonly buckets = new Map<string, UsageBucket>();

  constructor(private readonly repository: GatewayRepository) {}

  private bucketKey(tenantId: string, keyId: string) {
    return `${tenantId}:${keyId}`;
  }

  private getBucket(tenantId: string, keyId: string): UsageBucket {
    const key = this.bucketKey(tenantId, keyId);
    let bucket = this.buckets.get(key);
    if (!bucket) {
      const now = Date.now();
      bucket = {
        minute: { count: 0, tokens: 0, windowStart: now },
        hour: { count: 0, windowStart: now },
        day: { count: 0, tokens: 0, windowStart: now },
      };
      this.buckets.set(key, bucket);
    }
    return bucket;
  }

  private rollWindows(bucket: UsageBucket) {
    const now = Date.now();
    if (now - bucket.minute.windowStart > 60_000) {
      bucket.minute = { count: 0, tokens: 0, windowStart: now };
    }
    if (now - bucket.hour.windowStart > 3_600_000) {
      bucket.hour = { count: 0, windowStart: now };
    }
    if (now - bucket.day.windowStart > 86_400_000) {
      bucket.day = { count: 0, tokens: 0, windowStart: now };
    }
  }

  async resolveProfile(tenantId: string, profileId: string | null): Promise<RateLimitRecord> {
    if (profileId) {
      const profile = await this.repository.getRateLimit(profileId);
      if (profile) return this.repository.mapRateLimit(profile);
    }
    const fallback = await this.repository.getDefaultRateLimit(tenantId);
    if (fallback) return this.repository.mapRateLimit(fallback);
    return {
      id: "default",
      tenantId: null,
      name: "default",
      requestsPerMinute: 60,
      requestsPerHour: 1000,
      requestsPerDay: 10000,
      tokensPerMinute: 100_000,
      tokensPerDay: 1_000_000,
      burstLimit: 20,
    };
  }

  async checkRateLimit(tenantId: string, keyId: string, profileId: string | null, tokens = 0) {
    const profile = await this.resolveProfile(tenantId, profileId);
    const bucket = this.getBucket(tenantId, keyId);
    this.rollWindows(bucket);

    const violations: string[] = [];
    if (bucket.minute.count >= profile.requestsPerMinute) violations.push("requests_per_minute");
    if (bucket.hour.count >= profile.requestsPerHour) violations.push("requests_per_hour");
    if (bucket.day.count >= profile.requestsPerDay) violations.push("requests_per_day");
    if (bucket.minute.tokens + tokens > profile.tokensPerMinute) violations.push("tokens_per_minute");
    if (bucket.day.tokens + tokens > profile.tokensPerDay) violations.push("tokens_per_day");
    if (bucket.minute.count >= profile.burstLimit) violations.push("burst_limit");

    return { allowed: violations.length === 0, violations, profile };
  }

  incrementUsage(tenantId: string, keyId: string, tokens = 0) {
    const bucket = this.getBucket(tenantId, keyId);
    this.rollWindows(bucket);
    bucket.minute.count += 1;
    bucket.hour.count += 1;
    bucket.day.count += 1;
    bucket.minute.tokens += tokens;
    bucket.day.tokens += tokens;
  }

  getCurrentUsage(tenantId: string, keyId: string): RateLimitUsageSnapshot {
    const bucket = this.getBucket(tenantId, keyId);
    this.rollWindows(bucket);
    return {
      requestsMinute: bucket.minute.count,
      requestsHour: bucket.hour.count,
      requestsDay: bucket.day.count,
      tokensMinute: bucket.minute.tokens,
      tokensDay: bucket.day.tokens,
    };
  }
}
