import { Injectable } from "@nestjs/common";
import type { AppointmentStatus, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import { listPeriodKeys, toPeriodKey, type ReportGroupBy } from "@/utils/period-bucket";

const SCHEDULED_STATUSES: AppointmentStatus[] = ["SCHEDULED", "CONFIRMED", "IN_PROGRESS"];

export type AppointmentReportQuery = {
  tenantId: string;
  start: Date;
  end: Date;
  groupBy: ReportGroupBy;
  staffId?: string;
  locationId?: string;
  appointmentType?: string;
  status?: string;
};

export type AppointmentReportRow = {
  period: string;
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  noShow: number;
};

@Injectable()
export class AppointmentReportService {
  constructor(private readonly database: DatabaseService) {}

  async getReport(query: AppointmentReportQuery) {
    const where: Prisma.AppointmentWhereInput = {
      tenantId: query.tenantId,
      startTime: { gte: query.start, lte: query.end },
      ...(query.staffId ? { therapistId: query.staffId } : {}),
      ...(query.locationId ? { locationId: query.locationId } : {}),
      ...(query.appointmentType ? { type: query.appointmentType } : {}),
      ...(query.status ? { status: query.status as AppointmentStatus } : {}),
    };

    const appointments = await this.database.appointment.findMany({
      where,
      select: {
        startTime: true,
        status: true,
        type: true,
      },
    });

    const rowMap = new Map<string, AppointmentReportRow>();
    for (const period of listPeriodKeys(query.start, query.end, query.groupBy)) {
      rowMap.set(period, {
        period,
        total: 0,
        scheduled: 0,
        completed: 0,
        cancelled: 0,
        noShow: 0,
      });
    }

    const typeCounts = new Map<string, number>();

    for (const appointment of appointments) {
      const period = toPeriodKey(appointment.startTime, query.groupBy);
      const row = rowMap.get(period);
      if (!row) {
        continue;
      }

      row.total += 1;
      if (SCHEDULED_STATUSES.includes(appointment.status)) {
        row.scheduled += 1;
      } else if (appointment.status === "COMPLETED") {
        row.completed += 1;
      } else if (appointment.status === "CANCELLED") {
        row.cancelled += 1;
      } else if (appointment.status === "NO_SHOW") {
        row.noShow += 1;
      }

      typeCounts.set(appointment.type, (typeCounts.get(appointment.type) ?? 0) + 1);
    }

    return {
      groupBy: query.groupBy,
      rows: [...rowMap.values()],
      byType: [...typeCounts.entries()].map(([appointmentType, count]) => ({
        appointmentType,
        count,
      })),
    };
  }
}
