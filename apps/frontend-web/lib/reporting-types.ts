export type ReportStatus = "pending" | "processing" | "completed" | "failed";

export type ReportType =
  | "appointments_summary"
  | "appointments_detailed"
  | "billing_summary"
  | "billing_detailed"
  | "notes_summary"
  | "therapist_activity"
  | "patient_activity"
  | "clinic_overview"
  | "tenant_usage";

export type ReportFormat = "json" | "csv";

export type ReportFilters = {
  startDate?: string;
  endDate?: string;
  therapistId?: string;
  patientId?: string;
  status?: string;
  format?: ReportFormat;
};

export type ReportRequest = {
  id: string;
  tenantId: string;
  userId: string;
  type: ReportType;
  status: ReportStatus;
  filters: ReportFilters;
  resultUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ReportListResponse = {
  items: ReportRequest[];
  total: number;
  page: number;
  limit: number;
};

export type MetricsKpiResponse = {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShowAppointments: number;
  newPatients: number;
  revenue: number;
  outstandingBalance: number;
};

export type PortalReportingMode = "full" | "limited" | "readonly";

export type DashboardRangeType =
  | "today"
  | "yesterday"
  | "last_7_days"
  | "last_30_days"
  | "this_month"
  | "last_month"
  | "custom";

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

export type DashboardMetricsQuery = {
  rangeType?: DashboardRangeType;
  startDate?: string;
  endDate?: string;
};

export type ReportGroupBy = "day" | "week" | "month";

export type AdvancedReportBaseQuery = {
  rangeType?: DashboardRangeType;
  startDate?: string;
  endDate?: string;
  groupBy?: ReportGroupBy;
};

export type AppointmentReportQuery = AdvancedReportBaseQuery & {
  staffId?: string;
  locationId?: string;
  appointmentType?: string;
  status?: string;
};

export type RevenueReportQuery = AdvancedReportBaseQuery & {
  staffId?: string;
  patientId?: string;
  status?: "PAID" | "ISSUED" | "VOID";
  minTotal?: number;
  maxTotal?: number;
};

export type PatientReportQuery = AdvancedReportBaseQuery & {
  gender?: "MALE" | "FEMALE" | "OTHER" | "UNKNOWN";
  status?: "ACTIVE" | "INACTIVE";
};

export type ReportChartDataset = {
  key: string;
  label: string;
  values: number[];
};

export type ReportChartData = {
  labels: string[];
  datasets: ReportChartDataset[];
};

export type AppointmentReportRow = {
  period: string;
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  noShow: number;
};

export type RevenueReportRow = {
  period: string;
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
};

export type PatientReportRow = {
  period: string;
  newPatients: number;
  active: number;
  inactive: number;
};

export type AppointmentReportResponse = {
  dateRange: { start: string; end: string };
  groupBy: ReportGroupBy;
  rows: AppointmentReportRow[];
  chart: ReportChartData;
  export: { columns: string[]; rows: AppointmentReportRow[] };
  byType: Array<{ appointmentType: string; count: number }>;
};

export type RevenueReportResponse = {
  dateRange: { start: string; end: string };
  groupBy: ReportGroupBy;
  rows: RevenueReportRow[];
  chart: ReportChartData;
  export: { columns: string[]; rows: RevenueReportRow[] };
};

export type PatientReportResponse = {
  dateRange: { start: string; end: string };
  groupBy: ReportGroupBy;
  rows: PatientReportRow[];
  chart: ReportChartData;
  export: { columns: string[]; rows: PatientReportRow[] };
};

export type SavedReportType = "APPOINTMENT" | "REVENUE" | "PATIENT";

export type ScheduledReportFrequency = "DAILY" | "WEEKLY" | "MONTHLY";

export type ScheduledReportStatus = "ACTIVE" | "PAUSED";

export type SavedReportConfig = Record<string, unknown>;

export type SavedReport = {
  id: string;
  tenantId: string;
  name: string;
  type: SavedReportType;
  config: SavedReportConfig;
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type SavedReportListResponse = {
  items: SavedReport[];
  total: number;
  page: number;
  limit: number;
};

export type ScheduledReport = {
  id: string;
  tenantId: string;
  savedReportId: string;
  savedReportName?: string;
  savedReportType?: SavedReportType;
  frequency: ScheduledReportFrequency;
  timeOfDay: string;
  dayOfWeek: number | null;
  dayOfMonth: number | null;
  recipients: string[];
  lastRunAt: string | null;
  nextRunAt: string | null;
  status: ScheduledReportStatus;
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type ScheduledReportListResponse = {
  items: ScheduledReport[];
};

export type ReportExportColumn = {
  key: string;
  label: string;
};

export type ReportExportResponse = {
  columns: ReportExportColumn[];
  rows: Array<Record<string, string | number>>;
  dateRange?: { start: string; end: string };
  groupBy?: ReportGroupBy;
};

export type CreateSavedReportInput = {
  name: string;
  type: SavedReportType;
  config: SavedReportConfig;
};

export type UpdateSavedReportInput = {
  name?: string;
  config?: SavedReportConfig;
};

export type CreateScheduledReportInput = {
  savedReportId: string;
  frequency: ScheduledReportFrequency;
  timeOfDay: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  recipients: string[];
  status?: ScheduledReportStatus;
};

export type AdvancedSavedReportType = "appointment" | "revenue" | "patient";
