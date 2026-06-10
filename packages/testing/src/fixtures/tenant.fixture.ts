import { mockTenant, type MockTenant } from "../mocks/tenant.mock";
import type { TestDbAdapter } from "./types";

export async function createTestTenant(
  options: { db: TestDbAdapter; overrides?: Partial<MockTenant> },
): Promise<MockTenant> {
  const entity = mockTenant(options.overrides);
  return options.db.insert<MockTenant>("tenants", entity as unknown as Record<string, unknown>);
}
