import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../utils/api-error";
import { buildPaginatedResponse } from "../../utils/pagination";
import { auditCreate, auditUpdate, type AuditContext } from "../utilities/audit.service";
import { notifyInvoiceIssued } from "../notifications/notifications.dispatch";
import { ensureAutoInvoiceOnCompletion } from "./billing.auto-invoice";
import { InvoiceStateError } from "./billing.errors";
import { enrichInvoiceWithBalance } from "./billing.mapper";
import { generateInvoicePdf } from "./billing.pdf";
import {
  aggregateOutstanding,
  createInvoiceRecord,
  createPaymentRecord,
  findInvoiceByAppointmentId,
  findInvoiceByIdOrThrow,
  findInvoices,
  generateInvoiceNumber,
  getPaidTotalForInvoice,
  markInvoicePaid,
  updateInvoiceRecord,
} from "./billing.repository";
import type { CreateInvoiceInput, ListInvoicesFilters, RecordPaymentInput, UpdateInvoiceInput } from "./billing.types";

export { ensureAutoInvoiceOnCompletion };

async function enrichMany(invoices: Awaited<ReturnType<typeof findInvoices>>["items"]) {
  return Promise.all(
    invoices.map(async (invoice) => {
      const paid = await getPaidTotalForInvoice(invoice.id);
      return enrichInvoiceWithBalance(invoice, paid);
    }),
  );
}

export async function listInvoices(tenantId: string, filters: ListInvoicesFilters) {
  const { items, total } = await findInvoices(tenantId, filters);
  let enriched = await enrichMany(items);

  if (filters.outstandingOnly) {
    enriched = enriched.filter((invoice) => invoice.balance.outstanding > 0);
  }

  return buildPaginatedResponse(enriched, filters.outstandingOnly ? enriched.length : total, filters);
}

export async function getInvoice(tenantId: string, id: string) {
  const invoice = await findInvoiceByIdOrThrow(tenantId, id);
  const paid = await getPaidTotalForInvoice(id);
  return enrichInvoiceWithBalance(invoice, paid);
}

export async function createInvoice(
  tenantId: string,
  data: CreateInvoiceInput,
  audit?: AuditContext,
) {
  const patient = await prisma.patient.findFirst({ where: { id: data.patientId, tenantId } });
  if (!patient) throw new NotFoundError("Patient not found");

  if (data.appointmentId) {
    const existing = await findInvoiceByAppointmentId(tenantId, data.appointmentId);
    if (existing) {
      throw new InvoiceStateError("An invoice already exists for this appointment");
    }
  }

  const tax = data.tax ?? 0;
  const subtotal = data.subtotal;
  const total = subtotal + tax;
  const invoiceNumber = await generateInvoiceNumber(tenantId);
  const issueNow = data.issueImmediately ?? false;

  const invoice = await createInvoiceRecord(tenantId, {
    ...data,
    invoiceNumber,
    subtotal,
    tax,
    total,
    source: "MANUAL",
    status: issueNow ? "ISSUED" : "DRAFT",
    issuedAt: issueNow ? new Date() : undefined,
  });

  if (audit) {
    await auditCreate(audit, "Invoice", invoice.id, {
      invoiceNumber,
      patientId: data.patientId,
      total,
      source: "MANUAL",
    });
  }

  if (issueNow) {
    notifyInvoiceIssued(tenantId, invoice.id, audit?.userId);
  }

  const paid = await getPaidTotalForInvoice(invoice.id);
  return enrichInvoiceWithBalance(invoice, paid);
}

export async function updateInvoice(
  tenantId: string,
  id: string,
  data: UpdateInvoiceInput,
  audit?: AuditContext,
) {
  const current = await findInvoiceByIdOrThrow(tenantId, id);
  if (current.status === "PAID" || current.status === "VOIDED") {
    throw new InvoiceStateError(`Cannot update invoice in ${current.status} status`);
  }

  const invoice = await updateInvoiceRecord(tenantId, id, data);

  if (audit) {
    await auditUpdate(audit, "Invoice", id, { fields: Object.keys(data) });
  }

  const paid = await getPaidTotalForInvoice(id);
  return enrichInvoiceWithBalance(invoice, paid);
}

