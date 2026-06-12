import type { NotificationChannel } from "@/generated/prisma";

import { providerValidationError } from "@/utils/provider-errors";



const CHANNELS = new Set<NotificationChannel>(["EMAIL", "SMS", "PUSH", "WHATSAPP", "VIBER"]);



function readString(value: unknown): string | undefined {

  if (typeof value === "string") {

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : undefined;

  }



  return undefined;

}



function readVariables(value: unknown): Record<string, string> | undefined {

  if (!value || typeof value !== "object" || Array.isArray(value)) {

    return undefined;

  }



  const result: Record<string, string> = {};

  for (const [key, entry] of Object.entries(value)) {

    if (typeof entry === "string" || typeof entry === "number" || typeof entry === "boolean") {

      result[key] = String(entry);

    }

  }



  return result;

}



function readMetadata(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  return value as Record<string, unknown>;
}

export type DeliveryPayload = {
  channel: NotificationChannel;
  to: string;
  templateId?: string;
  variables?: Record<string, string>;
  metadata?: Record<string, unknown>;
  message?: string;
  subject?: string;
  title?: string;
  html?: string;
};


export function validateDeliveryPayload(body: Record<string, unknown>): DeliveryPayload {

  const fields: Array<{ field: string; message: string }> = [];



  const channel = readString(body.channel)?.toUpperCase() as NotificationChannel | undefined;

  const to = readString(body.to);

  const templateId = readString(body.templateId);

  const message = readString(body.message);

  const subject = readString(body.subject);

  const title = readString(body.title);

  const html = readString(body.html);

  const variables = body.variables === undefined ? undefined : readVariables(body.variables);
  const metadata = body.metadata === undefined ? undefined : readMetadata(body.metadata);

  if (!channel || !CHANNELS.has(channel)) {
    fields.push({ field: "channel", message: "channel is required and must be valid." });

  }



  if (!to) {

    fields.push({ field: "to", message: "to is required." });

  }



  if (!templateId && !message && !html) {

    fields.push({

      field: "message",

      message: "message, html, or templateId is required.",

    });

  }



  if (body.variables !== undefined && !variables) {
    fields.push({ field: "variables", message: "variables must be a JSON object." });
  }

  if (body.metadata !== undefined && !metadata) {
    fields.push({ field: "metadata", message: "metadata must be a JSON object." });
  }


  if (fields.length > 0) {

    throw providerValidationError(fields);

  }



  return {
    channel: channel!,
    to: to!,
    templateId,
    variables,
    metadata,
    message,
    subject,
    title,
    html,
  };
}


