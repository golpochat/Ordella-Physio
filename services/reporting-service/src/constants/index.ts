import { TENANT_HEADER, CORRELATION_ID_HEADER } from "@ordella/middleware";
import { EVENT_TYPES } from "@ordella/shared";

export { TENANT_HEADER, CORRELATION_ID_HEADER };

export const REPORTING_SERVICE_NAME = "reporting-service";

export const REPORTING_EVENTS = {
  METRICS_GENERATED: EVENT_TYPES.METRICS_GENERATED,
  DATA_INGESTED: EVENT_TYPES.DATA_INGESTED,
  METRICS_DAILY_UPDATED: EVENT_TYPES.METRICS_DAILY_UPDATED,
  METRICS_MONTHLY_UPDATED: EVENT_TYPES.METRICS_MONTHLY_UPDATED,
  REQUEST_CREATED: EVENT_TYPES.REPORTING_REQUEST_CREATED,
  REQUEST_COMPLETED: EVENT_TYPES.REPORTING_REQUEST_COMPLETED,
  REQUEST_FAILED: EVENT_TYPES.REPORTING_REQUEST_FAILED,
} as const;

export const REPORT_STATUSES = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

export const REPORT_TYPES = {
  APPOINTMENTS_SUMMARY: "appointments_summary",
  APPOINTMENTS_DETAILED: "appointments_detailed",
  BILLING_SUMMARY: "billing_summary",
  BILLING_DETAILED: "billing_detailed",
  NOTES_SUMMARY: "notes_summary",
  THERAPIST_ACTIVITY: "therapist_activity",
  PATIENT_ACTIVITY: "patient_activity",
  CLINIC_OVERVIEW: "clinic_overview",
  TENANT_USAGE: "tenant_usage",
} as const;

export const INGESTION_SOURCES = {
  APPOINTMENT: "appointment-service",
  BILLING: "billing-service",
  PAYMENT: "payment-service",
  NOTES: "notes-service",
  PATIENT: "patient-service",
} as const;

export const CACHE_KEYS = {
  METRICS_PREFIX: "reporting:metrics:",
  DASHBOARD_PREFIX: "reporting:dashboard:",
  QUERY_PREFIX: "reporting:query:",
} as const;

export const CACHE_TTL_SECONDS = {
  METRICS: 300,
  DASHBOARD: 120,
  HEAVY_QUERY: 600,
} as const;
