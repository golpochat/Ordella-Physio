export type TaxRateUpdatedEvent = {
  tenantId: string;
  taxRateId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
