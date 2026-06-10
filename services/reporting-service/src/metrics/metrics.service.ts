import { Injectable } from "@nestjs/common";
import { ReportingCacheService } from "@/caching/cache.service";
import { ReportingEventPublisher } from "@/events/reporting-event.publisher";
import { DailyMetricsQuery } from "@/metrics/queries/daily-metrics.query";
import { MonthlyMetricsQuery } from "@/metrics/queries/monthly-metrics.query";
import { KpiMetricsQuery } from "@/metrics/queries/kpi-metrics.query";
import { MetricsRepository } from "@/metrics/metrics.repository";
import type { MetricsQueryDto } from "@/metrics/dto/metrics-query.dto";
import {
  toDailyMetricsResponse,
  toMetricsListResponse,
  toMonthlyMetricsResponse,
} from "@/metrics/metrics.mapper";
import { buildCacheKey } from "@/utils/reporting-helpers";
import { toWeekKey } from "@/utils/date-helpers";
import { parseDateRange } from "@/utils/date-helpers";

@Injectable()
export class MetricsService {
  constructor(
    private readonly dailyMetricsQuery: DailyMetricsQuery,
    private readonly monthlyMetricsQuery: MonthlyMetricsQuery,
    private readonly kpiMetricsQuery: KpiMetricsQuery,
    private readonly metricsRepository: MetricsRepository,
    private readonly cacheService: ReportingCacheService,
    private readonly eventPublisher: ReportingEventPublisher,
  ) {}

  async getDailyMetrics(tenantId: string, query: MetricsQueryDto) {
    const cacheKey = buildCacheKey(["daily", query.startDate, query.endDate, query.therapistId, query.locationId]);
    const cached = await this.cacheService.getMetrics(tenantId, cacheKey);
    if (cached) {
      return cached;
    }

    const rows = await this.dailyMetricsQuery.execute(tenantId, query);
    const response = toMetricsListResponse(rows, toDailyMetricsResponse);
    await this.cacheService.setMetrics(tenantId, cacheKey, response);
    return response;
  }

  async getWeeklyMetrics(tenantId: string, query: MetricsQueryDto) {
    const { start, end } = parseDateRange(query.startDate, query.endDate);
    const rows = await this.metricsRepository.findWeeklyMetrics(
      tenantId,
      toWeekKey(start),
      toWeekKey(end),
    );
    return { items: rows, total: rows.length };
  }

  async getMonthlyMetrics(tenantId: string, query: MetricsQueryDto) {
    const cacheKey = buildCacheKey(["monthly", query.startDate, query.endDate, query.therapistId, query.locationId]);
    const cached = await this.cacheService.getMetrics(tenantId, cacheKey);
    if (cached) {
      return cached;
    }

    const rows = await this.monthlyMetricsQuery.execute(tenantId, query);
    const response = toMetricsListResponse(rows, toMonthlyMetricsResponse);
    await this.cacheService.setMetrics(tenantId, cacheKey, response);
    return response;
  }

  async getKpiMetrics(tenantId: string, query: MetricsQueryDto) {
    return this.kpiMetricsQuery.execute(tenantId, query);
  }

  async publishMetricsGenerated(
    tenantId: string,
    metricType: string,
    periodStart: string,
    periodEnd: string,
    correlationId?: string,
  ) {
    const event = {
      tenantId,
      metricType,
      periodStart,
      periodEnd,
      generatedAt: new Date().toISOString(),
    };

    await this.eventPublisher.publishMetricsGenerated(event, correlationId);
    return event;
  }
}
