import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { findPatientByIdOrThrow } from "../patients/patients.repository";
import { aggregateOutstanding } from "../billing/billing.repository";
import type { ServiceStatementOptions } from "./statements.types";

function buildDateRange(options: ServiceStatementOptions): Prisma.DateTimeFilter | undefined {
  if (!options.from && !options.to) {
    return undefined;
  }

  return {
    ...(options.from ? { gte: options.from } : {}),
    ...(options.to ? { lte: options.to } : {}),
  };
}

export async function fetchServiceStatementData(
  tenantId: string,
  patientId: string,
  options: ServiceStatementOptions = {},
) {
  const includeClinicalSummary = options.includeClinicalSummary ?? false;
  const appointmentDateFilter = buildDateRange(options);

  const [tenant, patient, appointments, invoices, payments, notes, outstanding, paymentAggregate, invoiceAggregate] =
    await Promise.all([
      prisma.tenant.findFirstOrThrow({ where: { id: tenantId } }),
      findPatientByIdOrThrow(tenantId, patientId),
      prisma.appointment.findMany({
        where: {
          tenantId,
          patientId,
          ...(appointmentDateFilter ? { startTime: appointmentDateFilter } : {}),
        },
        orderBy: { startTime: "desc" },
        include: {
          therapist: {
            include: {
              user: { select: { firstName: true, lastName: true } },
            },
          },
        },
      }),
      prisma.invoice.findMany({
        where: {
          tenantId,
          patientId,
          status: { not: "VOIDED" },
          ...(appointmentDateFilter ? { createdAt: appointmentDateFilter } : {}),
        },
        orderBy: { createdAt: "desc" },
        include: {
          payments: {
            where: { status: "COMPLETED" },
            orderBy: { paidAt: "desc" },
          },
        },
      }),
      prisma.payment.findMany({
        where: {
          tenantId,
          status: "COMPLETED",
          invoice: { patientId },
          ...(appointmentDateFilter ? { paidAt: appointmentDateFilter } : {}),
        },
        orderBy: { paidAt: "desc" },
        include: {
          invoice: { select: { invoiceNumber: true, status: true } },
        },
      }),
      includeClinicalSummary
        ? prisma.note.findMany({
            where: {
              tenantId,
              patientId,
              type: { in: ["CLINICAL", "SOAP"] },
              ...(appointmentDateFilter ? { createdAt: appointmentDateFilter } : {}),
            },
            orderBy: { createdAt: "desc" },
            include: {
              author: { select: { firstName: true, lastName: true } },
            },
          })
        : Promise.resolve([]),
      aggregateOutstanding(tenantId, patientId),
      prisma.payment.aggregate({
        where: {
          tenantId,
          status: "COMPLETED",
          invoice: { patientId, status: { not: "VOIDED" } },
        },
        _sum: { amount: true },
      }),
      prisma.invoice.aggregate({
        where: { tenantId, patientId, status: { not: "VOIDED" } },
        _sum: { total: true },
      }),
    ]);

  const currency = invoices[0]?.currency ?? tenant.currency ?? "GBP";
  const totalInvoiced = Number(invoiceAggregate._sum.total ?? 0);
  const totalPaid = Number(paymentAggregate._sum.amount ?? 0);

  return {
    tenant,
    patient,
    appointments,
    invoices,
    payments,
    clinicalNotes: notes,
    billingSummary: {
      currency,
      totalInvoiced,
      totalPaid,
      outstanding: outstanding.outstanding,
      invoiceCount: invoices.length,
      paymentCount: payments.length,
    },
    generatedAt: new Date(),
    statementReference: `PSS-${patientId.slice(-8).toUpperCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
    includeClinicalSummary,
  };
}
