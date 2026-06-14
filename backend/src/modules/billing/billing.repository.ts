import type { InvoiceStatus, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getPagination } from "../../utils/pagination";
import type { CreateInvoiceInput, ListInvoicesFilters, UpdateInvoiceInput } from "./billing.types";
import { InvoiceNotFoundError } from "./billing.errors";

const invoiceInclude = {
  patient: true,
  appointment: true,
  payments: { orderBy: { paidAt: "desc" as const } },
  tenant: { select: { name: true, currency: true } },
} satisfies Prisma.InvoiceInclude;

export async function generateInvoiceNumber(tenantId: string): Promise<string> {
  const count = await prisma.invoice.count({ where: { tenantId } });
  return `INV-${String(count + 1).padStart(6, "0")}`;
}

export async function findInvoices(tenantId: string, filters: ListInvoicesFilters) {
  const where: Prisma.InvoiceWhereInput = {
    tenantId,
    ...(filters.patientId ? { patientId: filters.patientId } : {}),
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.source ? { source: filters.source } : {}),
  };

  if (filters.outstandingOnly) {
    where.status = { in: ["ISSUED", "OVERDUE", "DRAFT"] };
  }

  const [items, total] = await Promise.all([
    prisma.invoice.findMany({
      where,
      include: invoiceInclude,
      ...getPagination(filters),
      orderBy: { createdAt: "desc" },
    }),
    prisma.invoice.count({ where }),
  ]);

  return { items, total };
}

export async function findInvoiceById(tenantId: string, id: string) {
  return prisma.invoice.findFirst({
    where: { id, tenantId },
    include: invoiceInclude,
  });
}

export async function findInvoiceByIdOrThrow(tenantId: string, id: string) {
  const invoice = await findInvoiceById(tenantId, id);
  if (!invoice) throw new InvoiceNotFoundError(id);
  return invoice;
}

export async function findInvoiceByAppointmentId(tenantId: string, appointmentId: string) {
  return prisma.invoice.findFirst({
    where: { tenantId, appointmentId },
    include: invoiceInclude,
  });
}

export async function createInvoiceRecord(
  tenantId: string,
  data: CreateInvoiceInput & {
    invoiceNumber: string;
    subtotal: number;
    tax: number;
    total: number;
    source?: "MANUAL" | "APPOINTMENT_AUTO";
    status?: InvoiceStatus;
    issuedAt?: Date;
  },
) {
  return prisma.invoice.create({
    data: {
      tenantId,
      patientId: data.patientId,
      appointmentId: data.appointmentId,
      invoiceNumber: data.invoiceNumber,
      description: data.description,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total,
      currency: data.currency ?? "GBP",
      dueDate: data.dueDate,
      source: data.source ?? "MANUAL",
      status: data.status ?? "DRAFT",
      issuedAt: data.issuedAt,
    },
    include: invoiceInclude,
  });
}

export async function updateInvoiceRecord(tenantId: string, id: string, data: UpdateInvoiceInput) {
  await findInvoiceByIdOrThrow(tenantId, id);

  let subtotal: number | undefined;
  let tax: number | undefined;
  let total: number | undefined;

  if (data.subtotal !== undefined || data.tax !== undefined) {
    const current = await prisma.invoice.findUniqueOrThrow({ where: { id } });
    subtotal = data.subtotal ?? Number(current.subtotal);
    tax = data.tax ?? Number(current.tax);
    total = subtotal + tax;
  }

  return prisma.invoice.update({
    where: { id },
    data: {
      description: data.description,
      dueDate: data.dueDate,
      status: data.status,
      ...(subtotal !== undefined ? { subtotal, tax, total } : {}),
      ...(data.status === "ISSUED" ? { issuedAt: new Date() } : {}),
    },
    include: invoiceInclude,
  });
}

export async function getPaidTotalForInvoice(invoiceId: string): Promise<number> {
  const result = await prisma.payment.aggregate({
    where: { invoiceId, status: "COMPLETED" },
    _sum: { amount: true },
  });
  return Number(result._sum.amount ?? 0);
}

export async function createPaymentRecord(
  tenantId: string,
  invoiceId: string,
  data: { amount: number; method: string; reference?: string; currency: string },
) {
  return prisma.payment.create({
    data: {
      tenantId,
      invoiceId,
      amount: data.amount,
      currency: data.currency,
      method: data.method as "CASH" | "CARD" | "BANK_TRANSFER" | "STRIPE" | "OTHER",
      status: "COMPLETED",
      reference: data.reference,
      paidAt: new Date(),
    },
  });
}

export async function markInvoicePaid(invoiceId: string) {
  return prisma.invoice.update({
    where: { id: invoiceId },
    data: { status: "PAID", paidAt: new Date() },
    include: invoiceInclude,
  });
}

export async function aggregateOutstanding(tenantId: string, patientId?: string) {
  const where: Prisma.InvoiceWhereInput = {
    tenantId,
    status: { in: ["DRAFT", "ISSUED", "OVERDUE"] },
    ...(patientId ? { patientId } : {}),
  };

  const invoices = await prisma.invoice.findMany({
    where,
    select: { id: true, total: true, currency: true },
  });

  let totalInvoiced = 0;
  let totalPaid = 0;

  for (const invoice of invoices) {
    totalInvoiced += Number(invoice.total);
    totalPaid += await getPaidTotalForInvoice(invoice.id);
  }

  const currency = invoices[0]?.currency ?? "GBP";

  return {
    patientId,
    currency,
    totalInvoiced,
    totalPaid,
    outstanding: Math.max(0, totalInvoiced - totalPaid),
    invoiceCount: invoices.length,
  };
}

export async function findAppointmentForAutoInvoice(tenantId: string, appointmentId: string) {
  return prisma.appointment.findFirst({
    where: { id: appointmentId, tenantId },
    include: {
      patient: true,
      therapist: {
        include: {
          serviceTypes: { where: { isActive: true } },
        },
      },
    },
  });
}
