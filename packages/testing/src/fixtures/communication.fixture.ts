import { mockNotification, type MockNotification } from "../mocks/communication.mock";
import type { TenantScopedFixtureOptions } from "./types";

export async function createTestNotification(
  options: TenantScopedFixtureOptions & { overrides?: Partial<MockNotification> },
): Promise<MockNotification> {
  const entity = mockNotification({
    tenantId: options.tenantId,
    ...options.overrides,
  });

  return options.db.insert<MockNotification>(
    "notifications",
    entity as unknown as Record<string, unknown>,
  );
}
