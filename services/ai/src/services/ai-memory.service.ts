import { Injectable } from "@nestjs/common";
import { AiMemoryRepository } from "@/repositories/ai-memory.repository";

export type AiMemoryValue = Record<string, unknown> | string | number | boolean | null;

@Injectable()
export class AiMemoryService {
  constructor(private readonly memoryRepository: AiMemoryRepository) {}

  async saveMemory(
    tenantId: string,
    key: string,
    value: AiMemoryValue,
    options?: { entityType?: string; entityId?: string },
  ) {
    const record = await this.memoryRepository.upsert({
      tenantId,
      memoryKey: key,
      value: value as never,
      entityType: options?.entityType,
      entityId: options?.entityId,
    });

    return {
      key: record.memoryKey,
      value: record.value,
      entityType: record.entityType,
      entityId: record.entityId,
      updatedAt: record.updatedAt.toISOString(),
    };
  }

  async getMemory(tenantId: string, key: string) {
    const record = await this.memoryRepository.findByKey(tenantId, key);
    if (!record) {
      return null;
    }

    return {
      key: record.memoryKey,
      value: record.value,
      entityType: record.entityType,
      entityId: record.entityId,
      updatedAt: record.updatedAt.toISOString(),
    };
  }

  async getEntityMemory(tenantId: string, entityType: string, entityId: string) {
    const records = await this.memoryRepository.listByEntity(tenantId, entityType, entityId);
    return records.map((record) => ({
      key: record.memoryKey,
      value: record.value,
      updatedAt: record.updatedAt.toISOString(),
    }));
  }

  async getRecentInteractions(tenantId: string, limit = 10) {
    const records = await this.memoryRepository.listByTenant(tenantId, limit);
    return records
      .filter((record) => record.memoryKey.startsWith("interaction:"))
      .map((record) => ({
        key: record.memoryKey,
        value: record.value,
        updatedAt: record.updatedAt.toISOString(),
      }));
  }

  async saveInteraction(
    tenantId: string,
    input: { query: string; response: string; entityType?: string; entityId?: string },
  ) {
    const key = `interaction:${Date.now()}`;
    return this.saveMemory(tenantId, key, input, {
      entityType: input.entityType,
      entityId: input.entityId,
    });
  }

  async clearMemory(tenantId: string) {
    await this.memoryRepository.deleteByTenant(tenantId);
    return { cleared: true };
  }

  buildContextWindow(
    memories: Array<{ key: string; value: unknown }>,
    maxItems = 8,
  ) {
    return memories.slice(0, maxItems).map((memory) => JSON.stringify(memory.value)).join("\n");
  }
}
