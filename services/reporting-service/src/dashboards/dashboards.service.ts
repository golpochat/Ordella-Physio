import { Injectable } from "@nestjs/common";
import { ReportingCacheService } from "@/caching/cache.service";
import { MetricsRepository } from "@/metrics/metrics.repository";
import { DashboardsRepository } from "@/dashboards/dashboards.repository";
import type { DashboardQueryDto } from "@/dashboards/dto/dashboard-query.dto";
import { buildRevenueWidget } from "@/dashboards/widgets/revenue-widget";
import { buildAppointmentsWidget } from "@/dashboards/widgets/appointments-widget";
import { buildPatientsWidget } from "@/dashboards/widgets/patients-widget";
import { buildTherapistLoadWidget } from "@/dashboards/widgets/therapist-load-widget";
import { buildFinancialSummaryWidget } from "@/dashboards/widgets/financial-summary-widget";
import { parseDateRange } from "@/utils/date-helpers";

@Injectable()
export class DashboardsService {
  constructor(
    private readonly dashboardsRepository: DashboardsRepository,
    private readonly metricsRepository: MetricsRepository,
    private readonly cacheService: ReportingCacheService,
  ) {}

  async getDashboard(tenantId: string, query: DashboardQueryDto) {
    const dashboardType = query.dashboardType ?? "kpi";
    const cached = await this.cacheService.getDashboard(tenantId, dashboardType);
    if (cached) {
      return cached;
    }

    const { start, end } = parseDateRange(query.startDate, query.endDate);
    const kpi = await this.metricsRepository.findKpiSummary(tenantId, start, end);
    const response = this.buildDashboardResponse(dashboardType, kpi, query);

    await this.dashboardsRepository.upsert(tenantId, dashboardType, response);
    await this.cacheService.setDashboard(tenantId, dashboardType, response);

    return response;
  }

  private buildDashboardResponse(
    dashboardType: DashboardQueryDto["dashboardType"],
    kpi: Awaited<ReturnType<MetricsRepository["findKpiSummary"]>>,
    query: DashboardQueryDto,
  ) {
    const widgets = [];

    switch (dashboardType) {
      case "revenue":
        widgets.push(
          buildRevenueWidget({
            totalRevenue: kpi.revenue,
            outstandingBalance: kpi.outstandingBalance,
            periodStart: query.startDate,
            periodEnd: query.endDate,
          }),
        );
        break;
      case "appointments":
        widgets.push(
          buildAppointmentsWidget({
            totalAppointments: kpi.totalAppointments,
            completedAppointments: kpi.completedAppointments,
            cancelledAppointments: kpi.cancelledAppointments,
            noShowAppointments: kpi.noShowAppointments,
          }),
        );
        break;
      case "patients":
        widgets.push(buildPatientsWidget({ newPatients: kpi.newPatients }));
        break;
      case "therapist_utilization":
        widgets.push(
          buildTherapistLoadWidget({
            therapistId: query.therapistId,
            utilizationRate: 0,
            appointmentCount: kpi.totalAppointments,
          }),
        );
        break;
      case "financial_overview":
        widgets.push(
          buildFinancialSummaryWidget({
            revenue: kpi.revenue,
            outstandingBalance: kpi.outstandingBalance,
            paymentsReceived: 0,
            refunds: 0,
          }),
        );
        break;
      case "kpi":
      default:
        widgets.push(
          buildRevenueWidget({
            totalRevenue: kpi.revenue,
            outstandingBalance: kpi.outstandingBalance,
          }),
          buildAppointmentsWidget({
            totalAppointments: kpi.totalAppointments,
            completedAppointments: kpi.completedAppointments,
            cancelledAppointments: kpi.cancelledAppointments,
            noShowAppointments: kpi.noShowAppointments,
          }),
          buildPatientsWidget({ newPatients: kpi.newPatients }),
        );
        break;
    }

    return {
      dashboardType,
      widgets,
      generatedAt: new Date().toISOString(),
    };
  }
}
