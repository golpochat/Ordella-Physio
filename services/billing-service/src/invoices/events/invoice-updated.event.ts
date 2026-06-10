export type InvoiceUpdatedEvent = {
  tenantId: string;
  invoiceId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
