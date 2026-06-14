import type { AuditContext } from "../utilities/audit.service";
import { dispatchNotification } from "../notifications/notifications.dispatch";
import { NOTIFICATION_TEMPLATES } from "../notifications/notifications.types";
import { generatePatientServiceStatementPdf } from "./statements.pdf";
import { fetchServiceStatementData } from "./statements.repository";
import type { EmailServiceStatementInput, ServiceStatementOptions } from "./statements.types";

function buildFilename(reference: string, patientLastName: string): string {
  const safeName = patientLastName.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 30) || "patient";
  return `${safeName}-service-statement-${reference}.pdf`;
}

export async function generateServiceStatementPdf(
  tenantId: string,
  patientId: string,
  options: ServiceStatementOptions = {},
) {
  const data = await fetchServiceStatementData(tenantId, patientId, options);
  const buffer = await generatePatientServiceStatementPdf(data);
  const filename = buildFilename(data.statementReference, data.patient.lastName);

  return { buffer, filename, data };
}

export async function emailServiceStatementToPatient(
  tenantId: string,
  patientId: string,
  input: EmailServiceStatementInput = {},
  audit?: AuditContext,
) {
  const preview = await fetchServiceStatementData(tenantId, patientId, input);

  const result = await dispatchNotification(tenantId, {
    template: NOTIFICATION_TEMPLATES.PATIENT_STATEMENT,
    patientId,
    message: input.message,
    includeClinicalSummary: input.includeClinicalSummary,
    from: input.from,
    to: input.to,
    triggeredByUserId: audit?.userId,
    trigger: audit?.userId ? "manual" : "system",
  });

  return {
    sentTo: result.recipientEmail,
    reference: preview.statementReference,
    messageId: result.messageId,
    filename: buildFilename(preview.statementReference, preview.patient.lastName),
  };
}
