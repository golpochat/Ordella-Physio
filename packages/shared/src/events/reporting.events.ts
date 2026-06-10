import type { DomainEvent } from "./base.event";

export interface MetricsDailyUpdatedPayload {
  tenantId: string;
  date: string;
  newPatients: number;
  appointmentsCompleted: number;
  revenue: number;
}

export interface MetricsMonthlyUpdatedPayload {
  tenantId: string;
  year: number;
  month: number;
  revenue: number;
  newPatients: number;
}

export interface AuditLoggedPayload {
  tenantId: string;
  auditId: string;
  userId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
}

export type MetricsDailyUpdatedEvent = DomainEvent<MetricsDailyUpdatedPayload>;
export type MetricsMonthlyUpdatedEvent = DomainEvent<MetricsMonthlyUpdatedPayload>;
export type AuditLoggedEvent = DomainEvent<AuditLoggedPayload>;
