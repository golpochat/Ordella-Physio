import { Injectable, Logger } from "@nestjs/common";
import { ScheduledReportRepository } from "@/reports/scheduled-report.repository";
import { ReportExportService } from "@/reports/report-export.service";
import { computeNextRunAt } from "@/utils/schedule-next-run";
import type { SavedReportType } from "@ordella/validation";

async function sendEmail(to: string[], subject: string, body: string): Promise<void> {
  // Stub for future communication-service integration.
  void to;
  void subject;
  void body;
}

@Injectable()
export class ReportSchedulerService {
  private readonly logger = new Logger(ReportSchedulerService.name);

  constructor(
    private readonly scheduledReportRepository: ScheduledReportRepository,
    private readonly reportExportService: ReportExportService,
  ) {}

  async runDueReports() {
    const now = new Date();
    const dueReports = await this.scheduledReportRepository.findDue(now);
    const results = [];

    for (const scheduled of dueReports) {
      if (!scheduled.savedReport) {
        continue;
      }

      try {
        const exportData = await this.reportExportService.exportBySavedType(
          scheduled.tenantId,
          scheduled.savedReport.type as SavedReportType,
          scheduled.savedReport.config as Record<string, unknown>,
        );

        const summary = exportData.rows
          .slice(0, 5)
          .map((row) => JSON.stringify(row))
          .join("\n");

        await sendEmail(
          scheduled.recipients,
          `Scheduled report: ${scheduled.savedReport.name}`,
          `Report summary (${scheduled.savedReport.type})\n\n${summary}`,
        );

        const nextRunAt = computeNextRunAt({
          frequency: scheduled.frequency,
          timeOfDay: scheduled.timeOfDay,
          dayOfWeek: scheduled.dayOfWeek,
          dayOfMonth: scheduled.dayOfMonth,
          from: now,
        });

        await this.scheduledReportRepository.update(scheduled.tenantId, scheduled.id, {
          lastRunAt: now,
          nextRunAt,
        });

        results.push({ id: scheduled.id, status: "sent" });
      } catch (error) {
        this.logger.warn(`Failed to run scheduled report ${scheduled.id}`, error);
        results.push({ id: scheduled.id, status: "failed" });
      }
    }

    return { processed: results.length, results };
  }
}
