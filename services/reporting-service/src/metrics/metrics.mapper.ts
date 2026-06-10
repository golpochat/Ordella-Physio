import type { DailyMetrics, MonthlyMetrics, WeeklyMetrics } from "@/generated/prisma";

export function toDailyMetricsResponse(metrics: DailyMetrics) {
  return {
    id: metrics.id,
    tenantId: metrics.tenantId,
    date: metrics.date.toISOString().slice(0, 10),
    totalAppointments: metrics.totalAppointments,
    completedAppointments: metrics.completedAppointments,
    cancelledAppointments: metrics.cancelledAppointments,
    noShowAppointments: metrics.noShowAppointments,
    newPatients: metrics.newPatients,
    revenue: Number(metrics.revenue),
    outstandingBalance: Number(metrics.outstandingBalance),
  };
}

export function toWeeklyMetricsResponse(metrics: WeeklyMetrics) {
  return {
    id: metrics.id,
    tenantId: metrics.tenantId,
    week: metrics.week,
    totalAppointments: metrics.totalAppointments,
    completedAppointments: metrics.completedAppointments,
    cancelledAppointments: metrics.cancelledAppointments,
    noShowAppointments: metrics.noShowAppointments,
    newPatients: metrics.newPatients,
    revenue: Number(metrics.revenue),
    outstandingBalance: Number(metrics.outstandingBalance),
  };
}

export function toMonthlyMetricsResponse(metrics: MonthlyMetrics) {
  return {
    id: metrics.id,
    tenantId: metrics.tenantId,
    month: metrics.month,
    totalAppointments: metrics.totalAppointments,
    completedAppointments: metrics.completedAppointments,
    cancelledAppointments: metrics.cancelledAppointments,
    noShowAppointments: metrics.noShowAppointments,
    newPatients: metrics.newPatients,
    revenue: Number(metrics.revenue),
    outstandingBalance: Number(metrics.outstandingBalance),
  };
}

export function toMetricsListResponse<T, R>(items: T[], mapper: (item: T) => R) {
  return { items: items.map(mapper), total: items.length };
}
