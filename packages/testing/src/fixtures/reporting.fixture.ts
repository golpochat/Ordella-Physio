import { mockMetrics, type MockMetrics } from "../mocks/reporting.mock";
import type { TenantScopedFixtureOptions } from "./types";

export async function createTestMetrics(
  options: TenantScopedFixtureOptions & { overrides?: Partial<MockMetrics> },
): Promise<MockMetrics> {
  const entity = mockMetrics({
    tenantId: options.tenantId,
    ...options.overrides,
  });

  return options.db.insert<MockMetrics>("metrics", entity as unknown as Record<string, unknown>);
}
