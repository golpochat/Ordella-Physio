import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";

export type BillingMetricsResponse = {
  revenueTotal: number;
  revenueByStatus: {
    PAID: number;
    ISSUED: number;
    VOID: number;
  };
};

@Injectable()
export class BillingMetricsService {
  constructor(private readonly database: DatabaseService) {}

  async getMetrics(tenantId: string, start: Date, end: Date): Promise<BillingMetricsResponse> {
    const invoices = await this.database.invoice.findMany({
      where: {
        tenantId,
        status: { in: ["ISSUED", "PAID", "VOIDED"] },
        OR: [
          { issuedAt: { gte: start, lte: end } },
          {
            issuedAt: null,
            createdAt: { gte: start, lte: end },
          },
        ],
      },
      select: {
        status: true,
        total: true,
      },
    });

    const revenueByStatus = {
      PAID: 0,
      ISSUED: 0,
      VOID: 0,
    };

    let revenueTotal = 0;

    for (const invoice of invoices) {
      const amount = Number(invoice.total);
      revenueTotal += amount;

      if (invoice.status === "PAID") {
        revenueByStatus.PAID += amount;
      } else if (invoice.status === "ISSUED") {
        revenueByStatus.ISSUED += amount;
      } else if (invoice.status === "VOIDED") {
        revenueByStatus.VOID += amount;
      }
    }

    return { revenueTotal, revenueByStatus };
  }
}
