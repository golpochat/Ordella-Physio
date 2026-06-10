import { mockInvoice, type MockInvoice } from "../mocks/billing.mock";
import type { TenantScopedFixtureOptions } from "./types";

export async function createTestInvoice(
  options: TenantScopedFixtureOptions & { overrides?: Partial<MockInvoice> },
): Promise<MockInvoice> {
  const entity = mockInvoice({
    tenantId: options.tenantId,
    ...options.overrides,
  });

  return options.db.insert<MockInvoice>("invoices", entity as unknown as Record<string, unknown>);
}
