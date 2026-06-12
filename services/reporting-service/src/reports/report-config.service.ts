import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { SecurityUser } from "@ordella/security";
import type {
  CreateSavedReportInput,
  CreateScheduledReportInput,
  ListSavedReportsInput,
  UpdateSavedReportInput,
  UpdateScheduledReportInput,
} from "@ordella/validation";
import {
  SavedReportRepository,
  toSavedReportResponse,
} from "@/reports/saved-report.repository";
import {
  ScheduledReportRepository,
  toScheduledReportResponse,
} from "@/reports/scheduled-report.repository";
import { computeNextRunAt } from "@/utils/schedule-next-run";
import {
  invalidRecipientsError,
  invalidReportConfigError,
  savedReportNotFoundError,
  scheduledReportNotFoundError,
  tenantMismatchError,
} from "@/utils/reporting-errors";

@Injectable()
export class ReportConfigService {
  constructor(
    private readonly savedReportRepository: SavedReportRepository,
    private readonly scheduledReportRepository: ScheduledReportRepository,
  ) {}

  async createSavedReport(user: SecurityUser, payload: CreateSavedReportInput) {
    if (!payload.config || typeof payload.config !== "object") {
      throw invalidReportConfigError();
    }

    const report = await this.savedReportRepository.create({
      tenantId: user.tenantId,
      name: payload.name.trim(),
      type: payload.type,
      config: payload.config as Prisma.InputJsonValue,
      createdByUserId: user.userId,
    });

    return toSavedReportResponse(report);
  }

  async updateSavedReport(user: SecurityUser, id: string, payload: UpdateSavedReportInput) {
    const existing = await this.savedReportRepository.findById(user.tenantId, id);
    if (!existing) {
      throw savedReportNotFoundError();
    }

    if (payload.config !== undefined && (typeof payload.config !== "object" || !payload.config)) {
      throw invalidReportConfigError();
    }

    await this.savedReportRepository.update(user.tenantId, id, {
      ...(payload.name ? { name: payload.name.trim() } : {}),
      ...(payload.config ? { config: payload.config as Prisma.InputJsonValue } : {}),
    });

    const updated = await this.savedReportRepository.findById(user.tenantId, id);
    if (!updated) {
      throw savedReportNotFoundError();
    }

    return toSavedReportResponse(updated);
  }

  async listSavedReports(user: SecurityUser, query: ListSavedReportsInput) {
    const result = await this.savedReportRepository.list(user.tenantId, query);
    return {
      items: result.items.map(toSavedReportResponse),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  async deleteSavedReport(user: SecurityUser, id: string) {
    const existing = await this.savedReportRepository.findById(user.tenantId, id);
    if (!existing) {
      throw savedReportNotFoundError();
    }

    await this.savedReportRepository.delete(user.tenantId, id);
    return { message: "Saved report deleted" };
  }

  async createScheduledReport(user: SecurityUser, payload: CreateScheduledReportInput) {
    if (!payload.recipients?.length) {
      throw invalidRecipientsError();
    }

    const savedReport = await this.savedReportRepository.findById(
      user.tenantId,
      payload.savedReportId,
    );
    if (!savedReport) {
      throw savedReportNotFoundError();
    }

    const nextRunAt = computeNextRunAt({
      frequency: payload.frequency,
      timeOfDay: payload.timeOfDay,
      dayOfWeek: payload.dayOfWeek,
      dayOfMonth: payload.dayOfMonth,
    });

    const scheduled = await this.scheduledReportRepository.create({
      tenantId: user.tenantId,
      savedReport: { connect: { id: savedReport.id } },
      frequency: payload.frequency,
      timeOfDay: payload.timeOfDay,
      dayOfWeek: payload.dayOfWeek ?? null,
      dayOfMonth: payload.dayOfMonth ?? null,
      recipients: payload.recipients,
      nextRunAt,
      status: payload.status ?? "ACTIVE",
      createdByUserId: user.userId,
    });

    return toScheduledReportResponse({ ...scheduled, savedReport });
  }

  async updateScheduledReport(
    user: SecurityUser,
    id: string,
    payload: UpdateScheduledReportInput,
  ) {
    const existing = await this.scheduledReportRepository.findById(user.tenantId, id);
    if (!existing) {
      throw scheduledReportNotFoundError();
    }

    if (payload.recipients !== undefined && !payload.recipients.length) {
      throw invalidRecipientsError();
    }

    const frequency = payload.frequency ?? existing.frequency;
    const timeOfDay = payload.timeOfDay ?? existing.timeOfDay;
    const dayOfWeek = payload.dayOfWeek ?? existing.dayOfWeek;
    const dayOfMonth = payload.dayOfMonth ?? existing.dayOfMonth;
    const shouldRecompute =
      payload.frequency !== undefined ||
      payload.timeOfDay !== undefined ||
      payload.dayOfWeek !== undefined ||
      payload.dayOfMonth !== undefined ||
      payload.status === "ACTIVE";

    const nextRunAt = shouldRecompute
      ? computeNextRunAt({ frequency, timeOfDay, dayOfWeek, dayOfMonth })
      : existing.nextRunAt;

    await this.scheduledReportRepository.update(user.tenantId, id, {
      ...(payload.frequency ? { frequency: payload.frequency } : {}),
      ...(payload.timeOfDay ? { timeOfDay: payload.timeOfDay } : {}),
      ...(payload.dayOfWeek !== undefined ? { dayOfWeek: payload.dayOfWeek } : {}),
      ...(payload.dayOfMonth !== undefined ? { dayOfMonth: payload.dayOfMonth } : {}),
      ...(payload.recipients ? { recipients: payload.recipients } : {}),
      ...(payload.status ? { status: payload.status } : {}),
      ...(shouldRecompute ? { nextRunAt } : {}),
    });

    const updated = await this.scheduledReportRepository.findById(user.tenantId, id);
    if (!updated) {
      throw scheduledReportNotFoundError();
    }

    return toScheduledReportResponse(updated);
  }

  async listScheduledReports(user: SecurityUser) {
    const items = await this.scheduledReportRepository.listByTenant(user.tenantId);
    return { items: items.map(toScheduledReportResponse) };
  }

  assertTenantAccess(user: SecurityUser, tenantId: string) {
    if (user.tenantId !== tenantId) {
      throw tenantMismatchError();
    }
  }
}
