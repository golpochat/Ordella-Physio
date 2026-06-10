import { mockPatient, type MockPatient } from "../mocks/patient.mock";
import type { TenantScopedFixtureOptions } from "./types";

export async function createTestPatient(
  options: TenantScopedFixtureOptions & { overrides?: Partial<MockPatient> },
): Promise<MockPatient> {
  const entity = mockPatient({
    tenantId: options.tenantId,
    ...options.overrides,
  });

  return options.db.insert<MockPatient>("patients", entity as unknown as Record<string, unknown>);
}
