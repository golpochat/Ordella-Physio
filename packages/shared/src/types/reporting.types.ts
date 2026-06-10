export interface DailyMetrics {
  tenantId: string;
  date: string;
  newPatients: number;
  appointmentsScheduled: number;
  appointmentsCompleted: number;
  appointmentsCancelled: number;
  appointmentsNoShow: number;
  revenue: number;
  paymentsReceived: number;
}

export interface MonthlyMetrics {
  tenantId: string;
  year: number;
  month: number;
  newPatients: number;
  appointmentsCompleted: number;
  revenue: number;
  averageRevenuePerPatient: number;
  noShowRate: number;
}

export interface AuditEvent {
  id: string;
  tenantId: string;
  userId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  occurredAt: string;
}
