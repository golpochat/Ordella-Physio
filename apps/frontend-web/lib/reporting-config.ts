import type { PortalRole } from "@/lib/rbac";
import type { PortalReportingMode, ReportType } from "@/lib/reporting-types";

export type ReportTypeOption = {
  value: ReportType;
  label: string;
  description: string;
};

const ALL_CLINIC_REPORTS: ReportTypeOption[] = [
  { value: "appointments_summary", label: "Appointments summary", description: "Operational appointment trends." },
  { value: "appointments_detailed", label: "Appointments detailed", description: "Session-level appointment export." },
  { value: "billing_summary", label: "Billing summary", description: "Revenue and invoice totals." },
  { value: "billing_detailed", label: "Billing detailed", description: "Invoice event breakdown." },
  { value: "notes_summary", label: "Notes summary", description: "Clinical documentation volume." },
  { value: "therapist_activity", label: "Therapist activity", description: "Therapist workload and sessions." },
  { value: "patient_activity", label: "Patient activity", description: "Patient visit and engagement trends." },
  { value: "clinic_overview", label: "Clinic overview", description: "Cross-functional clinic KPIs." },
];

const THERAPIST_REPORTS: ReportTypeOption[] = [
  { value: "appointments_summary", label: "Appointments summary", description: "Your appointment trends." },
  { value: "appointments_detailed", label: "Appointments detailed", description: "Your session-level appointments." },
  { value: "notes_summary", label: "Notes summary", description: "Your clinical notes activity." },
  { value: "therapist_activity", label: "Therapist activity", description: "Your workload summary." },
  { value: "patient_activity", label: "Patient activity", description: "Patients you have seen." },
];

const PHARMACY_REPORTS: ReportTypeOption[] = [
  { value: "billing_summary", label: "Billing summary", description: "Pharmacy billing totals." },
  { value: "patient_activity", label: "Patient activity", description: "Patient fulfillment activity." },
];

const STAFF_READONLY_REPORTS: ReportTypeOption[] = [
  { value: "appointments_summary", label: "Appointments summary", description: "Clinic appointment trends." },
  { value: "clinic_overview", label: "Clinic overview", description: "Read-only clinic KPIs." },
];

const SUPER_ADMIN_REPORTS: ReportTypeOption[] = [
  ...ALL_CLINIC_REPORTS,
  { value: "tenant_usage", label: "Tenant usage", description: "Global tenant utilization (super admin only)." },
];

export function getReportingMode(roles: PortalRole[]): PortalReportingMode {
  if (roles.includes("SYSTEM")) {
    return "full";
  }
  if (roles.includes("ADMIN") || roles.includes("OWNER") || roles.includes("CLINIC_ADMIN")) {
    return "full";
  }
  if (roles.includes("THERAPIST")) {
    return "limited";
  }
  if (roles.includes("PHARMACY")) {
    return "limited";
  }
  if (roles.includes("STAFF")) {
    return "readonly";
  }
  return "readonly";
}

export function getReportTypeOptions(roles: PortalRole[]): ReportTypeOption[] {
  if (roles.includes("SYSTEM")) {
    return SUPER_ADMIN_REPORTS;
  }
  if (roles.includes("ADMIN") || roles.includes("OWNER") || roles.includes("CLINIC_ADMIN")) {
    return ALL_CLINIC_REPORTS;
  }
  if (roles.includes("THERAPIST")) {
    return THERAPIST_REPORTS;
  }
  if (roles.includes("PHARMACY")) {
    return PHARMACY_REPORTS;
  }
  if (roles.includes("STAFF")) {
    return STAFF_READONLY_REPORTS;
  }
  return STAFF_READONLY_REPORTS;
}

export function canGenerateReports(mode: PortalReportingMode): boolean {
  return mode === "full" || mode === "limited";
}

export const REPORT_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};
