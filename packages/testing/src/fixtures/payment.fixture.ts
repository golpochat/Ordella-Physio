import { mockPayment, type MockPayment } from "../mocks/payment.mock";
import type { TenantScopedFixtureOptions } from "./types";

export async function createTestPayment(
  options: TenantScopedFixtureOptions & { overrides?: Partial<MockPayment> },
): Promise<MockPayment> {
  const entity = mockPayment({
    tenantId: options.tenantId,
    ...options.overrides,
  });

  return options.db.insert<MockPayment>("payments", entity as unknown as Record<string, unknown>);
}
