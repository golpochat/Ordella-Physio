export type InvoiceItemUpdatedEvent = {
  tenantId: string;
  invoiceId: string;
  itemId: string;
  changes: Record<string, unknown>;
  updatedAt: string;
};
