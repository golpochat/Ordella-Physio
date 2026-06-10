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
