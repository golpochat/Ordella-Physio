import { v4 as uuidv4 } from "uuid";
import type { createApiClient } from "@/lib/api-client";
import { API_ROUTES, AUTHORIZATION_HEADER, CORRELATION_ID_HEADER, TENANT_HEADER } from "@/lib/constants";
import type {
  AppointmentReportQuery,
  AppointmentReportResponse,
  CreateSavedReportInput,
  CreateScheduledReportInput,
  DashboardMetricsQuery,
  DashboardMetricsResponse,
  MetricsKpiResponse,
  PatientReportQuery,
  PatientReportResponse,
  ReportExportResponse,
  ReportFilters,
  ReportListResponse,
  ReportRequest,
  ReportType,
  RevenueReportQuery,
  RevenueReportResponse,
  SavedReport,
  SavedReportListResponse,
  SavedReportType,
  ScheduledReport,
  ScheduledReportListResponse,
  UpdateSavedReportInput,
} from "@/lib/reporting-types";

export type ReportingApiClient = ReturnType<typeof createApiClient>;

type ReportingApiContext = {
  accessToken?: string | null;
  tenantId?: string | null;
};

export function createReportingApi(api: ReportingApiClient, getContext: () => ReportingApiContext) {
  return {
    requestReport(type: ReportType, filters: ReportFilters) {
      return api.post<ReportRequest>("reporting", "/reports/request", { type, filters });
    },

    list(params?: { status?: string; type?: ReportType; page?: number; limit?: number }) {
      return api.get<ReportListResponse>("reporting", "/reports", { params });
    },

    getById(id: string) {
      return api.get<ReportRequest>("reporting", `/reports/${id}`);
    },

    getKpi(params?: { startDate?: string; endDate?: string }) {
      return api.get<MetricsKpiResponse>("reporting", "/metrics/kpi", { params });
    },

    getDashboard(params?: DashboardMetricsQuery) {
      return api.get<DashboardMetricsResponse>("reporting", "/dashboard", { params });
    },

    getAppointmentReport(params?: AppointmentReportQuery) {
      return api.get<AppointmentReportResponse>("reporting", "/reports/appointments", { params });
    },

    getRevenueReport(params?: RevenueReportQuery) {
      return api.get<RevenueReportResponse>("reporting", "/reports/revenue", { params });
    },

    getPatientReport(params?: PatientReportQuery) {
      return api.get<PatientReportResponse>("reporting", "/reports/patients", { params });
    },

    listSavedReports(params?: { type?: SavedReportType; page?: number; limit?: number }) {
      return api.get<SavedReportListResponse>("reporting", "/reports/saved", { params });
    },

    createSavedReport(body: CreateSavedReportInput) {
      return api.post<SavedReport>("reporting", "/reports/saved", body);
    },

    updateSavedReport(id: string, body: UpdateSavedReportInput) {
      return api.put<SavedReport>("reporting", `/reports/saved/${id}`, body);
    },

    deleteSavedReport(id: string) {
      return api.delete<{ message: string }>("reporting", `/reports/saved/${id}`);
    },

    listScheduledReports() {
      return api.get<ScheduledReportListResponse>("reporting", "/reports/scheduled");
    },

    createScheduledReport(body: CreateScheduledReportInput) {
      return api.post<ScheduledReport>("reporting", "/reports/scheduled", body);
    },

    exportAppointmentReport(params?: AppointmentReportQuery) {
      return api.get<ReportExportResponse>("reporting", "/reports/appointments/export", { params });
    },

    exportRevenueReport(params?: RevenueReportQuery) {
      return api.get<ReportExportResponse>("reporting", "/reports/revenue/export", { params });
    },

    exportPatientReport(params?: PatientReportQuery) {
      return api.get<ReportExportResponse>("reporting", "/reports/patients/export", { params });
    },

    async download(id: string, format: "json" | "csv" = "json") {
      const session = getContext();
      const correlationId = uuidv4();
      const url = new URL(`${API_ROUTES.reporting}/reports/${id}/download`, window.location.origin);
      url.searchParams.set("format", format);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          [CORRELATION_ID_HEADER]: correlationId,
          ...(session.tenantId ? { [TENANT_HEADER]: session.tenantId } : {}),
          ...(session.accessToken ? { [AUTHORIZATION_HEADER]: `Bearer ${session.accessToken}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition") ?? "";
      const match = disposition.match(/filename="(.+)"/);
      const filename = match?.[1] ?? `report-${id}.${format}`;

      return { blob, filename };
    },
  };
}
