import { Injectable } from "@nestjs/common";
import type { DailyMetrics, MonthlyMetrics, Prisma, WeeklyMetrics } from "@/generated/prisma";
import { TenantRepository } from "@ordella/database";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class MetricsRepository {
  constructor(private readonly database: DatabaseService) {}

  private dailyForTenant(tenantId: string) {
    return new TenantRepository<
      DailyMetrics,
      Prisma.DailyMetricsCreateInput,
      Prisma.DailyMetricsUpdateInput
    >(this.database.dailyMetrics as never, { tenantId });
  }

  private weeklyForTenant(tenantId: string) {
    return new TenantRepository<
      WeeklyMetrics,
      Prisma.WeeklyMetricsCreateInput,
      Prisma.WeeklyMetricsUpdateInput
    >(this.database.weeklyMetrics as never, { tenantId });
  }

  private monthlyForTenant(tenantId: string) {
    return new TenantRepository<
      MonthlyMetrics,
      Prisma.MonthlyMetricsCreateInput,
      Prisma.MonthlyMetricsUpdateInput
    >(this.database.monthlyMetrics as never, { tenantId });
  }

  findDailyMetrics(tenantId: string, start: Date, end: Date) {
    return this.database.dailyMetrics.findMany({
      where: { tenantId, date: { gte: start, lte: end } },
      orderBy: { date: "asc" },
    });
  }

  findWeeklyMetrics(tenantId: string, startWeek: string, endWeek: string) {
    return this.database.weeklyMetrics.findMany({
      where: { tenantId, week: { gte: startWeek, lte: endWeek } },
      orderBy: { week: "asc" },
    });
  }

  findMonthlyMetrics(tenantId: string, startMonth: string, endMonth: string) {
    return this.database.monthlyMetrics.findMany({
      where: { tenantId, month: { gte: startMonth, lte: endMonth } },
      orderBy: { month: "asc" },
    });
  }

  async findKpiSummary(tenantId: string, start: Date, end: Date) {
    const daily = await this.findDailyMetrics(tenantId, start, end);
    return {
      totalAppointments: daily.reduce((sum, row) => sum + row.totalAppointments, 0),
      completedAppointments: daily.reduce((sum, row) => sum + row.completedAppointments, 0),
      cancelledAppointments: daily.reduce((sum, row) => sum + row.cancelledAppointments, 0),
      noShowAppointments: daily.reduce((sum, row) => sum + row.noShowAppointments, 0),
      newPatients: daily.reduce((sum, row) => sum + row.newPatients, 0),
      revenue: daily.reduce((sum, row) => sum + Number(row.revenue), 0),
      outstandingBalance: daily.reduce((sum, row) => sum + Number(row.outstandingBalance), 0),
    };
  }

  upsertDailyMetrics(
    tenantId: string,
    date: Date,
    data: Omit<Prisma.DailyMetricsCreateInput, "tenantId" | "date">,
  ) {
    return this.database.dailyMetrics.upsert({
      where: { tenantId_date: { tenantId, date } },
      create: { ...data, tenantId, date },
      update: data,
    });
  }

  upsertWeeklyMetrics(
    tenantId: string,
    week: string,
    data: Omit<Prisma.WeeklyMetricsCreateInput, "tenantId" | "week">,
  ) {
    return this.database.weeklyMetrics.upsert({
      where: { tenantId_week: { tenantId, week } },
      create: { ...data, tenantId, week },
      update: data,
    });
  }

  upsertMonthlyMetrics(
    tenantId: string,
    month: string,
    data: Omit<Prisma.MonthlyMetricsCreateInput, "tenantId" | "month">,
  ) {
    return this.database.monthlyMetrics.upsert({
      where: { tenantId_month: { tenantId, month } },
      create: { ...data, tenantId, month },
      update: data,
    });
  }
}
