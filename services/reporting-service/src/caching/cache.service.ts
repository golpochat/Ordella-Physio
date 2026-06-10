import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { reportingConfig } from "@ordella/config";
import { createCacheClient, type CacheClient } from "@ordella/caching";
import { CACHE_KEYS, CACHE_TTL_SECONDS } from "@/constants";

@Injectable()
export class ReportingCacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ReportingCacheService.name);
  private cacheClient: CacheClient | null = null;

  async onModuleInit() {
    this.cacheClient = createCacheClient({
      redisUrl: reportingConfig.cacheRedisUrl,
      keyPrefix: "reporting:",
    });
    this.logger.log("Reporting cache client initialized");
  }

  async onModuleDestroy() {
    await this.cacheClient?.disconnect();
    this.cacheClient = null;
  }

  async getMetrics<T>(tenantId: string, cacheKey: string): Promise<T | null> {
    return this.get<T>(`${CACHE_KEYS.METRICS_PREFIX}${tenantId}:${cacheKey}`);
  }

  async setMetrics<T>(tenantId: string, cacheKey: string, value: T): Promise<void> {
    await this.set(`${CACHE_KEYS.METRICS_PREFIX}${tenantId}:${cacheKey}`, value, CACHE_TTL_SECONDS.METRICS);
  }

  async getDashboard<T>(tenantId: string, dashboardType: string): Promise<T | null> {
    return this.get<T>(`${CACHE_KEYS.DASHBOARD_PREFIX}${tenantId}:${dashboardType}`);
  }

  async setDashboard<T>(tenantId: string, dashboardType: string, value: T): Promise<void> {
    await this.set(
      `${CACHE_KEYS.DASHBOARD_PREFIX}${tenantId}:${dashboardType}`,
      value,
      CACHE_TTL_SECONDS.DASHBOARD,
    );
  }

  async invalidateTenant(tenantId: string): Promise<void> {
    await this.cacheClient?.invalidateByPrefix(`reporting:${CACHE_KEYS.METRICS_PREFIX}${tenantId}`);
    await this.cacheClient?.invalidateByPrefix(`reporting:${CACHE_KEYS.DASHBOARD_PREFIX}${tenantId}`);
    await this.cacheClient?.invalidateByPrefix(`reporting:${CACHE_KEYS.QUERY_PREFIX}${tenantId}`);
    this.logger.log(`Invalidated cache for tenant ${tenantId}`);
  }

  private async get<T>(key: string): Promise<T | null> {
    if (!this.cacheClient) {
      return null;
    }

    return this.cacheClient.get<T>(key);
  }

  private async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    if (!this.cacheClient) {
      return;
    }

    await this.cacheClient.set(key, value, { ttlSeconds });
  }
}
