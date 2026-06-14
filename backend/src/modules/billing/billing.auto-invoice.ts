import { NotFoundError } from "../../utils/api-error";
import { auditCreate, type AuditContext } from "../utilities/audit.service";
import { notifyInvoiceIssued } from "../notifications/notifications.dispatch";
import {
  createInvoiceRecord,
  findAppointmentForAutoInvoice,
  findInvoiceByAppointmentId,
  generateInvoiceNumber,
} from "./billing.repository";
import { DEFAULT_AUTO_INVOICE_FEE, DEFAULT_TAX_RATE } from "./billing.types";

function resolveAppointmentFee(
  appointmentType: string,
  serviceTypes: { name: string; durationMinutes: number }[],
): number {
  const match = serviceTypes.find(
    (type) => type.name.toLowerCase() === appointmentType.toLowerCase(),
  );
  if (match) {
    return Math.max(20, match.durationMinutes * 2);
  }
  return DEFAULT_AUTO_INVOICE_FEE;
}

export async function createAutoInvoiceFromAppointment(
  tenantId: string,
  appointmentId: string,
  audit?: AuditContext,
) {
  const existing = await findInvoiceByAppointmentId(tenantId, appointmentId);
  if (existing) {
    return existing;
  }

  const appointment = await findAppointmentForAutoInvoice(tenantId, appointmentId);
  if (!appointment) {
    throw new NotFoundError("Appointment not found");
  }

  const subtotal = resolveAppointmentFee(
    appointment.type,
    appointment.therapist.serviceTypes,
  );
  const tax = DEFAULT_TAX_RATE;
  const total = subtotal + tax;
  const invoiceNumber = await generateInvoiceNumber(tenantId);
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  const invoice = await createInvoiceRecord(tenantId, {
    patientId: appointment.patientId,
    appointmentId: appointment.id,
    invoiceNumber,
    description: `${appointment.type} — completed appointment`,
    subtotal,
    tax,
    total,
    currency: "GBP",
    dueDate,
    source: "APPOINTMENT_AUTO",
    status: "ISSUED",
    issuedAt: new Date(),
    issueImmediately: true,
  });

  if (audit) {
    await auditCreate(audit, "Invoice", invoice.id, {
      source: "APPOINTMENT_AUTO",
      appointmentId,
      invoiceNumber,
      total,
    });
  }

  notifyInvoiceIssued(tenantId, invoice.id, audit?.userId);

  return invoice;
}

export async function ensureAutoInvoiceOnCompletion(
  tenantId: string,
  appointmentId: string,
  userId?: string,
) {
  const audit = userId ? { tenantId, userId } : undefined;
  return createAutoInvoiceFromAppointment(tenantId, appointmentId, audit);
}
