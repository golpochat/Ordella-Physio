import type { NotificationChannel, NotificationProviderName } from "@/generated/prisma";

export type ProviderConfigRecord = {
  id: string;
  tenantId: string;
  channel: NotificationChannel;
  provider: NotificationProviderName;
  credentials: Record<string, unknown>;
  isActive: boolean;
  priority: number;
  isHealthy: boolean;
  lastHealthCheckAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProviderConfigResponse = {
  id: string;
  tenantId: string;
  channel: NotificationChannel;
  provider: NotificationProviderName;
  credentials: Record<string, unknown>;
  isActive: boolean;
  priority: number;
  isHealthy: boolean;
  lastHealthCheckAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export function toProviderConfigResponse(record: ProviderConfigRecord): ProviderConfigResponse {
  return {
    id: record.id,
    tenantId: record.tenantId,
    channel: record.channel,
    provider: record.provider,
    credentials: record.credentials,
    isActive: record.isActive,
    priority: record.priority,
    isHealthy: record.isHealthy,
    lastHealthCheckAt: record.lastHealthCheckAt?.toISOString() ?? null,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
