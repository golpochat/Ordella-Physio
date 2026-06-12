import type { NotificationChannel, NotificationProviderName } from "@/generated/prisma";
import { invalidAnalyticsQueryError } from "@/utils/provider-errors";

function readString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return undefined;
}

export type AnalyticsQuery = {
  dateStart?: Date;
  dateEnd?: Date;
};

export function parseAnalyticsQuery(
  query: Record<string, string | string[] | undefined>,
): AnalyticsQuery {
  const dateStartRaw = readString(query.dateStart);
  const dateEndRaw = readString(query.dateEnd);
  const fields: Array<{ field: string; message: string }> = [];

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

  if (dateStart && dateEnd && dateStart > dateEnd) {
    fields.push({ field: "dateEnd", message: "dateEnd must be after dateStart." });
  }

  if (fields.length > 0) {
    throw invalidAnalyticsQueryError();
  }

  return { dateStart, dateEnd };
}

export type ChannelStats = { sent: number; failed: number };
export type ProviderStats = { sent: number; failed: number };

export type AnalyticsStatsResponse = {
  totals: { sent: number; failed: number };
  successRate: number;
  byChannel: Record<NotificationChannel, ChannelStats>;
  byProvider: Record<NotificationProviderName, ProviderStats>;
  queue: {
    pending: number;
    lastProcessedAt: string | null;
  };
};
