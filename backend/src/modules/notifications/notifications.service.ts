import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../utils/api-error";
import { buildPaginatedResponse, getPagination, type PaginationInput } from "../../utils/pagination";
import { auditCreate, auditUpdate, type AuditContext } from "../utilities/audit.service";
import { dispatchNotification } from "./notifications.dispatch";
import { NOTIFICATION_TEMPLATES } from "./notifications.types";
import type { DispatchNotificationInput } from "./notifications.types";

export async function listNotifications(tenantId: string, userId: string, pagination: PaginationInput) {
  const where = { tenantId, userId };

  const [items, total] = await Promise.all([
    prisma.notification.findMany({
      where,
      ...getPagination(pagination),
      orderBy: { createdAt: "desc" },
    }),
    prisma.notification.count({ where }),
  ]);

  return buildPaginatedResponse(items, total, pagination);
}

export async function getUnreadCount(tenantId: string, userId: string) {
  const count = await prisma.notification.count({
    where: { tenantId, userId, readAt: null },
  });

  return { count };
}

export async function markNotificationRead(
  tenantId: string,
  userId: string,
  id: string,
  audit?: AuditContext,
) {
  const notification = await prisma.notification.findFirst({ where: { id, tenantId, userId } });
  if (!notification) throw new NotFoundError("Notification not found");

  const updated = await prisma.notification.update({
    where: { id },
    data: { readAt: new Date(), status: "READ" },
  });

  if (audit) {
    await auditUpdate(audit, "Notification", id, { status: "READ" });
  }

  return updated;
}

export async function createNotification(
  tenantId: string,
  data: { userId: string; title: string; body: string },
  audit?: AuditContext,
) {
  const notification = await prisma.notification.create({
    data: {
      tenantId,
      userId: data.userId,
      title: data.title,
      body: data.body,
      channel: "IN_APP",
      status: "SENT",
    },
  });

  if (audit) {
    await auditCreate(audit, "Notification", notification.id, {
      targetUserId: data.userId,
      title: data.title,
    });
  }

  return notification;
}

export async function sendNotification(
  tenantId: string,
  userId: string,
  input: Omit<DispatchNotificationInput, "triggeredByUserId" | "trigger">,
) {
  return dispatchNotification(tenantId, {
    ...input,
    triggeredByUserId: userId,
    trigger: "manual",
  });
}

export function listNotificationTemplates() {
  return Object.values(NOTIFICATION_TEMPLATES).map((template) => ({
    template,
    description: TEMPLATE_DESCRIPTIONS[template],
    requiredFields: TEMPLATE_REQUIRED_FIELDS[template],
  }));
}

const TEMPLATE_DESCRIPTIONS: Record<(typeof NOTIFICATION_TEMPLATES)[keyof typeof NOTIFICATION_TEMPLATES], string> = {
  APPOINTMENT_CONFIRMATION: "Email the patient confirming a scheduled appointment",
  APPOINTMENT_CANCELLATION: "Email the patient about a cancelled appointment",
  INVOICE_ISSUED: "Email the patient when an invoice is issued (includes PDF)",
  PATIENT_STATEMENT: "Email the patient their service statement (includes PDF)",
};

const TEMPLATE_REQUIRED_FIELDS: Record<
  (typeof NOTIFICATION_TEMPLATES)[keyof typeof NOTIFICATION_TEMPLATES],
  string[]
> = {
  APPOINTMENT_CONFIRMATION: ["appointmentId"],
  APPOINTMENT_CANCELLATION: ["appointmentId"],
  INVOICE_ISSUED: ["invoiceId"],
  PATIENT_STATEMENT: ["patientId"],
};

export {
  notifyAppointmentCancellation,
  notifyAppointmentConfirmation,
  notifyInvoiceIssued,
  notifyPatientStatement,
  scheduleNotificationDispatch,
} from "./notifications.dispatch";
