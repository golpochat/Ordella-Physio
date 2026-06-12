import { Injectable } from "@nestjs/common";
import type { InvoiceStatus, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import { listPeriodKeys, toPeriodKey, type ReportGroupBy } from "@/utils/period-bucket";

export type BillingReportQuery = {
  tenantId: string;
  start: Date;
  end: Date;
  groupBy: ReportGroupBy;
  staffId?: string;
  patientId?: string;
  status?: string;
  minTotal?: number;
  maxTotal?: number;
};

export type BillingReportRow = {
  period: string;
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
};

@Injectable()
export class BillingReportService {
  constructor(private readonly database: DatabaseService) {}

  async getReport(query: BillingReportQuery) {
    const statusFilter = query.status
      ? query.status === "VOID"
        ? "VOIDED"
        : (query.status as InvoiceStatus)
      : undefined;

    const where: Prisma.InvoiceWhereInput = {
      tenantId: query.tenantId,
      createdAt: { gte: query.start, lte: query.end },
      ...(query.staffId ? { staffId: query.staffId } : {}),
      ...(query.patientId ? { patientId: query.patientId } : {}),
      ...(statusFilter ? { status: statusFilter } : { status: { in: ["ISSUED", "PAID", "VOIDED"] } }),
      ...(query.minTotal !== undefined || query.maxTotal !== undefined
        ? {
            total: {
              ...(query.minTotal !== undefined ? { gte: query.minTotal } : {}),
              ...(query.maxTotal !== undefined ? { lte: query.maxTotal } : {}),
            },
          }
        : {}),
    };

    const invoices = await this.database.invoice.findMany({
      where,
      select: {
        createdAt: true,
        total: true,
        subtotal: true,
        tax: true,
        discount: true,
      },
    });

    const rowMap = new Map<string, BillingReportRow>();
    for (const period of listPeriodKeys(query.start, query.end, query.groupBy)) {
      rowMap.set(period, {
        period,
        total: 0,
        subtotal: 0,
        tax: 0,
        discount: 0,
      });
    }

    for (const invoice of invoices) {
      const period = toPeriodKey(invoice.createdAt, query.groupBy);
      const row = rowMap.get(period);
      if (!row) {
        continue;
      }

      row.total += Number(invoice.total);
      row.subtotal += Number(invoice.subtotal);
      row.tax += Number(invoice.tax);
      row.discount += Number(invoice.discount);
    }

    return {
      groupBy: query.groupBy,
      rows: [...rowMap.values()],
    };
  }
}
