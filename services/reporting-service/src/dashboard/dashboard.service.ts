import { Injectable } from "@nestjs/common";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { BillingServiceClient } from "@/integrations/billing-service.client";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import type { DashboardMetricsQueryDto } from "@/dashboard/dto/dashboard-metrics-query.dto";
import { getDateRange, toIsoDateString } from "@/utils/date-range";
import { invalidDateRangeError } from "@/utils/reporting-errors";

export type DashboardMetricsResponse = {
  dateRange: { start: string; end: string };
  totals: {
    patients: number;
    newPatients: number;
    appointments: number;
    revenue: number;
  };
  appointmentsByStatus: {
    SCHEDULED: number;
    COMPLETED: number;
    CANCELLED: number;
    NO_SHOW: number;
  };
  revenueByStatus: {
    PAID: number;
    ISSUED: number;
    VOID: number;
  };
  topStaff: Array<{
    staffId: string;
    name: string;
    appointments: number;
  }>;
  topServices: Array<{
    serviceName: string;
    count: number;
  }>;
};

@Injectable()
export class DashboardMetricsService {
  constructor(
    private readonly patientServiceClient: PatientServiceClient,
    private readonly appointmentServiceClient: AppointmentServiceClient,
    private readonly billingServiceClient: BillingServiceClient,
    private readonly staffServiceClient: StaffServiceClient,
  ) {}

  async getDashboardMetrics(
    tenantId: string,
    query: DashboardMetricsQueryDto,
  ): Promise<DashboardMetricsResponse> {
    const range = getDateRange(query.rangeType, query.startDate, query.endDate);
    if (!range) {
      throw invalidDateRangeError();
    }

    const [patientMetrics, appointmentMetrics, billingMetrics] = await Promise.all([
      this.patientServiceClient.getMetrics(tenantId, range.start, range.end),
      this.appointmentServiceClient.getMetrics(tenantId, range.start, range.end),
      this.billingServiceClient.getMetrics(tenantId, range.start, range.end),
    ]);

    const topStaffIds =
      appointmentMetrics?.topStaffByAppointments.map((entry) => entry.staffId) ?? [];
    const staffSummaries = await this.staffServiceClient.getStaffSummaries(tenantId, topStaffIds);
    const staffNameById = new Map(
      staffSummaries.map((staff) => [staff.id, `${staff.firstName} ${staff.lastName}`.trim()]),
    );

    const topStaff =
      appointmentMetrics?.topStaffByAppointments.map((entry) => ({
        staffId: entry.staffId,
        name: staffNameById.get(entry.staffId) ?? "Unknown staff",
        appointments: entry.count,
      })) ?? [];

    return {
      dateRange: {
        start: toIsoDateString(range.start),
        end: toIsoDateString(range.end),
      },
      totals: {
        patients: patientMetrics?.totalPatients ?? 0,
        newPatients: patientMetrics?.newPatientsInRange ?? 0,
        appointments: appointmentMetrics?.totalAppointments ?? 0,
        revenue: billingMetrics?.revenueTotal ?? 0,
      },
      appointmentsByStatus: appointmentMetrics?.appointmentsByStatus ?? {
        SCHEDULED: 0,
        COMPLETED: 0,
        CANCELLED: 0,
        NO_SHOW: 0,
      },
      revenueByStatus: billingMetrics?.revenueByStatus ?? {
        PAID: 0,
        ISSUED: 0,
        VOID: 0,
      },
      topStaff,
      topServices: appointmentMetrics?.topServices ?? [],
    };
  }
}
