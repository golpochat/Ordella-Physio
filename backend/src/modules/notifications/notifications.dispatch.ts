import { sendEmail } from "../utilities/email.service";
import { generateInvoicePdf } from "../billing/billing.pdf";
import { findInvoiceByIdOrThrow, getPaidTotalForInvoice } from "../billing/billing.repository";
import { generatePatientServiceStatementPdf } from "../statements/statements.pdf";
import { fetchServiceStatementData } from "../statements/statements.repository";
import { writeAuditLog } from "../utilities/audit.service";
import { NotificationContextError, NotificationRecipientRequiredError } from "./notifications.errors";
import {
  loadAppointmentNotificationContext,
  loadInvoiceNotificationContext,
  loadStatementNotificationContext,
  persistEmailNotification,
} from "./notifications.repository";
import {
  renderAppointmentCancellation,
  renderAppointmentConfirmation,
  renderInvoiceIssued,
  renderPatientStatement,
} from "./notifications.templates";
import {
  NOTIFICATION_TEMPLATES,
  type DispatchNotificationInput,
  type DispatchNotificationResult,
  type NotificationTemplate,
} from "./notifications.types";

function logDispatchFailure(template: NotificationTemplate, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[notifications] Failed to dispatch ${template}:`, message);
}

export function scheduleNotificationDispatch(
  tenantId: string,
  input: Omit<DispatchNotificationInput, "trigger">,
) {
  void dispatchNotification(tenantId, { ...input, trigger: "system" }).catch((error) =>
    logDispatchFailure(input.template, error),
  );
}

export async function dispatchNotification(
  tenantId: string,
  input: DispatchNotificationInput,
): Promise<DispatchNotificationResult> {
  switch (input.template) {
    case NOTIFICATION_TEMPLATES.APPOINTMENT_CONFIRMATION:
      return dispatchAppointmentConfirmation(tenantId, input);
    case NOTIFICATION_TEMPLATES.APPOINTMENT_CANCELLATION:
      return dispatchAppointmentCancellation(tenantId, input);
    case NOTIFICATION_TEMPLATES.INVOICE_ISSUED:
      return dispatchInvoiceIssued(tenantId, input);
    case NOTIFICATION_TEMPLATES.PATIENT_STATEMENT:
      return dispatchPatientStatement(tenantId, input);
    default:
      throw new NotificationContextError(`Unsupported notification template: ${input.template}`);
  }
}

async function finalizeDispatch(input: {
  tenantId: string;
  template: NotificationTemplate;
  recipientEmail: string;
  rendered: { subject: string; text: string; html: string };
  entityType?: string;
  entityId?: string;
  triggeredByUserId?: string;
  trigger: "manual" | "system";
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
  metadata?: Record<string, unknown>;
}): Promise<DispatchNotificationResult> {
  const result = await sendEmail({
    to: input.recipientEmail,
    subject: input.rendered.subject,
    text: input.rendered.text,
    html: input.rendered.html,
    attachments: input.attachments,
  });

  let notificationId: string | undefined;

  if (input.triggeredByUserId) {
    const record = await persistEmailNotification({
      tenantId: input.tenantId,
      userId: input.triggeredByUserId,
      template: input.template,
      recipientEmail: input.recipientEmail,
      subject: input.rendered.subject,
      body: input.rendered.text,
      entityType: input.entityType,
      entityId: input.entityId,
      messageId: result.messageId,
      metadata: input.metadata,
    });
    notificationId = record.id;
  }

  await writeAuditLog({
    tenantId: input.tenantId,
    userId: input.triggeredByUserId,
    action: "notification.sent",
    entity: "Notification",
    entityId: notificationId,
    metadata: {
      template: input.template,
      trigger: input.trigger,
      recipientEmail: input.recipientEmail,
      messageId: result.messageId,
      entityType: input.entityType,
      entityId: input.entityId,
      ...input.metadata,
    },
  });

  return {
    template: input.template,
    recipientEmail: input.recipientEmail,
    messageId: result.messageId,
    notificationId,
    entityType: input.entityType,
    entityId: input.entityId,
    metadata: input.metadata,
  };
}

async function dispatchAppointmentConfirmation(
  tenantId: string,
  input: DispatchNotificationInput,
): Promise<DispatchNotificationResult> {
  if (!input.appointmentId) {
    throw new NotificationContextError("appointmentId is required for appointment confirmation");
  }

  const context = await loadAppointmentNotificationContext(tenantId, input.appointmentId);
  if (!context.recipientEmail) {
    throw new NotificationRecipientRequiredError("Patient does not have an email address on file");
  }

  const rendered = renderAppointmentConfirmation(
    {
      clinicName: context.tenant.name,
      patientName: context.patientName,
      appointmentType: context.appointment.type,
      startTime: context.appointment.startTime,
      endTime: context.appointment.endTime,
      clinicianName: context.clinicianName,
      status: context.appointment.status,
    },
    input.message,
  );

  return finalizeDispatch({
    tenantId,
    template: input.template,
    recipientEmail: context.recipientEmail,
    rendered,
    entityType: "Appointment",
    entityId: input.appointmentId,
    triggeredByUserId: input.triggeredByUserId,
    trigger: input.trigger ?? "manual",
    metadata: { appointmentId: input.appointmentId },
  });
}

async function dispatchAppointmentCancellation(
  tenantId: string,
  input: DispatchNotificationInput,
): Promise<DispatchNotificationResult> {
  if (!input.appointmentId) {
    throw new NotificationContextError("appointmentId is required for appointment cancellation");
  }

  const context = await loadAppointmentNotificationContext(tenantId, input.appointmentId);
  if (!context.recipientEmail) {
    throw new NotificationRecipientRequiredError("Patient does not have an email address on file");
  }

  const rendered = renderAppointmentCancellation(
    {
      clinicName: context.tenant.name,
      patientName: context.patientName,
      appointmentType: context.appointment.type,
      startTime: context.appointment.startTime,
      endTime: context.appointment.endTime,
      clinicianName: context.clinicianName,
      status: context.appointment.status,
      cancellationReason: context.appointment.cancellationReason,
    },
    input.message,
  );

  return finalizeDispatch({
    tenantId,
    template: input.template,
    recipientEmail: context.recipientEmail,
    rendered,
    entityType: "Appointment",
    entityId: input.appointmentId,
    triggeredByUserId: input.triggeredByUserId,
    trigger: input.trigger ?? "manual",
    metadata: { appointmentId: input.appointmentId },
  });
}

async function dispatchInvoiceIssued(
  tenantId: string,
  input: DispatchNotificationInput,
): Promise<DispatchNotificationResult> {
  if (!input.invoiceId) {
    throw new NotificationContextError("invoiceId is required for invoice issued notification");
  }

  const context = await loadInvoiceNotificationContext(tenantId, input.invoiceId);
  if (!context.recipientEmail) {
    throw new NotificationRecipientRequiredError("Patient does not have an email address on file");
  }

  const rendered = renderInvoiceIssued(
    {
      clinicName: context.tenant.name,
      patientName: context.patientName,
      invoiceNumber: context.invoice.invoiceNumber,
      total: Number(context.invoice.total),
      currency: context.invoice.currency,
      dueDate: context.invoice.dueDate,
      description: context.invoice.description,
    },
    input.message,
  );

  const { buffer, filename } = await buildInvoicePdfAttachment(tenantId, input.invoiceId);

  return finalizeDispatch({
    tenantId,
    template: input.template,
    recipientEmail: context.recipientEmail,
    rendered,
    entityType: "Invoice",
    entityId: input.invoiceId,
    triggeredByUserId: input.triggeredByUserId,
    trigger: input.trigger ?? "manual",
    attachments: [{ filename, content: buffer, contentType: "application/pdf" }],
    metadata: {
      invoiceId: input.invoiceId,
      invoiceNumber: context.invoice.invoiceNumber,
    },
  });
}

async function dispatchPatientStatement(
  tenantId: string,
  input: DispatchNotificationInput,
): Promise<DispatchNotificationResult> {
  if (!input.patientId) {
    throw new NotificationContextError("patientId is required for patient statement notification");
  }

  const context = await loadStatementNotificationContext(tenantId, input.patientId, {
    includeClinicalSummary: input.includeClinicalSummary,
    from: input.from,
    to: input.to,
  });

  if (!context.recipientEmail) {
    throw new NotificationRecipientRequiredError("Patient does not have an email address on file");
  }

  const rendered = renderPatientStatement(
    {
      clinicName: context.tenant.name,
      patientName: context.patientName,
      reference: context.statementReference,
      currency: context.billingSummary.currency,
      totalInvoiced: context.billingSummary.totalInvoiced,
      totalPaid: context.billingSummary.totalPaid,
      outstanding: context.billingSummary.outstanding,
    },
    input.message,
  );

  const { buffer, filename } = await buildStatementPdfAttachment(tenantId, input.patientId, {
    includeClinicalSummary: input.includeClinicalSummary,
    from: input.from,
    to: input.to,
  });

  return finalizeDispatch({
    tenantId,
    template: input.template,
    recipientEmail: context.recipientEmail,
    rendered,
    entityType: "Patient",
    entityId: input.patientId,
    triggeredByUserId: input.triggeredByUserId,
    trigger: input.trigger ?? "manual",
    attachments: [{ filename, content: buffer, contentType: "application/pdf" }],
    metadata: {
      patientId: input.patientId,
      reference: context.statementReference,
      includeClinicalSummary: input.includeClinicalSummary ?? false,
    },
  });
}

export function notifyAppointmentConfirmation(
  tenantId: string,
  appointmentId: string,
  triggeredByUserId?: string,
) {
  scheduleNotificationDispatch(tenantId, {
    template: NOTIFICATION_TEMPLATES.APPOINTMENT_CONFIRMATION,
    appointmentId,
    triggeredByUserId,
  });
}

export function notifyAppointmentCancellation(
  tenantId: string,
  appointmentId: string,
  triggeredByUserId?: string,
) {
  scheduleNotificationDispatch(tenantId, {
    template: NOTIFICATION_TEMPLATES.APPOINTMENT_CANCELLATION,
    appointmentId,
    triggeredByUserId,
  });
}

export function notifyInvoiceIssued(tenantId: string, invoiceId: string, triggeredByUserId?: string) {
  scheduleNotificationDispatch(tenantId, {
    template: NOTIFICATION_TEMPLATES.INVOICE_ISSUED,
    invoiceId,
    triggeredByUserId,
  });
}

export function notifyPatientStatement(
  tenantId: string,
  patientId: string,
  options: {
    triggeredByUserId?: string;
    message?: string;
    includeClinicalSummary?: boolean;
    from?: Date;
    to?: Date;
  } = {},
) {
  scheduleNotificationDispatch(tenantId, {
    template: NOTIFICATION_TEMPLATES.PATIENT_STATEMENT,
    patientId,
    ...options,
  });
}

async function buildInvoicePdfAttachment(tenantId: string, invoiceId: string) {
  const invoice = await findInvoiceByIdOrThrow(tenantId, invoiceId);
  const paid = await getPaidTotalForInvoice(invoiceId);
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

async function buildStatementPdfAttachment(
  tenantId: string,
  patientId: string,
  options: { includeClinicalSummary?: boolean; from?: Date; to?: Date },
) {
  const data = await fetchServiceStatementData(tenantId, patientId, options);
  const buffer = await generatePatientServiceStatementPdf(data);
  const safeName = data.patient.lastName.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 30) || "patient";

  return {
    buffer,
    filename: `${safeName}-service-statement-${data.statementReference}.pdf`,
  };
}
