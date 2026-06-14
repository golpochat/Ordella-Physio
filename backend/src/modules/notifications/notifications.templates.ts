import type { RenderedNotification } from "./notifications.types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDateTime(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 16).replace("T", " ");
}

function formatDate(value: Date | string | null | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
}

function formatMoney(currency: string, amount: number): string {
  return `${currency} ${amount.toFixed(2)}`;
}

function fullName(first?: string | null, last?: string | null): string {
  return `${first ?? ""} ${last ?? ""}`.trim() || "Patient";
}

type EmailLayoutInput = {
  clinicName: string;
  headline: string;
  patientName: string;
  bodyLines: string[];
  customMessage?: string;
  footerNote?: string;
};

function renderEmailLayout(input: EmailLayoutInput): RenderedNotification {
  const subject = `${input.clinicName} — ${input.headline}`;
  const textLines = [
    `Dear ${input.patientName},`,
    "",
    ...input.bodyLines,
    "",
    ...(input.customMessage ? [input.customMessage, ""] : []),
    input.footerNote ?? "If you have any questions, please contact the clinic.",
    "",
    "Regards,",
    input.clinicName,
  ];

  const bodyHtml = input.bodyLines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  const customHtml = input.customMessage
    ? `<p style="margin-top:16px;padding:12px;background:#f8fafc;border-left:4px solid #1e3a5f;">${escapeHtml(input.customMessage)}</p>`
    : "";

  const html = `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.5;max-width:640px;margin:0 auto;padding:24px;">
  <div style="border-bottom:3px solid #1e3a5f;padding-bottom:12px;margin-bottom:24px;">
    <h1 style="margin:0;font-size:22px;color:#1e3a5f;">${escapeHtml(input.clinicName)}</h1>
    <p style="margin:4px 0 0;color:#64748b;font-size:13px;">${escapeHtml(input.headline)}</p>
  </div>
  <p>Dear ${escapeHtml(input.patientName)},</p>
  ${bodyHtml}
  ${customHtml}
  <p style="margin-top:24px;color:#64748b;font-size:13px;">${escapeHtml(input.footerNote ?? "If you have any questions, please contact the clinic.")}</p>
  <p style="margin-top:24px;">Regards,<br><strong>${escapeHtml(input.clinicName)}</strong></p>
</body>
</html>`;

  return { subject, text: textLines.join("\n"), html };
}

export type AppointmentTemplateContext = {
  clinicName: string;
  patientName: string;
  appointmentType: string;
  startTime: Date;
  endTime: Date;
  clinicianName: string;
  status: string;
  cancellationReason?: string | null;
};

export type InvoiceTemplateContext = {
  clinicName: string;
  patientName: string;
  invoiceNumber: string;
  total: number;
  currency: string;
  dueDate?: Date | null;
  description?: string | null;
};

export type StatementTemplateContext = {
  clinicName: string;
  patientName: string;
  reference: string;
  currency: string;
  totalInvoiced: number;
  totalPaid: number;
  outstanding: number;
};

export function renderAppointmentConfirmation(
  context: AppointmentTemplateContext,
  customMessage?: string,
): RenderedNotification {
  return renderEmailLayout({
    clinicName: context.clinicName,
    headline: "Appointment Confirmation",
    patientName: context.patientName,
    customMessage,
    bodyLines: [
      "Your appointment has been confirmed.",
      `Type: ${context.appointmentType}`,
      `Date & time: ${formatDateTime(context.startTime)} – ${formatDateTime(context.endTime)}`,
      `Clinician: ${context.clinicianName}`,
      `Status: ${context.status}`,
    ],
  });
}

export function renderAppointmentCancellation(
  context: AppointmentTemplateContext,
  customMessage?: string,
): RenderedNotification {
  return renderEmailLayout({
    clinicName: context.clinicName,
    headline: "Appointment Cancellation",
    patientName: context.patientName,
    customMessage,
    bodyLines: [
      "Your appointment has been cancelled.",
      `Type: ${context.appointmentType}`,
      `Scheduled: ${formatDateTime(context.startTime)} – ${formatDateTime(context.endTime)}`,
      `Clinician: ${context.clinicianName}`,
      ...(context.cancellationReason ? [`Reason: ${context.cancellationReason}`] : []),
    ],
  });
}

export function renderInvoiceIssued(
  context: InvoiceTemplateContext,
  customMessage?: string,
): RenderedNotification {
  return renderEmailLayout({
    clinicName: context.clinicName,
    headline: "Invoice Issued",
    patientName: context.patientName,
    customMessage,
    bodyLines: [
      "A new invoice has been issued to your account.",
      `Invoice #: ${context.invoiceNumber}`,
      ...(context.description ? [`Description: ${context.description}`] : []),
      `Amount due: ${formatMoney(context.currency, context.total)}`,
      ...(context.dueDate ? [`Due date: ${formatDate(context.dueDate)}`] : []),
    ],
  });
}

export function renderPatientStatement(
  context: StatementTemplateContext,
  customMessage?: string,
): RenderedNotification {
  return renderEmailLayout({
    clinicName: context.clinicName,
    headline: "Patient Service Statement",
    patientName: context.patientName,
    customMessage,
    bodyLines: [
      `Please find attached your Patient Service Statement (ref: ${context.reference}).`,
      `Total invoiced: ${formatMoney(context.currency, context.totalInvoiced)}`,
      `Total paid: ${formatMoney(context.currency, context.totalPaid)}`,
      `Outstanding balance: ${formatMoney(context.currency, context.outstanding)}`,
    ],
    footerNote: "The statement PDF is attached to this email for your records.",
  });
}
