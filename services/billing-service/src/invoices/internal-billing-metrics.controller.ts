import { BadRequestException, Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";
import { BillingMetricsService } from "@/services/billing-metrics.service";
import { BillingReportService } from "@/services/billing-report.service";
import { parseInternalMetricsRange } from "@/utils/internal-metrics-range";
import type { ReportGroupBy } from "@/utils/period-bucket";

@Controller("billing/internal")
export class InternalBillingMetricsController {
  constructor(
    private readonly billingMetricsService: BillingMetricsService,
    private readonly billingReportService: BillingReportService,
    private readonly database: DatabaseService,
  ) {}

  @Get("index-feed")
  async indexFeed(
    @Query("tenantId") tenantId: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("tenantId is required");
    }

    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(200, Math.max(1, Number(limit) || 100));
    const skip = (safePage - 1) * safeLimit;
    const where = { tenantId: tenantId.trim() };

    const [data, total] = await Promise.all([
      this.database.invoice.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          tenantId: true,
          invoiceNumber: true,
          patientId: true,
          staffId: true,
          status: true,
          total: true,
          dueDate: true,
        },
      }),
      this.database.invoice.count({ where }),
    ]);

    return {
      data: data.map((invoice) => ({
        ...invoice,
        total: invoice.total.toString(),
        dueDate: invoice.dueDate?.toISOString() ?? null,
      })),
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.max(1, Math.ceil(total / safeLimit)),
      },
    };
  }

  @Get("record/:invoiceId")
  async getInvoiceRecord(
    @Query("tenantId") tenantId: string,
    @Param("invoiceId") invoiceId: string,
  ) {
    if (!tenantId?.trim()) {
      throw new NotFoundException();
    }

    const invoice = await this.database.invoice.findFirst({
      where: { id: invoiceId, tenantId: tenantId.trim() },
      include: { items: true },
    });

    if (!invoice) {
      throw new NotFoundException();
    }

    return {
      id: invoice.id,
      tenantId: invoice.tenantId,
      invoiceNumber: invoice.invoiceNumber,
      patientId: invoice.patientId,
      staffId: invoice.staffId,
      status: invoice.status,
      subtotal: invoice.subtotal.toString(),
      tax: invoice.tax.toString(),
      discount: invoice.discount.toString(),
      total: invoice.total.toString(),
      dueDate: invoice.dueDate?.toISOString() ?? null,
      notes: invoice.notes,
      items: invoice.items.map((item) => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toString(),
        taxRate: item.taxRate.toString(),
        lineTotal: item.total.toString(),
      })),
    };
  }

  @Get("patients/:patientId/invoices")
  async getPatientInvoices(
    @Query("tenantId") tenantId: string,
    @Param("patientId") patientId: string,
    @Query("limit") limit?: string,
  ) {
    if (!tenantId?.trim() || !patientId?.trim()) {
      return { data: [] };
    }

    const safeLimit = Math.min(50, Math.max(1, Number(limit) || 5));
    const invoices = await this.database.invoice.findMany({
      where: { tenantId: tenantId.trim(), patientId: patientId.trim() },
      orderBy: { createdAt: "desc" },
      take: safeLimit,
      select: {
        id: true,
        invoiceNumber: true,
        status: true,
        total: true,
        dueDate: true,
        paidAt: true,
        createdAt: true,
      },
    });

    return {
      data: invoices.map((invoice) => ({
        ...invoice,
        total: invoice.total.toString(),
        dueDate: invoice.dueDate?.toISOString() ?? null,
        paidAt: invoice.paidAt?.toISOString() ?? null,
        createdAt: invoice.createdAt.toISOString(),
      })),
    };
  }

  @Get("metrics")
  async getBillingMetrics(
    @Query("tenantId") tenantId: string,
    @Query("start") start: string,
    @Query("end") end: string,
  ) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("tenantId is required");
    }

    const range = parseInternalMetricsRange(start, end);
    if (!range) {
      throw new BadRequestException("Invalid metrics date range");
    }

    return this.billingMetricsService.getMetrics(tenantId.trim(), range.start, range.end);
  }

  @Get("report")
  async getBillingReport(
    @Query("tenantId") tenantId: string,
    @Query("start") start: string,
    @Query("end") end: string,
    @Query("groupBy") groupBy: string,
    @Query("staffId") staffId?: string,
    @Query("patientId") patientId?: string,
    @Query("status") status?: string,
    @Query("minTotal") minTotal?: string,
    @Query("maxTotal") maxTotal?: string,
  ) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("tenantId is required");
    }

    const range = parseInternalMetricsRange(start, end);
    if (!range) {
      throw new BadRequestException("Invalid report date range");
    }

    const normalizedGroupBy = normalizeGroupBy(groupBy);
    if (!normalizedGroupBy) {
      throw new BadRequestException("Invalid groupBy");
    }

    return this.billingReportService.getReport({
      tenantId: tenantId.trim(),
      start: range.start,
      end: range.end,
      groupBy: normalizedGroupBy,
      staffId: staffId?.trim() || undefined,
      patientId: patientId?.trim() || undefined,
      status: status?.trim() || undefined,
      minTotal: minTotal ? Number(minTotal) : undefined,
      maxTotal: maxTotal ? Number(maxTotal) : undefined,
    });
  }
}

function normalizeGroupBy(value: string | undefined): ReportGroupBy | null {
  if (value === "day" || value === "week" || value === "month") {
    return value;
  }
  return null;
}
