import { Injectable, Logger } from "@nestjs/common";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ReportRequest } from "@/generated/prisma";
import { generateCsv } from "@/exports/generators/csv-generator";
import { IngestionRepository } from "@/ingestion/ingestion.repository";
import { DatabaseService } from "@/database/database.module";
import { MetricsRepository } from "@/metrics/metrics.repository";
import { parseDateRange } from "@/utils/date-helpers";
import type { ReportFiltersInput, ReportFormat, ReportType } from "@ordella/validation";

type GeneratedReport = {
  summary: Record<string, number | string>;
  rows: Array<Record<string, string | number | boolean | null>>;
  charts: {
    line: Array<{ label: string; value: number }>;
    bar: Array<{ label: string; value: number }>;
    pie: Array<{ label: string; value: number }>;
  };
};

@Injectable()
export class ReportGeneratorService {
  private readonly logger = new Logger(ReportGeneratorService.name);
  private readonly storageRoot = path.join(process.cwd(), "storage", "reports");

  constructor(
    private readonly database: DatabaseService,
    private readonly metricsRepository: MetricsRepository,
    private readonly ingestionRepository: IngestionRepository,
  ) {}

  async generate(report: ReportRequest): Promise<string> {
    const filters = report.filters as ReportFiltersInput;
    const format: ReportFormat = filters.format ?? "json";
    const payload = await this.buildReportPayload(report.tenantId, report.type as ReportType, filters);
    const content = format === "csv" ? generateCsv(payload.rows) : JSON.stringify(payload, null, 2);
    const extension = format === "csv" ? "csv" : "json";
    const relativePath = path.join(report.tenantId, `${report.id}.${extension}`);
    const absolutePath = path.join(this.storageRoot, relativePath);

    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content, "utf8");

