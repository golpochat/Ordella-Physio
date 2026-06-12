import { Injectable } from "@nestjs/common";
import type { AppointmentStatus } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

const SCHEDULED_STATUSES: AppointmentStatus[] = ["SCHEDULED", "CONFIRMED", "IN_PROGRESS"];

export type AppointmentMetricsResponse = {
  totalAppointments: number;
  appointmentsByStatus: {
    SCHEDULED: number;
    COMPLETED: number;
    CANCELLED: number;
    NO_SHOW: number;
  };
  topStaffByAppointments: Array<{ staffId: string; count: number }>;
  topServices: Array<{ serviceName: string; count: number }>;
};

@Injectable()
export class AppointmentMetricsService {
  constructor(private readonly database: DatabaseService) {}

  async getMetrics(
    tenantId: string,
    start: Date,
    end: Date,
  ): Promise<AppointmentMetricsResponse> {
    const where = {
      tenantId,
      startTime: { gte: start, lte: end },
    };

    const [statusGroups, staffGroups, serviceGroups, totalAppointments] = await Promise.all([
      this.database.appointment.groupBy({
        by: ["status"],
        where,
        _count: { _all: true },
      }),
      this.database.appointment.groupBy({
        by: ["therapistId"],
        where,
        _count: { _all: true },
        orderBy: { _count: { therapistId: "desc" } },
        take: 5,
      }),
      this.database.appointment.groupBy({
        by: ["type"],
        where,
        _count: { _all: true },
        orderBy: { _count: { type: "desc" } },
        take: 5,
      }),
      this.database.appointment.count({ where }),
    ]);

    const appointmentsByStatus = {
      SCHEDULED: 0,
      COMPLETED: 0,
      CANCELLED: 0,
      NO_SHOW: 0,
    };

    for (const group of statusGroups) {
      if (SCHEDULED_STATUSES.includes(group.status)) {
        appointmentsByStatus.SCHEDULED += group._count._all;
        continue;
      }

      if (group.status in appointmentsByStatus) {
        appointmentsByStatus[group.status as keyof typeof appointmentsByStatus] += group._count._all;
      }
    }

    return {
      totalAppointments,
      appointmentsByStatus,
      topStaffByAppointments: staffGroups.map((group) => ({
        staffId: group.therapistId,
        count: group._count._all,
      })),
      topServices: serviceGroups.map((group) => ({
        serviceName: group.type,
        count: group._count._all,
      })),
    };
  }
}
