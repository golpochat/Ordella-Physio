import { BadRequestException, Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";
import { AppointmentReportService } from "@/services/appointment-report.service";
import { parseInternalMetricsRange } from "@/utils/internal-metrics-range";
import type { ReportGroupBy } from "@/utils/period-bucket";

@Controller("appointments/internal")
export class InternalAppointmentReportController {
  constructor(
    private readonly appointmentReportService: AppointmentReportService,
    private readonly database: DatabaseService,
  ) {}

  @Get("index-feed")
  async indexFeed(
    @Query("tenantId") tenantId: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("tenantId is required");
    }

    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(200, Math.max(1, Number(limit) || 100));
    const skip = (safePage - 1) * safeLimit;
    const where = { tenantId: tenantId.trim() };

    const [data, total] = await Promise.all([
      this.database.appointment.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          tenantId: true,
          patientId: true,
          therapistId: true,
          startTime: true,
          endTime: true,
          status: true,
          type: true,
        },
      }),
      this.database.appointment.count({ where }),
    ]);

    return {
      data: data.map((appointment) => ({
        ...appointment,
        startTime: appointment.startTime.toISOString(),
        endTime: appointment.endTime.toISOString(),
      })),
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.max(1, Math.ceil(total / safeLimit)),
      },
    };
  }

  @Get("record/:appointmentId")
  async getAppointmentRecord(
    @Query("tenantId") tenantId: string,
    @Param("appointmentId") appointmentId: string,
  ) {
    if (!tenantId?.trim()) {
      throw new NotFoundException();
    }

    const appointment = await this.database.appointment.findFirst({
      where: { id: appointmentId, tenantId: tenantId.trim() },
    });

    if (!appointment) {
      throw new NotFoundException();
    }

    return {
      id: appointment.id,
      tenantId: appointment.tenantId,
      patientId: appointment.patientId,
      therapistId: appointment.therapistId,
      startTime: appointment.startTime.toISOString(),
      endTime: appointment.endTime.toISOString(),
      status: appointment.status,
      type: appointment.type,
    };
  }

  @Get("report")
  async getAppointmentReport(
    @Query("tenantId") tenantId: string,
    @Query("start") start: string,
    @Query("end") end: string,
    @Query("groupBy") groupBy: string,
    @Query("staffId") staffId?: string,
    @Query("locationId") locationId?: string,
    @Query("appointmentType") appointmentType?: string,
    @Query("status") status?: string,
  ) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("tenantId is required");
    }

    const range = parseInternalMetricsRange(start, end);
    if (!range) {
      throw new BadRequestException("Invalid report date range");
    }

    const normalizedGroupBy = normalizeGroupBy(groupBy);
    if (!normalizedGroupBy) {
      throw new BadRequestException("Invalid groupBy");
    }

    return this.appointmentReportService.getReport({
      tenantId: tenantId.trim(),
      start: range.start,
      end: range.end,
      groupBy: normalizedGroupBy,
      staffId: staffId?.trim() || undefined,
      locationId: locationId?.trim() || undefined,
      appointmentType: appointmentType?.trim() || undefined,
      status: status?.trim() || undefined,
    });
  }
}

function normalizeGroupBy(value: string | undefined): ReportGroupBy | null {
  if (value === "day" || value === "week" || value === "month") {
    return value;
  }
  return null;
}
