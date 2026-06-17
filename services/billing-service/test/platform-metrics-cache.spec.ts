import { PlatformMetricsCacheService, PLATFORM_METRICS_CACHE_KEY } from "@/stripe/platform-metrics-cache.service";
import type { StripeLivePlatformMetrics } from "@/stripe/stripe-platform-metrics.service";

const sampleMetrics: StripeLivePlatformMetrics = {
  mrrStripeLive: 10_000,
  arrStripeLive: 120_000,
  activeSubscriptions: 2,
  trialingSubscriptions: 1,
  pastDueSubscriptions: 0,
  canceledSubscriptions: 0,
  churnRate: 0,
  usageRevenue: 500,
  tenantRevenue: 8_000,
  organizationRevenue: 1_500,
  aiNotesUsage: 12,
  aiNotesRevenue: 500,
  lastUpdatedAt: "2026-06-17T12:00:00.000Z",
};

describe("PlatformMetricsCacheService", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("uses the required cache key", () => {
    const cache = new PlatformMetricsCacheService();
    expect(cache.getCacheKey()).toBe(PLATFORM_METRICS_CACHE_KEY);
    expect(cache.getCacheKey()).toBe("platform-metrics-stripe-live");
  });

  it("returns cached metrics until the 5 minute TTL expires", () => {
    const cache = new PlatformMetricsCacheService();

    expect(cache.get()).toBeNull();
    cache.set(sampleMetrics);
    expect(cache.get()).toEqual(sampleMetrics);

    jest.advanceTimersByTime(4 * 60 * 1000);
    expect(cache.get()).toEqual(sampleMetrics);

    jest.advanceTimersByTime(61 * 1000);
    expect(cache.get()).toBeNull();
  });

  it("invalidates cached metrics immediately", () => {
    const cache = new PlatformMetricsCacheService();
    cache.set(sampleMetrics);

    cache.invalidate();

    expect(cache.get()).toBeNull();
  });
});
