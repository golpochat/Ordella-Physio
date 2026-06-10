import { nextSequence } from "./random";

export type MockMetrics = {
  tenantId: string;
  periodStart: Date;
  periodEnd: Date;
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  noShowAppointments: number;
  totalRevenue: number;
  totalPatients: number;
  activeTherapists: number;
};

export function mockMetrics(overrides: Partial<MockMetrics> = {}): MockMetrics {
  const index = nextSequence();

  return {
    tenantId: overrides.tenantId ?? `tenant-${index}`,
    periodStart: overrides.periodStart ?? new Date("2024-01-01T00:00:00.000Z"),
    periodEnd: overrides.periodEnd ?? new Date("2024-01-31T23:59:59.999Z"),
    totalAppointments: overrides.totalAppointments ?? 120,
    completedAppointments: overrides.completedAppointments ?? 95,
    cancelledAppointments: overrides.cancelledAppointments ?? 15,
    noShowAppointments: overrides.noShowAppointments ?? 10,
    totalRevenue: overrides.totalRevenue ?? 7500,
    totalPatients: overrides.totalPatients ?? 80,
    activeTherapists: overrides.activeTherapists ?? 6,
    ...overrides,
  };
}
