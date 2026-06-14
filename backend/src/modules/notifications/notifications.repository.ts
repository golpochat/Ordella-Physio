import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../utils/api-error";
import { getPaidTotalForInvoice } from "../billing/billing.repository";
import { fetchServiceStatementData } from "../statements/statements.repository";

function fullName(first?: string | null, last?: string | null): string {
  return `${first ?? ""} ${last ?? ""}`.trim() || "Patient";
}

export async function loadTenant(tenantId: string) {
  return prisma.tenant.findFirstOrThrow({ where: { id: tenantId } });
}

export async function loadAppointmentNotificationContext(tenantId: string, appointmentId: string) {
  const appointment = await prisma.appointment.findFirst({
    where: { id: appointmentId, tenantId },
    include: {
      patient: true,
      therapist: {
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
      },
    },
  });

  if (!appointment) {
    throw new NotFoundError("Appointment not found");
  }

  const tenant = await loadTenant(tenantId);

  return {
    tenant,
    appointment,
    patient: appointment.patient,
    recipientEmail: appointment.patient.email,
    patientName: fullName(appointment.patient.firstName, appointment.patient.lastName),
    clinicianName: appointment.therapist?.user
      ? fullName(appointment.therapist.user.firstName, appointment.therapist.user.lastName)
      : "Your clinician",
  };
}

export async function loadInvoiceNotificationContext(tenantId: string, invoiceId: string) {
  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId, tenantId },
    include: { patient: true },
  });

  if (!invoice) {
    throw new NotFoundError("Invoice not found");
  }

  const tenant = await loadTenant(tenantId);
  const paid = await getPaidTotalForInvoice(invoiceId);

  return {
    tenant,
    invoice,
    patient: invoice.patient,
    recipientEmail: invoice.patient.email,
    patientName: fullName(invoice.patient.firstName, invoice.patient.lastName),
    paidTotal: paid,
    outstanding: Math.max(0, Number(invoice.total) - paid),
  };
}

export async function loadStatementNotificationContext(
  tenantId: string,
  patientId: string,
  options: { includeClinicalSummary?: boolean; from?: Date; to?: Date } = {},
) {
  const data = await fetchServiceStatementData(tenantId, patientId, options);

  return {
    ...data,
    recipientEmail: data.patient.email,
    patientName: fullName(data.patient.firstName, data.patient.lastName),
  };
}

export async function persistEmailNotification(input: {
  tenantId: string;
  userId: string;
  template: string;
  recipientEmail: string;
  subject: string;
  body: string;
  entityType?: string;
  entityId?: string;
  messageId?: string;
  metadata?: Record<string, unknown>;
}) {
  return prisma.notification.create({
    data: {
      tenantId: input.tenantId,
      userId: input.userId,
      channel: "EMAIL",
      status: "SENT",
      title: input.subject,
      body: input.body,
    },
  });
}
