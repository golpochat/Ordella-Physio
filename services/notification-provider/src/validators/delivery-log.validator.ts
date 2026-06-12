import type { DeliveryStatus, NotificationChannel, NotificationProviderName } from "@/generated/prisma";
import { invalidPaginationError, providerValidationError } from "@/utils/provider-errors";

const CHANNELS = new Set<NotificationChannel>(["EMAIL", "SMS", "PUSH", "WHATSAPP", "VIBER"]);
const PROVIDERS = new Set<NotificationProviderName>([
  "SENDGRID",
  "TWILIO",
  "FIREBASE",
  "VIBER",
  "NONE",
]);
const STATUSES = new Set<DeliveryStatus>(["SUCCESS", "FAILED"]);

function readString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return undefined;
}

export type ListDeliveryLogsQuery = {
  page: number;
  limit: number;
  channel?: NotificationChannel;
  provider?: NotificationProviderName;
  status?: DeliveryStatus;
  dateStart?: Date;
  dateEnd?: Date;
  keyword?: string;
};

export function parseListDeliveryLogsQuery(
  query: Record<string, string | string[] | undefined>,
): ListDeliveryLogsQuery {
  const page = Number(readString(query.page) ?? "1");
  const limit = Number(readString(query.limit) ?? "20");
  const channel = readString(query.channel)?.toUpperCase() as NotificationChannel | undefined;
  const provider = readString(query.provider)?.toUpperCase() as NotificationProviderName | undefined;
  const status = readString(query.status)?.toUpperCase() as DeliveryStatus | undefined;
  const keyword = readString(query.keyword);
  const dateStartRaw = readString(query.dateStart);
  const dateEndRaw = readString(query.dateEnd);

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw invalidPaginationError();
  }

  const fields: Array<{ field: string; message: string }> = [];

  if (channel && !CHANNELS.has(channel)) {
    fields.push({ field: "channel", message: "channel is invalid." });
  }

  if (provider && !PROVIDERS.has(provider)) {
    fields.push({ field: "provider", message: "provider is invalid." });
  }

  if (status && !STATUSES.has(status)) {
    fields.push({ field: "status", message: "status is invalid." });
  }

  let dateStart: Date | undefined;
  let dateEnd: Date | undefined;

  if (dateStartRaw) {
    dateStart = new Date(dateStartRaw);
    if (Number.isNaN(dateStart.getTime())) {
      fields.push({ field: "dateStart", message: "dateStart must be a valid date." });
    }
  }

  if (dateEndRaw) {
    dateEnd = new Date(dateEndRaw);
    if (Number.isNaN(dateEnd.getTime())) {
      fields.push({ field: "dateEnd", message: "dateEnd must be a valid date." });
    }
  }

  if (fields.length > 0) {
    throw providerValidationError(fields);
  }

  return {
    page,
    limit,
    channel,
    provider,
    status,
    dateStart,
    dateEnd,
    keyword,
  };
}
