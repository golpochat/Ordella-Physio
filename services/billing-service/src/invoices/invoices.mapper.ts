import type { Invoice, InvoiceItem } from "@/generated/prisma";

export type InvoiceItemResponse = {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountAmount: number;
  lineTotal: number;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceResponse = {
  id: string;
  tenantId: string;
  patientId: string;
  staffId: string | null;
  appointmentId: string | null;
  invoiceNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  discount: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
  currency: string;
  dueDate: string | null;
  notes: string | null;
  issuedAt: string | null;
  paidAt: string | null;
  paymentReference: string | null;
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
    taxRate: toNumber(item.taxRate),
    discountAmount: toNumber(item.discountAmount),
    lineTotal: toNumber(item.total),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export function toInvoiceResponse(invoice: Invoice & { items?: InvoiceItem[] }): InvoiceResponse {
  return {
    id: invoice.id,
    tenantId: invoice.tenantId,
    patientId: invoice.patientId,
    staffId: invoice.staffId,
    appointmentId: invoice.appointmentId,
    invoiceNumber: invoice.invoiceNumber,
    status: invoice.status,
    subtotal: toNumber(invoice.subtotal),
    tax: toNumber(invoice.tax),
    discount: toNumber(invoice.discount),
    taxTotal: toNumber(invoice.tax),
    discountTotal: toNumber(invoice.discount),
    total: toNumber(invoice.total),
    currency: invoice.currency,
    dueDate: invoice.dueDate?.toISOString() ?? null,
    notes: invoice.notes,
    issuedAt: invoice.issuedAt?.toISOString() ?? null,
    paidAt: invoice.paidAt?.toISOString() ?? null,
    paymentReference: invoice.paymentReference,
    taxRateId: invoice.taxRateId,
    discountId: invoice.discountId,
    items: invoice.items?.map(toInvoiceItemResponse),
    createdAt: invoice.createdAt.toISOString(),
    updatedAt: invoice.updatedAt.toISOString(),
  };
}

export type InvoiceListItemResponse = InvoiceResponse & {
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  staff: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
};

export function toInvoiceListItemResponse(
  invoice: Invoice,
  patient: InvoiceListItemResponse["patient"],
  staff: InvoiceListItemResponse["staff"],
): InvoiceListItemResponse {
  return {
    ...toInvoiceResponse(invoice),
    patient,
    staff,
  };
}

export function toInvoiceListResponse(invoices: Invoice[]) {
  return invoices.map((invoice) => toInvoiceResponse(invoice));
}
