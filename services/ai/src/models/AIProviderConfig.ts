import type { AIProviderConfig as AIProviderConfigModel } from "@/generated/prisma";

export type { AIProviderConfigModel as AIProviderConfigRecord };

export type AIProviderConfigResponse = {
  id: string;
  tenantId: string;
  provider: string;
  modelName: string;
  baseUrl: string | null;
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
};

export function toAIProviderConfigResponse(
  record: AIProviderConfigModel,
): AIProviderConfigResponse {
  return {
    id: record.id,
    tenantId: record.tenantId,
    provider: record.provider,
    modelName: record.modelName,
    baseUrl: record.baseUrl,
    isActive: record.isActive,
    priority: record.priority,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}
