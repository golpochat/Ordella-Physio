import { Injectable } from "@nestjs/common";
import { MetricsRepository } from "@/metrics/metrics.repository";
import type { MetricsQueryDto } from "@/metrics/dto/metrics-query.dto";
import { parseDateRange } from "@/utils/date-helpers";

@Injectable()
export class DailyMetricsQuery {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async execute(tenantId: string, query: MetricsQueryDto) {
    const { start, end } = parseDateRange(query.startDate, query.endDate);
    return this.metricsRepository.findDailyMetrics(tenantId, start, end);
  }
}
