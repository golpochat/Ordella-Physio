import { Injectable, NotFoundException } from "@nestjs/common";
import type { ReportRequest } from "@/generated/prisma";
import { REPORT_STATUSES } from "@/constants";
import { ReportingEventPublisher } from "@/events/reporting-event.publisher";
import { ReportGeneratorService } from "@/reports/report-generator.service";
import { ReportsRepository } from "@/reports/reports.repository";
import {
  applyRoleFilters,
  assertCanGenerateReport,
  assertCanViewReport,
  isGlobalReport,
} from "@/reports/utils/report-access";
import type { SecurityUser } from "@ordella/security";
import type {
  CreateReportRequestInput,
  DownloadReportInput,
  ListReportRequestsInput,
  ReportType,
} from "@ordella/validation";
import type { Prisma } from "@/generated/prisma";

function toReportResponse(report: ReportRequest) {
  return {
    id: report.id,
    tenantId: report.tenantId,
    userId: report.userId,
    type: report.type,
    status: report.status,
    filters: report.filters,
    resultUrl: report.resultUrl,
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
  };
}

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly reportGenerator: ReportGeneratorService,
    private readonly eventPublisher: ReportingEventPublisher,
  ) {}

  async createRequest(
    tenantId: string,
    user: SecurityUser,
    dto: CreateReportRequestInput,
    correlationId?: string,
  ) {
    assertCanGenerateReport(user, dto.type);
    const filters = applyRoleFilters(user, dto.type, dto.filters as Record<string, unknown>);

    const report = await this.reportsRepository.create(tenantId, {
      userId: user.userId,
      type: dto.type,
      status: REPORT_STATUSES.PENDING,
      filters: filters as Prisma.InputJsonValue,
    });

    await this.eventPublisher.publishReportRequestCreated(
      {
        reportId: report.id,
        tenantId: report.tenantId,
        userId: report.userId,
        type: report.type,
        filters,
      },
      correlationId,
    );

    void this.processReport(report.id, tenantId, correlationId);

    return toReportResponse(report);
  }

  async listReports(tenantId: string, user: SecurityUser, query: ListReportRequestsInput) {
    const result = await this.reportsRepository.list(tenantId, undefined, query);

    return {
      ...result,
      items: result.items
        .filter((report) => {
          try {
            assertCanViewReport(user, report.type as ReportType);
            return true;
          } catch {
            return false;
          }
        })
        .map(toReportResponse),
    };
  }

  async getReport(tenantId: string, user: SecurityUser, id: string) {
    const report = await this.findAccessibleReport(tenantId, user, id);
    return toReportResponse(report);
  }

  async downloadReport(
    tenantId: string,
    user: SecurityUser,
    id: string,
    query: DownloadReportInput,
  ) {
    const report = await this.findAccessibleReport(tenantId, user, id);

    if (report.status !== REPORT_STATUSES.COMPLETED || !report.resultUrl) {
      throw new NotFoundException("Report result is not ready");
    }

    const content = await this.reportGenerator.readResult(report.resultUrl);
    const filters = report.filters as { format?: string };
    const format = query.format ?? filters.format ?? "json";
    const extension = format === "csv" ? "csv" : "json";

    return {
      filename: `${report.type}-${report.id}.${extension}`,
      format,
      content,
      contentType: format === "csv" ? "text/csv" : "application/json",
    };
  }

  async processReport(reportId: string, tenantId: string, correlationId?: string) {
    const claimed = await this.reportsRepository.claimForProcessing(tenantId, reportId);
    if (claimed.count === 0) {
      return;
    }

    const report = await this.reportsRepository.findById(tenantId, reportId);
    if (!report) {
      return;
    }

    try {
      const resultUrl = await this.reportGenerator.generate(report);
      const completed = await this.reportsRepository.update(tenantId, reportId, {
        status: REPORT_STATUSES.COMPLETED,
        resultUrl,
      });

      await this.eventPublisher.publishReportRequestCompleted(
        {
          reportId: completed.id,
          tenantId: completed.tenantId,
          userId: completed.userId,
          type: completed.type,
          resultUrl,
        },
        correlationId,
      );
    } catch (error) {
      const failed = await this.reportsRepository.update(tenantId, reportId, {
        status: REPORT_STATUSES.FAILED,
      });

      await this.eventPublisher.publishReportRequestFailed(
        {
          reportId: failed.id,
          tenantId: failed.tenantId,
          userId: failed.userId,
          type: failed.type,
          error: error instanceof Error ? error.message : "Report generation failed",
        },
        correlationId,
      );
    }
  }

  private async findAccessibleReport(tenantId: string, user: SecurityUser, id: string) {
    let report = await this.reportsRepository.findById(tenantId, id);

    if (!report && user.role === "SYSTEM") {
      report = await this.reportsRepository.findByIdGlobal(id);
    }

    if (!report) {
      throw new NotFoundException("Report not found");
    }

    if (user.role !== "SYSTEM" && report.tenantId !== tenantId) {
      throw new NotFoundException("Report not found");
    }

    if (isGlobalReport(report.type as ReportType, user.role) && user.role !== "SYSTEM") {
      throw new NotFoundException("Report not found");
    }

    assertCanViewReport(user, report.type as ReportType);
    return report;
  }
}
