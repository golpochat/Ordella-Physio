import type {
  DeliveryStatus,
  NotificationChannel,
  NotificationProviderName,
} from "@/generated/prisma";

export type DeliveryLogRecord = {
  id: string;
  tenantId: string;
  channel: NotificationChannel;
  provider: NotificationProviderName;
  status: DeliveryStatus;
  errorMessage: string | null;
  requestPayload: Record<string, unknown>;
  responsePayload: Record<string, unknown> | null;
  retryCount: number;
  nextAttemptAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type DeliveryLogResponse = {
  id: string;
  tenantId: string;
  channel: NotificationChannel;
  provider: NotificationProviderName;
  status: DeliveryStatus;
  errorMessage: string | null;
  requestPayload: Record<string, unknown>;
  responsePayload: Record<string, unknown> | null;
  retryCount: number;
  nextAttemptAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export function toDeliveryLogResponse(record: DeliveryLogRecord): DeliveryLogResponse {
  return {
    id: record.id,
    tenantId: record.tenantId,
    channel: record.channel,
    provider: record.provider,
    status: record.status,
    errorMessage: record.errorMessage,
    requestPayload: record.requestPayload,
    responsePayload: record.responsePayload,
    retryCount: record.retryCount,
    nextAttemptAt: record.nextAttemptAt?.toISOString() ?? null,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
