import { Injectable, Logger } from "@nestjs/common";
import type { RevenueReportQueryInput } from "@ordella/validation";
import { toIsoDateString } from "@/utils/date-range";

export type RevenueReportResponse = {
  groupBy: "day" | "week" | "month";
  rows: Array<{
    period: string;
    total: number;
    subtotal: number;
    tax: number;
    discount: number;
  }>;
};

export type BillingMetricsResponse = {
  revenueTotal: number;
  revenueByStatus: {
    PAID: number;
    ISSUED: number;
    VOID: number;
  };
};

@Injectable()
export class BillingServiceClient {
  private readonly logger = new Logger(BillingServiceClient.name);

  private get baseUrl(): string {
    return process.env.BILLING_SERVICE_URL ?? "http://billing-service:3056";
  }

  async getMetrics(
    tenantId: string,
    start: Date,
    end: Date,
  ): Promise<BillingMetricsResponse | null> {
    try {
      const params = new URLSearchParams({
        tenantId,
        start: toIsoDateString(start),
        end: toIsoDateString(end),
      });

      const response = await fetch(
        `${this.baseUrl}/billing/internal/metrics?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Billing metrics failed for tenant ${tenantId}: HTTP ${response.status}`);
        return null;
      }

      return (await response.json()) as BillingMetricsResponse;
    } catch (error) {
      this.logger.warn(`Billing metrics failed for tenant ${tenantId}`, error);
      return null;
    }
  }

  async getRevenueReport(
    tenantId: string,
    start: Date,
    end: Date,
    query: RevenueReportQueryInput,
  ): Promise<RevenueReportResponse | null> {
    try {
      const params = new URLSearchParams({
        tenantId,
        start: toIsoDateString(start),
        end: toIsoDateString(end),
        groupBy: query.groupBy,
      });

      if (query.staffId) params.set("staffId", query.staffId);
      if (query.patientId) params.set("patientId", query.patientId);
      if (query.status) params.set("status", query.status);
      if (query.minTotal !== undefined) params.set("minTotal", String(query.minTotal));
      if (query.maxTotal !== undefined) params.set("maxTotal", String(query.maxTotal));

      const response = await fetch(
        `${this.baseUrl}/billing/internal/report?${params.toString()}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        },
      );

      if (!response.ok) {
        this.logger.warn(`Revenue report failed for tenant ${tenantId}: HTTP ${response.status}`);
        return null;
      }

      return (await response.json()) as RevenueReportResponse;
    } catch (error) {
      this.logger.warn(`Revenue report failed for tenant ${tenantId}`, error);
      return null;
    }
  }
}
