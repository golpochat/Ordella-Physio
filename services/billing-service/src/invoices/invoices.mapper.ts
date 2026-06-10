import type { Invoice, InvoiceItem } from "@/generated/prisma";

export type InvoiceItemResponse = {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceResponse = {
  id: string;
  tenantId: string;
  patientId: string;
  appointmentId: string | null;
  invoiceNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  dueDate: string | null;
  notes: string | null;
  taxRateId: string | null;
  discountId: string | null;
  items?: InvoiceItemResponse[];
  createdAt: string;
  updatedAt: string;
};

function toNumber(value: { toNumber(): number } | number): number {
  return typeof value === "number" ? value : value.toNumber();
}

export function toInvoiceItemResponse(item: InvoiceItem): InvoiceItemResponse {
  return {
    id: item.id,
    invoiceId: item.invoiceId,
    description: item.description,
    quantity: item.quantity,
    unitPrice: toNumber(item.unitPrice),
    total: toNumber(item.total),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export function toInvoiceResponse(invoice: Invoice & { items?: InvoiceItem[] }): InvoiceResponse {
  return {
    id: invoice.id,
    tenantId: invoice.tenantId,
    patientId: invoice.patientId,
    appointmentId: invoice.appointmentId,
    invoiceNumber: invoice.invoiceNumber,
    status: invoice.status,
    subtotal: toNumber(invoice.subtotal),
    tax: toNumber(invoice.tax),
    discount: toNumber(invoice.discount),
    total: toNumber(invoice.total),
    currency: invoice.currency,
    dueDate: invoice.dueDate?.toISOString() ?? null,
    notes: invoice.notes,
    taxRateId: invoice.taxRateId,
    discountId: invoice.discountId,
    items: invoice.items?.map(toInvoiceItemResponse),
    createdAt: invoice.createdAt.toISOString(),
    updatedAt: invoice.updatedAt.toISOString(),
  };
}

export function toInvoiceListResponse(invoices: Invoice[]) {
  return invoices.map((invoice) => toInvoiceResponse(invoice));
}