export async function issueInvoice(tenantId: string, id: string, audit?: AuditContext) {
  const current = await findInvoiceByIdOrThrow(tenantId, id);
  if (current.status !== "DRAFT") {
    throw new InvoiceStateError("Only draft invoices can be issued");
  }

  const invoice = await updateInvoiceRecord(tenantId, id, { status: "ISSUED" });

  if (audit) {
    await auditUpdate(audit, "Invoice", id, { status: "ISSUED" });
  }

  notifyInvoiceIssued(tenantId, id, audit?.userId);

  const paid = await getPaidTotalForInvoice(id);
  return enrichInvoiceWithBalance(invoice, paid);
}

export async function voidInvoice(tenantId: string, id: string, audit?: AuditContext) {
  const current = await findInvoiceByIdOrThrow(tenantId, id);
  if (current.status === "PAID") {
    throw new InvoiceStateError("Paid invoices cannot be voided");
  }

  const invoice = await updateInvoiceRecord(tenantId, id, { status: "VOIDED" });

  if (audit) {
    await auditUpdate(audit, "Invoice", id, { status: "VOIDED" });
  }

  const paid = await getPaidTotalForInvoice(id);
  return enrichInvoiceWithBalance(invoice, paid);
}

export async function recordPayment(
  tenantId: string,
  invoiceId: string,
  data: RecordPaymentInput,
  audit?: AuditContext,
) {
  const invoice = await findInvoiceByIdOrThrow(tenantId, invoiceId);
  if (invoice.status === "VOIDED") {
    throw new InvoiceStateError("Cannot record payment on voided invoice");
  }

  const paidBefore = await getPaidTotalForInvoice(invoiceId);
  const outstanding = Math.max(0, Number(invoice.total) - paidBefore);

  if (data.amount > outstanding + 0.01) {
    throw new InvoiceStateError(
      `Payment amount exceeds outstanding balance (${invoice.currency} ${outstanding.toFixed(2)})`,
    );
  }

  const payment = await createPaymentRecord(tenantId, invoiceId, {
    amount: data.amount,
    method: data.method ?? "CARD",
    reference: data.reference,
    currency: invoice.currency,
  });

  const paidAfter = paidBefore + data.amount;
  if (paidAfter >= Number(invoice.total)) {
    await markInvoicePaid(invoiceId);
  } else if (invoice.status === "DRAFT") {
    await updateInvoiceRecord(tenantId, invoiceId, { status: "ISSUED" });
  }

  if (audit) {
    await auditCreate(audit, "Payment", payment.id, {
      invoiceId,
      amount: data.amount,
      method: data.method ?? "CARD",
    });
    if (paidAfter >= Number(invoice.total)) {
      await auditUpdate(audit, "Invoice", invoiceId, { status: "PAID" });
    }
  }

  return payment;
}

export async function getInvoiceBalance(tenantId: string, id: string) {
  const invoice = await findInvoiceByIdOrThrow(tenantId, id);
  const paid = await getPaidTotalForInvoice(id);
  return enrichInvoiceWithBalance(invoice, paid).balance;
}

export async function getOutstandingBalance(tenantId: string, patientId?: string) {
  return aggregateOutstanding(tenantId, patientId);
}

export async function generateInvoicePdfBuffer(tenantId: string, id: string) {
  const invoice = await findInvoiceByIdOrThrow(tenantId, id);
  const paid = await getPaidTotalForInvoice(id);
  const outstanding = Math.max(0, Number(invoice.total) - paid);

  const buffer = await generateInvoicePdf({
    ...invoice,
    paidTotal: paid,
    outstanding,
  });

  return {
    buffer,
    filename: `${invoice.invoiceNumber}.pdf`,
  };
}
