import { Injectable } from "@nestjs/common";
import type { RevenueReportQueryInput } from "@ordella/validation";
import { BillingServiceClient } from "@/integrations/billing-service.client";
import { resolveReportRange } from "@/reports/utils/resolve-report-range";

@Injectable()
export class ReportsRevenueService {
  constructor(private readonly billingServiceClient: BillingServiceClient) {}

  async getRevenueReport(tenantId: string, query: RevenueReportQueryInput) {
    const { start, end, dateRange } = resolveReportRange(query);
    const report = await this.billingServiceClient.getRevenueReport(tenantId, start, end, query);

    return {
      dateRange,
      groupBy: query.groupBy,
      rows: report?.rows ?? [],
      chart: buildRevenueChart(report?.rows ?? []),
      export: {
        columns: ["period", "total", "subtotal", "tax", "discount"],
        rows: report?.rows ?? [],
      },
    };
  }
}

function buildRevenueChart(
  rows: Array<{
    period: string;
    total: number;
    subtotal: number;
    tax: number;
    discount: number;
  }>,
) {
  return {
    labels: rows.map((row) => row.period),
    datasets: [
      { key: "total", label: "Total", values: rows.map((row) => row.total) },
      { key: "subtotal", label: "Subtotal", values: rows.map((row) => row.subtotal) },
      { key: "tax", label: "Tax", values: rows.map((row) => row.tax) },
    ],
  };
}
