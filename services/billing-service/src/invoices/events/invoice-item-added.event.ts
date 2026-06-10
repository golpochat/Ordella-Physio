export type InvoiceItemAddedEvent = {
  tenantId: string;
  invoiceId: string;
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  createdAt: string;
};
