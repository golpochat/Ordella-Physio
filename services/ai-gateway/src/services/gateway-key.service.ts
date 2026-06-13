import { createHash, randomBytes } from "node:crypto";
import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { GatewayScope, ValidatedKeyContext } from "@/models/AIGatewayKey";
import { toGatewayKeyRecord } from "@/models/AIGatewayKey";
import { GatewayRepository } from "@/repositories/gateway.repository";

@Injectable()
export class GatewayKeyService {
  constructor(private readonly repository: GatewayRepository) {}

  hashKey(apiKey: string) {
    return createHash("sha256").update(apiKey).digest("hex");
  }

  generateKey() {
    const raw = `ord_ai_${randomBytes(24).toString("hex")}`;
    return { raw, hash: this.hashKey(raw), prefix: raw.slice(0, 12) };
  }

  async createKey(tenantId: string, input: {
    name: string;
    scopes: GatewayScope[];
    rateLimitProfileId?: string;
    budgetProfileId?: string;
  }) {
    const generated = this.generateKey();
    const row = await this.repository.createKey({
      tenantId,
      name: input.name,
      keyHash: generated.hash,
      keyPrefix: generated.prefix,
      scopes: input.scopes as Prisma.InputJsonValue,
      rateLimitProfileId: input.rateLimitProfileId,
      budgetProfileId: input.budgetProfileId,
    });
    return { key: toGatewayKeyRecord(row), apiKey: generated.raw };
  }

  async validateKey(apiKey: string): Promise<ValidatedKeyContext | null> {
    const row = await this.repository.findKeyByHash(this.hashKey(apiKey));
    if (!row || !row.isActive || row.revokedAt) return null;
    return {
      keyId: row.id,
      tenantId: row.tenantId,
      scopes: (row.scopes as GatewayScope[]) ?? [],
      rateLimitProfileId: row.rateLimitProfileId,
      budgetProfileId: row.budgetProfileId,
      isThrottled: row.isThrottled,
    };
  }

  async listKeys(tenantId: string) {
    return (await this.repository.listKeys(tenantId)).map(toGatewayKeyRecord);
  }

  async revokeKey(tenantId: string, keyId: string) {
    const row = await this.repository.findKey(keyId);
    if (!row || row.tenantId !== tenantId) throw new Error("Key not found.");
    const updated = await this.repository.updateKey(keyId, { isActive: false, revokedAt: new Date() });
    return toGatewayKeyRecord(updated);
  }

  async rotateKey(tenantId: string, keyId: string) {
    const row = await this.repository.findKey(keyId);
    if (!row || row.tenantId !== tenantId) throw new Error("Key not found.");
    const generated = this.generateKey();
    const updated = await this.repository.updateKey(keyId, {
      keyHash: generated.hash,
      keyPrefix: generated.prefix,
      isFlagged: false,
      isThrottled: false,
    });
    return { key: toGatewayKeyRecord(updated), apiKey: generated.raw };
  }

  async touchKey(keyId: string) {
    await this.repository.updateKey(keyId, { lastUsedAt: new Date() });
  }

  async updateKey(tenantId: string, keyId: string, data: Partial<{
    name: string;
    scopes: GatewayScope[];
    isActive: boolean;
    rateLimitProfileId: string | null;
  }>) {
    const row = await this.repository.findKey(keyId);
    if (!row || row.tenantId !== tenantId) throw new Error("Key not found.");
    const updated = await this.repository.updateKey(keyId, {
      ...data,
      scopes: data.scopes as Prisma.InputJsonValue | undefined,
    });
    return toGatewayKeyRecord(updated);
  }
}
