import { ForbiddenException } from "@nestjs/common";
import { PERMISSIONS, rbacService, type SecurityRole, type SecurityUser } from "@ordella/security";
import type { ReportType } from "@ordella/validation";

const CLINIC_REPORT_TYPES: ReportType[] = [
  "appointments_summary",
  "appointments_detailed",
  "billing_summary",
  "billing_detailed",
  "notes_summary",
  "therapist_activity",
  "patient_activity",
  "clinic_overview",
];

const THERAPIST_REPORT_TYPES: ReportType[] = [
  "appointments_summary",
  "appointments_detailed",
  "notes_summary",
  "therapist_activity",
  "patient_activity",
];

const STAFF_PHARMACY_REPORT_TYPES: ReportType[] = ["billing_summary", "patient_activity"];

const STAFF_READ_REPORT_TYPES: ReportType[] = ["appointments_summary", "clinic_overview"];

export function getAllowedReportTypes(user: SecurityUser): ReportType[] {
  if (user.role === "SYSTEM") {
    return [...CLINIC_REPORT_TYPES, "tenant_usage"];
  }

  if (user.role === "OWNER" || user.role === "ADMIN") {
    return CLINIC_REPORT_TYPES;
  }

  if (user.role === "THERAPIST") {
    return THERAPIST_REPORT_TYPES;
  }

  if (user.role === "STAFF") {
    if (rbacService.hasPermission(user, PERMISSIONS.BILLING_READ)) {
      return STAFF_PHARMACY_REPORT_TYPES;
    }
    return STAFF_READ_REPORT_TYPES;
  }

  return [];
}

export function canGenerateReportType(user: SecurityUser, type: ReportType): boolean {
  if (type === "tenant_usage") {
    return user.role === "SYSTEM";
  }

  const allowed = getAllowedReportTypes(user);
  if (!allowed.includes(type)) {
    return false;
  }

  if (user.role === "STAFF") {
    if (STAFF_READ_REPORT_TYPES.includes(type)) {
      return false;
    }
    return rbacService.hasPermission(user, PERMISSIONS.BILLING_READ);
  }

  return rbacService.hasPermission(user, PERMISSIONS.REPORTING_WRITE);
}

export function assertCanGenerateReport(user: SecurityUser, type: ReportType): void {
  if (!canGenerateReportType(user, type)) {
    throw new ForbiddenException(`Role ${user.role} cannot generate report type: ${type}`);
  }
}

export function assertCanViewReport(user: SecurityUser, type: ReportType): void {
  if (type === "tenant_usage" && user.role !== "SYSTEM") {
    throw new ForbiddenException("Tenant usage reports are restricted to system administrators");
  }

  const allowed = getAllowedReportTypes(user);
  const staffReadable = user.role === "STAFF" && STAFF_READ_REPORT_TYPES.includes(type);

  if (!allowed.includes(type) && !staffReadable) {
    throw new ForbiddenException(`Role ${user.role} cannot access report type: ${type}`);
  }
}

export function applyRoleFilters(
  user: SecurityUser,
  type: ReportType,
  filters: Record<string, unknown>,
): Record<string, unknown> {
  const next = { ...filters };

  if (user.role === "THERAPIST" && ["therapist_activity", "appointments_detailed", "appointments_summary"].includes(type)) {
    next.therapistId = user.userId;
  }

  return next;
}

export function isGlobalReport(type: ReportType, role: SecurityRole): boolean {
  return type === "tenant_usage" && role === "SYSTEM";
}
