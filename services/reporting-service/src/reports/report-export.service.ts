import { Injectable } from "@nestjs/common";
import type {
  AppointmentReportQueryInput,
  PatientReportQueryInput,
  RevenueReportQueryInput,
  SavedReportType,
} from "@ordella/validation";
import { ReportsAppointmentService } from "@/reports/reports-appointment.service";
import { ReportsRevenueService } from "@/reports/reports-revenue.service";
import { ReportsPatientService } from "@/reports/reports-patient.service";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { FileStorageClient } from "@/integrations/file-storage.client";
import { buildReportExportCsv } from "@/utils/report-export-csv";
import { invalidReportConfigError } from "@/utils/reporting-errors";
import type { AuditActorContext } from "@ordella/shared";

export type ExportColumn = { key: string; label: string };

const APPOINTMENT_COLUMNS: ExportColumn[] = [
  { key: "period", label: "Period" },
  { key: "total", label: "Total" },
  { key: "scheduled", label: "Scheduled" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "noShow", label: "No show" },
];

const REVENUE_COLUMNS: ExportColumn[] = [
  { key: "period", label: "Period" },
  { key: "total", label: "Total" },
  { key: "subtotal", label: "Subtotal" },
  { key: "tax", label: "Tax" },
  { key: "discount", label: "Discount" },
];

const PATIENT_COLUMNS: ExportColumn[] = [
  { key: "period", label: "Period" },
  { key: "newPatients", label: "New patients" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
];

@Injectable()
export class ReportExportService {
  constructor(
    private readonly reportsAppointmentService: ReportsAppointmentService,
    private readonly reportsRevenueService: ReportsRevenueService,
    private readonly reportsPatientService: ReportsPatientService,
    private readonly auditLogClient: AuditLogClient,
    private readonly fileStorageClient: FileStorageClient,
  ) {}

  async exportAppointmentReport(
    tenantId: string,
    query: AppointmentReportQueryInput,
    actor?: AuditActorContext,
  ) {
    const report = await this.reportsAppointmentService.getAppointmentReport(tenantId, query);

    if (actor?.userId) {
      void this.auditLogClient.logAction(
        {
          tenantId,
          actorUserId: actor.userId,
          actorRole: actor.role,
          entityType: "REPORT",
          entityId: "APPOINTMENTS",
          action: "EXPORT",
          metadata: {
            reportType: "APPOINTMENTS",
            range: report.dateRange,
            filters: query,
          },
        },
        { ipAddress: actor.ipAddress, userAgent: actor.userAgent },
      );
    }

    const exportPayload = {
      columns: APPOINTMENT_COLUMNS,
      rows: report.rows,
      dateRange: report.dateRange,
      groupBy: report.groupBy,
    };

    const storedFile = await this.storeExportFile({
      tenantId,
      actor,
      reportType: "APPOINTMENTS",
      columns: APPOINTMENT_COLUMNS,
      rows: report.rows,
    });

    return { ...exportPayload, storedFile };
  }

  async exportRevenueReport(
    tenantId: string,
    query: RevenueReportQueryInput,
    actor?: AuditActorContext,
  ) {
    const report = await this.reportsRevenueService.getRevenueReport(tenantId, query);

    if (actor?.userId) {
      void this.auditLogClient.logAction(
        {
          tenantId,
          actorUserId: actor.userId,
          actorRole: actor.role,
          entityType: "REPORT",
          entityId: "REVENUE",
          action: "EXPORT",
          metadata: {
            reportType: "REVENUE",
            range: report.dateRange,
            filters: query,
          },
        },
        { ipAddress: actor.ipAddress, userAgent: actor.userAgent },
      );
    }

    const exportPayload = {
      columns: REVENUE_COLUMNS,
      rows: report.rows,
      dateRange: report.dateRange,
      groupBy: report.groupBy,
    };

    const storedFile = await this.storeExportFile({
      tenantId,
      actor,
      reportType: "REVENUE",
      columns: REVENUE_COLUMNS,
      rows: report.rows,
    });

    return { ...exportPayload, storedFile };
  }

  async exportPatientReport(
    tenantId: string,
    query: PatientReportQueryInput,
    actor?: AuditActorContext,
  ) {
    const report = await this.reportsPatientService.getPatientReport(tenantId, query);

    if (actor?.userId) {
      void this.auditLogClient.logAction(
        {
          tenantId,
          actorUserId: actor.userId,
          actorRole: actor.role,
          entityType: "REPORT",
          entityId: "PATIENTS",
          action: "EXPORT",
          metadata: {
            reportType: "PATIENTS",
            range: report.dateRange,
            filters: query,
          },
        },
        { ipAddress: actor.ipAddress, userAgent: actor.userAgent },
      );
    }

    const exportPayload = {
      columns: PATIENT_COLUMNS,
      rows: report.rows,
      dateRange: report.dateRange,
      groupBy: report.groupBy,
    };

    const storedFile = await this.storeExportFile({
      tenantId,
      actor,
      reportType: "PATIENTS",
      columns: PATIENT_COLUMNS,
      rows: report.rows,
    });

    return { ...exportPayload, storedFile };
  }

  private async storeExportFile(input: {
    tenantId: string;
    actor?: AuditActorContext;
    reportType: string;
    columns: ExportColumn[];
    rows: Array<Record<string, string | number>>;
  }) {
    if (!input.actor?.userId) {
      return null;
    }

    const csv = buildReportExportCsv(input.columns, input.rows);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    const stamp = new Date().toISOString().slice(0, 10);

    try {
      const result = await this.fileStorageClient.uploadInternal({
        tenantId: input.tenantId,
        ownerUserId: input.actor.userId,
        actorRole: input.actor.role,
        entityType: "REPORT",
        entityId: input.reportType,
        filename: `${input.reportType.toLowerCase()}-report-${stamp}.csv`,
        mimeType: "text/csv",
        contentBase64: Buffer.from(csv, "utf8").toString("base64"),
        expiresAt: expiresAt.toISOString(),
      });

      return result.file;
    } catch {
      return null;
    }
  }

  async exportBySavedType(
    tenantId: string,
    type: SavedReportType,
    config: Record<string, unknown>,
  ) {
    switch (type) {
      case "APPOINTMENT":
        return this.exportAppointmentReport(
          tenantId,
          config as AppointmentReportQueryInput,
        );
      case "REVENUE":
        return this.exportRevenueReport(tenantId, config as RevenueReportQueryInput);
      case "PATIENT":
        return this.exportPatientReport(tenantId, config as PatientReportQueryInput);
      default:
        throw invalidReportConfigError();
    }
  }
}