    this.logger.log(`Stored report ${report.id} at ${relativePath}`);
    return relativePath.replace(/\\/g, "/");
  }

  async readResult(resultUrl: string): Promise<string> {
    const absolutePath = path.join(this.storageRoot, resultUrl);
    return readFile(absolutePath, "utf8");
  }

  private async buildReportPayload(
    tenantId: string,
    type: ReportType,
    filters: ReportFiltersInput,
  ): Promise<GeneratedReport> {
    const { start, end } = parseDateRange(filters.startDate, filters.endDate);
    const daily = await this.metricsRepository.findDailyMetrics(tenantId, start, end);
    const kpi = await this.metricsRepository.findKpiSummary(tenantId, start, end);

    if (type === "tenant_usage") {
      return this.buildTenantUsageReport(start, end);
    }

    if (type === "appointments_summary" || type === "clinic_overview") {
      return {
        summary: {
          totalAppointments: kpi.totalAppointments,
          completedAppointments: kpi.completedAppointments,
          cancelledAppointments: kpi.cancelledAppointments,
          noShowAppointments: kpi.noShowAppointments,
          newPatients: kpi.newPatients,
        },
        rows: daily.map((row) => ({
          date: row.date.toISOString().slice(0, 10),
          totalAppointments: row.totalAppointments,
          completedAppointments: row.completedAppointments,
          cancelledAppointments: row.cancelledAppointments,
          noShowAppointments: row.noShowAppointments,
        })),
        charts: {
          line: daily.map((row) => ({
            label: row.date.toISOString().slice(0, 10),
            value: row.totalAppointments,
          })),
          bar: [
            { label: "Completed", value: kpi.completedAppointments },
            { label: "Cancelled", value: kpi.cancelledAppointments },
            { label: "No-show", value: kpi.noShowAppointments },
          ],
          pie: [
            { label: "Completed", value: kpi.completedAppointments },
            { label: "Cancelled", value: kpi.cancelledAppointments },
            { label: "No-show", value: kpi.noShowAppointments },
          ],
        },
      };
    }

    if (type === "appointments_detailed") {
      const events = await this.ingestionRepository.findByEventType(tenantId, "appointment.created", 500);
      const rows = events
        .filter((event) => this.matchesFilters(event.payload as Record<string, unknown>, filters, start, end))
        .map((event) => {
          const payload = event.payload as Record<string, unknown>;
          return {
            appointmentId: event.entityId,
            status: String(payload.status ?? "UNKNOWN"),
            therapistId: String(payload.therapistId ?? ""),
            patientId: String(payload.patientId ?? ""),
            scheduledAt: String(payload.scheduledAt ?? event.ingestedAt.toISOString()),
          };
        });

      return {
        summary: { totalRecords: rows.length },
        rows,
        charts: {
          line: [],
          bar: this.countByField(rows, "status"),
          pie: this.countByField(rows, "status"),
        },
      };
    }

    if (type === "billing_summary" || type === "billing_detailed") {
      const invoiceEvents = await Promise.all([
        this.ingestionRepository.findByEventType(tenantId, "invoice.created", 300),
        this.ingestionRepository.findByEventType(tenantId, "invoice.paid", 300),
      ]);

      const rows = invoiceEvents
        .flat()
        .filter((event) => this.matchesFilters(event.payload as Record<string, unknown>, filters, start, end))
        .map((event) => {
          const payload = event.payload as Record<string, unknown>;
          return {
            invoiceId: event.entityId,
            eventType: event.eventType,
            amount: Number(payload.amount ?? payload.total ?? 0),
            status: String(payload.status ?? ""),
            patientId: String(payload.patientId ?? ""),
          };
        });

      const revenue = rows.reduce((sum, row) => sum + Number(row.amount ?? 0), 0);

      return {
        summary: {
          revenue,
          invoiceEvents: rows.length,
          outstandingBalance: kpi.outstandingBalance,
        },
        rows: type === "billing_detailed" ? rows : rows.slice(0, 50),
        charts: {
          line: daily.map((row) => ({
            label: row.date.toISOString().slice(0, 10),
            value: Number(row.revenue),
          })),
          bar: [{ label: "Revenue", value: revenue }],
          pie: [
            { label: "Paid events", value: rows.filter((row) => row.eventType.includes("paid")).length },
            { label: "Created events", value: rows.filter((row) => row.eventType.includes("created")).length },
          ],
        },
      };
    }

    if (type === "notes_summary") {
      const noteEvents = await this.ingestionRepository.findByEventType(tenantId, "note.created", 300);
      const rows = noteEvents
        .filter((event) => this.matchesFilters(event.payload as Record<string, unknown>, filters, start, end))
        .map((event) => {
          const payload = event.payload as Record<string, unknown>;
          return {
            noteId: event.entityId,
            noteType: String(payload.noteType ?? payload.type ?? "GENERAL"),
            patientId: String(payload.patientId ?? ""),
            therapistId: String(payload.therapistId ?? ""),
            createdAt: event.ingestedAt.toISOString(),
          };
        });

      return {
        summary: { totalNotes: rows.length },
        rows,
        charts: {
          line: [],
          bar: this.countByField(rows, "noteType"),
          pie: this.countByField(rows, "noteType"),
        },
      };
    }

    if (type === "therapist_activity" || type === "patient_activity") {
      const appointmentEvents = await this.ingestionRepository.findByEventType(tenantId, "appointment.created", 500);
      const field = type === "therapist_activity" ? "therapistId" : "patientId";
      const rows = appointmentEvents
        .filter((event) => this.matchesFilters(event.payload as Record<string, unknown>, filters, start, end))
        .map((event) => {
          const payload = event.payload as Record<string, unknown>;
          return {
            entityId: String(payload[field] ?? ""),
            appointmentId: event.entityId,
            status: String(payload.status ?? "UNKNOWN"),
            scheduledAt: String(payload.scheduledAt ?? event.ingestedAt.toISOString()),
          };
        })
        .filter((row) => row.entityId.length > 0);

      return {
        summary: { totalEvents: rows.length },
        rows,
        charts: {
          line: [],
          bar: this.countByField(rows, "entityId").slice(0, 8),
          pie: this.countByField(rows, "status"),
        },
      };
    }

    return {
      summary: {
        totalAppointments: kpi.totalAppointments,
        revenue: kpi.revenue,
        newPatients: kpi.newPatients,
      },
      rows: daily.map((row) => ({
        date: row.date.toISOString().slice(0, 10),
        totalAppointments: row.totalAppointments,
        revenue: Number(row.revenue),
        newPatients: row.newPatients,
      })),
      charts: {
        line: daily.map((row) => ({
          label: row.date.toISOString().slice(0, 10),
          value: Number(row.revenue),
        })),
        bar: [
          { label: "Appointments", value: kpi.totalAppointments },
          { label: "Patients", value: kpi.newPatients },
        ],
        pie: [
          { label: "Completed", value: kpi.completedAppointments },
          { label: "Cancelled", value: kpi.cancelledAppointments },
        ],
      },
    };
  }

  private async buildTenantUsageReport(start: Date, end: Date): Promise<GeneratedReport> {
    const grouped = await this.database.dailyMetrics.groupBy({
      by: ["tenantId"],
      where: { date: { gte: start, lte: end } },
      _sum: {
        totalAppointments: true,
        revenue: true,
        newPatients: true,
      },
    });

    const rows = grouped.map((entry) => ({
      tenantId: entry.tenantId,
      totalAppointments: entry._sum.totalAppointments ?? 0,
      revenue: Number(entry._sum.revenue ?? 0),
      newPatients: entry._sum.newPatients ?? 0,
    }));

    return {
      summary: {
        tenantCount: rows.length,
        totalAppointments: rows.reduce((sum, row) => sum + Number(row.totalAppointments), 0),
        totalRevenue: rows.reduce((sum, row) => sum + Number(row.revenue), 0),
      },
      rows,
      charts: {
        line: [],
        bar: rows.slice(0, 10).map((row) => ({
          label: row.tenantId.slice(0, 8),
          value: Number(row.totalAppointments),
        })),
        pie: rows.slice(0, 6).map((row) => ({
          label: row.tenantId.slice(0, 8),
          value: Number(row.revenue),
        })),
      },
    };
  }

  private matchesFilters(
    payload: Record<string, unknown>,
    filters: ReportFiltersInput,
    start: Date,
    end: Date,
  ): boolean {
    if (filters.therapistId && String(payload.therapistId ?? "") !== filters.therapistId) {
      return false;
    }

    if (filters.patientId && String(payload.patientId ?? "") !== filters.patientId) {
      return false;
    }

    if (filters.status && String(payload.status ?? "") !== filters.status) {
      return false;
    }

    const timestamp = String(payload.scheduledAt ?? payload.createdAt ?? "");
    if (timestamp) {
      const value = new Date(timestamp);
      if (!Number.isNaN(value.getTime()) && (value < start || value > end)) {
        return false;
      }
    }

    return true;
  }

  private countByField(rows: Array<Record<string, string | number | boolean | null>>, field: string) {
    const counts = new Map<string, number>();

    for (const row of rows) {
      const key = String(row[field] ?? "unknown");
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return Array.from(counts.entries()).map(([label, value]) => ({ label, value }));
  }
}
