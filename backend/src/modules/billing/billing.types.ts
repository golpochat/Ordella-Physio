import type { InvoiceSource, InvoiceStatus, Prisma } from "@prisma/client";
import type { PaginationInput } from "../../utils/pagination";

export type ListInvoicesFilters = PaginationInput & {
  patientId?: string;
  status?: InvoiceStatus;
  source?: InvoiceSource;
  outstandingOnly?: boolean;
};

export type CreateInvoiceInput = {
  patientId: string;
  appointmentId?: string;
  description?: string;
  subtotal: number;
  tax?: number;
  currency?: string;
  dueDate?: Date;
  issueImmediately?: boolean;
};

export type UpdateInvoiceInput = {
  description?: string | null;
  subtotal?: number;
  tax?: number;
  dueDate?: Date | null;
  status?: InvoiceStatus;
};

export type RecordPaymentInput = {
  amount: number;
  method?: "CASH" | "CARD" | "BANK_TRANSFER" | "STRIPE" | "OTHER";
  reference?: string;
};

export type InvoiceWithRelations = Prisma.InvoiceGetPayload<{
  include: {
    patient: true;
    appointment: true;
    payments: true;
    tenant: { select: { name: true; currency: true } };
  };
}>;

export type OutstandingBalance = {
  patientId?: string;
  currency: string;
  totalInvoiced: number;
  totalPaid: number;
  outstanding: number;
  invoiceCount: number;
};

export const DEFAULT_AUTO_INVOICE_FEE = 80;
export const DEFAULT_TAX_RATE = 0;
