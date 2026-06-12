import { Injectable } from "@nestjs/common";
import { toAIProviderConfigResponse } from "@/models/AIProviderConfig";
import { AIProviderConfigRepository } from "@/repositories/ai-provider-config.repository";
import { encryptApiKey } from "@/utils/crypto.util";
import { aiProviderNotFoundError } from "@/utils/ai-errors";
import { validateCreateProvider, validateUpdateProvider } from "@/validators/provider.validator";

@Injectable()
export class ProviderConfigService {
  constructor(private readonly providerConfigRepository: AIProviderConfigRepository) {}

  async createProvider(tenantId: string, body: Record<string, unknown>) {
    const input = validateCreateProvider(body);
    const record = await this.providerConfigRepository.create({
      tenantId,
      provider: input.provider,
      modelName: input.modelName,
      apiKey: encryptApiKey(input.apiKey),
      baseUrl: input.baseUrl ?? null,
      isActive: input.isActive ?? true,
      priority: input.priority ?? 0,
    });

    return {
      message: "AI provider configuration created.",
      provider: toAIProviderConfigResponse(record),
    };
  }

  async listProviders(tenantId: string) {
    const records = await this.providerConfigRepository.listByTenant(tenantId);
    return records.map(toAIProviderConfigResponse);
  }

  async updateProvider(tenantId: string, id: string, body: Record<string, unknown>) {
    const existing = await this.providerConfigRepository.findByIdForTenant(id, tenantId);
    if (!existing) {
      throw aiProviderNotFoundError();
    }

    const input = validateUpdateProvider(body);
    const record = await this.providerConfigRepository.update(id, {
      ...(input.provider ? { provider: input.provider } : {}),
      ...(input.modelName ? { modelName: input.modelName } : {}),
      ...(input.apiKey ? { apiKey: encryptApiKey(input.apiKey) } : {}),
      ...(input.baseUrl !== undefined ? { baseUrl: input.baseUrl || null } : {}),
      ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
      ...(input.priority !== undefined ? { priority: input.priority } : {}),
    });

    return {
      message: "AI provider configuration updated.",
      provider: toAIProviderConfigResponse(record),
    };
  }
}
