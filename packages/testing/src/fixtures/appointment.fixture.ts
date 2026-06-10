import { mockAppointment, type MockAppointment } from "../mocks/appointment.mock";
import type { TenantScopedFixtureOptions } from "./types";

export async function createTestAppointment(
  options: TenantScopedFixtureOptions & { overrides?: Partial<MockAppointment> },
): Promise<MockAppointment> {
  const entity = mockAppointment({
    tenantId: options.tenantId,
    ...options.overrides,
  });

  return options.db.insert<MockAppointment>(
    "appointments",
    entity as unknown as Record<string, unknown>,
  );
}
