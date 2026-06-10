export type LedgerEntryCreatedEvent = {
  tenantId: string;
  ledgerEntryId: string;
  type: string;
  referenceId: string;
  amount: number;
  currency: string;
  description?: string;
  createdAt: string;
};
