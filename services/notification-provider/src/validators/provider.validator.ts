import type { NotificationChannel, NotificationProviderName } from "@/generated/prisma";

import { providerValidationError } from "@/utils/provider-errors";



const CHANNELS = new Set<NotificationChannel>(["EMAIL", "SMS", "PUSH", "WHATSAPP", "VIBER"]);

const PROVIDERS = new Set<NotificationProviderName>([
  "SENDGRID",
  "TWILIO",
  "FIREBASE",
  "VIBER",
  "NONE",
]);



function readString(value: unknown): string | undefined {

  if (typeof value === "string") {

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : undefined;

  }



  return undefined;

}



function readBoolean(value: unknown): boolean | undefined {

  if (typeof value === "boolean") {

    return value;

  }



  if (typeof value === "string") {

    const normalized = value.trim().toLowerCase();

    if (normalized === "true") return true;

    if (normalized === "false") return false;

  }



  return undefined;

}



function readCredentials(value: unknown): Record<string, unknown> | undefined {

  if (!value || typeof value !== "object" || Array.isArray(value)) {

    return undefined;

  }



  return value as Record<string, unknown>;

}



export type CreateProviderConfigPayload = {

  channel: NotificationChannel;

  provider: NotificationProviderName;

  credentials: Record<string, unknown>;

  isActive: boolean;

  priority: number;

};



export function validateCreateProviderConfig(body: Record<string, unknown>): CreateProviderConfigPayload {

  const fields: Array<{ field: string; message: string }> = [];



  const channel = readString(body.channel)?.toUpperCase() as NotificationChannel | undefined;

  const provider = readString(body.provider)?.toUpperCase() as NotificationProviderName | undefined;

  const credentials = readCredentials(body.credentials);

  const isActive = readBoolean(body.isActive) ?? true;

  const priorityRaw = body.priority;

  const priority = priorityRaw === undefined ? 1 : Number(priorityRaw);



  if (!channel || !CHANNELS.has(channel)) {

    fields.push({ field: "channel", message: "channel is required and must be valid." });

  }



  if (!provider || !PROVIDERS.has(provider)) {

    fields.push({ field: "provider", message: "provider is required and must be valid." });

  }



  if (!credentials) {

    fields.push({ field: "credentials", message: "credentials must be a JSON object." });

  }



  if (!Number.isInteger(priority) || priority < 1) {

    fields.push({ field: "priority", message: "priority must be a positive integer." });

  }



  if (fields.length > 0) {

    throw providerValidationError(fields);

  }



  return {

    channel: channel!,

    provider: provider!,

    credentials: credentials!,

    isActive,

    priority,

  };

}



export function validateUpdateProviderConfig(body: Record<string, unknown>) {

  const fields: Array<{ field: string; message: string }> = [];

  const update: Partial<CreateProviderConfigPayload> = {};



  if (body.channel !== undefined) {

    const channel = readString(body.channel)?.toUpperCase() as NotificationChannel | undefined;

    if (!channel || !CHANNELS.has(channel)) {

      fields.push({ field: "channel", message: "channel must be valid." });

    } else {

      update.channel = channel;

    }

  }



  if (body.provider !== undefined) {

    const provider = readString(body.provider)?.toUpperCase() as NotificationProviderName | undefined;

    if (!provider || !PROVIDERS.has(provider)) {

      fields.push({ field: "provider", message: "provider must be valid." });

    } else {

      update.provider = provider;

    }

  }



  if (body.credentials !== undefined) {

    const credentials = readCredentials(body.credentials);

    if (!credentials) {

      fields.push({ field: "credentials", message: "credentials must be a JSON object." });

    } else {

      update.credentials = credentials;

    }

  }



  if (body.isActive !== undefined) {

    const isActive = readBoolean(body.isActive);

    if (isActive === undefined) {

      fields.push({ field: "isActive", message: "isActive must be a boolean." });

    } else {

      update.isActive = isActive;

    }

  }



  if (body.priority !== undefined) {

    const priority = Number(body.priority);

    if (!Number.isInteger(priority) || priority < 1) {

      fields.push({ field: "priority", message: "priority must be a positive integer." });

    } else {

      update.priority = priority;

    }

  }



  if (fields.length > 0) {

    throw providerValidationError(fields);

  }



  if (Object.keys(update).length === 0) {

    throw providerValidationError([{ field: "body", message: "At least one field is required." }]);

  }



  return update;

}


