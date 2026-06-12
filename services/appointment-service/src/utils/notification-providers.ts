import { Logger } from "@nestjs/common";

const logger = new Logger("NotificationProviders");

export type NotificationDeliveryPayload = {
  tenantId: string;
  to: string;
  subject: string;
  body: string;
  metadata?: Record<string, unknown>;
};

export type NotificationDeliveryResult = {
  success: boolean;
  error?: string;
};

export async function sendEmail(
  payload: NotificationDeliveryPayload,
): Promise<NotificationDeliveryResult> {
  logger.log(`[stub] sendEmail to=${payload.to} subject="${payload.subject}"`);
  return { success: true };
}

export async function sendSms(
  payload: NotificationDeliveryPayload,
): Promise<NotificationDeliveryResult> {
  logger.log(`[stub] sendSms to=${payload.to} body="${payload.body.slice(0, 80)}..."`);
  return { success: true };
}

export async function sendPush(
  payload: NotificationDeliveryPayload,
): Promise<NotificationDeliveryResult> {
  logger.log(`[stub] sendPush to=${payload.to} subject="${payload.subject}"`);
  return { success: true };
}
