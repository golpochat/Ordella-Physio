import { Injectable } from "@nestjs/common";
import type { StripeLivePlatformMetrics } from "@/stripe/stripe-platform-metrics.service";

export const PLATFORM_METRICS_CACHE_KEY = "platform-metrics-stripe-live";
const CACHE_TTL_MS = 5 * 60 * 1000;

@Injectable()
export class PlatformMetricsCacheService {
  private entry: { value: StripeLivePlatformMetrics; expiresAt: number } | null = null;

  getCacheKey(): string {
    return PLATFORM_METRICS_CACHE_KEY;
  }

  get(): StripeLivePlatformMetrics | null {
    if (!this.entry || Date.now() >= this.entry.expiresAt) {
      this.entry = null;
      return null;
    }
    return this.entry.value;
  }

  set(value: StripeLivePlatformMetrics): void {
    this.entry = {
      value,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };
  }

  invalidate(): void {
    this.entry = null;
  }
}
