import { Injectable } from "@nestjs/common";
import type { Gender, PatientStatus, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import { buildSoftDeleteFilter } from "@ordella/database";
import { listPeriodKeys, toPeriodKey, type ReportGroupBy } from "@/utils/period-bucket";

export type PatientReportQuery = {
  tenantId: string;
  start: Date;
  end: Date;
  groupBy: ReportGroupBy;
  gender?: string;
  status?: string;
};

export type PatientReportRow = {
  period: string;
  newPatients: number;
  active: number;
  inactive: number;
};

@Injectable()
export class PatientReportService {
  constructor(private readonly database: DatabaseService) {}

  async getReport(query: PatientReportQuery) {
    const baseWhere: Prisma.PatientWhereInput = {
      tenantId: query.tenantId,
      ...buildSoftDeleteFilter(),
      ...(query.gender ? { gender: query.gender as Gender } : {}),
      ...(query.status ? { status: query.status as PatientStatus } : {}),
    };

    const patients = await this.database.patient.findMany({
      where: baseWhere,
      select: {
        createdAt: true,
        status: true,
      },
    });

    const rowMap = new Map<string, PatientReportRow>();
    for (const period of listPeriodKeys(query.start, query.end, query.groupBy)) {
      rowMap.set(period, {
        period,
        newPatients: 0,
        active: 0,
        inactive: 0,
      });
    }

    for (const patient of patients) {
      if (patient.createdAt < query.start || patient.createdAt > query.end) {
        continue;
      }

      const period = toPeriodKey(patient.createdAt, query.groupBy);
      const row = rowMap.get(period);
      if (row) {
        row.newPatients += 1;
      }
    }

    for (const period of listPeriodKeys(query.start, query.end, query.groupBy)) {
      const periodEnd = periodEndDate(period, query.groupBy, query.end);
      let active = 0;
      let inactive = 0;

      for (const patient of patients) {
        if (patient.createdAt > periodEnd) {
          continue;
        }

        if (patient.status === "ACTIVE") {
          active += 1;
        } else if (patient.status === "INACTIVE") {
          inactive += 1;
        }
      }

      const row = rowMap.get(period);
      if (row) {
        row.active = active;
        row.inactive = inactive;
      }
    }

    return {
      groupBy: query.groupBy,
      rows: [...rowMap.values()],
    };
  }
}

function periodEndDate(period: string, groupBy: ReportGroupBy, rangeEnd: Date): Date {
  if (groupBy === "day") {
    return new Date(`${period}T23:59:59.999Z`);
  }

  if (groupBy === "month") {
    const [year, month] = period.split("-").map(Number);
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return new Date(Date.UTC(year, month - 1, lastDay, 23, 59, 59, 999));
  }

  const [yearPart, weekPart] = period.split("-W");
  const year = Number(yearPart);
  const week = Number(weekPart);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const dayOfWeek = jan4.getUTCDay() || 7;
  const weekStart = new Date(jan4);
  weekStart.setUTCDate(jan4.getUTCDate() - dayOfWeek + 1 + (week - 1) * 7);
  const weekEnd = new Date(weekStart);
  weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
  weekEnd.setUTCHours(23, 59, 59, 999);
  return weekEnd > rangeEnd ? rangeEnd : weekEnd;
}
