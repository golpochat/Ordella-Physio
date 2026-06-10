import { mockNote, type MockNote } from "../mocks/notes.mock";
import type { TenantScopedFixtureOptions } from "./types";

export async function createTestNote(
  options: TenantScopedFixtureOptions & { overrides?: Partial<MockNote> },
): Promise<MockNote> {
  const entity = mockNote({
    tenantId: options.tenantId,
    ...options.overrides,
  });

  return options.db.insert<MockNote>("notes", entity as unknown as Record<string, unknown>);
}
