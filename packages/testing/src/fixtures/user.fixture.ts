import { mockUser, type MockUser } from "../mocks/user.mock";
import type { TenantScopedFixtureOptions } from "./types";

export async function createTestUser(
  options: TenantScopedFixtureOptions & { overrides?: Partial<MockUser> },
): Promise<MockUser> {
  const entity = mockUser({
    tenantId: options.tenantId,
    ...options.overrides,
  });

  return options.db.insert<MockUser>("users", entity as unknown as Record<string, unknown>);
}
