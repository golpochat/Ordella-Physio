import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { toAccessPolicyRecord } from "@/models/AIAccessPolicy";
import { toAuditLogRecord } from "@/models/AIAuditLog";
import { toPIIIncidentRecord } from "@/models/AIPIIIncident";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class SecurityRepository {
  constructor(private readonly db: DatabaseService) {}

  createAuditLog(data: {
    tenantId: string;
    userId?: string;
    apiKeyId?: string;
    action: string;
    modelId?: string;
    requestMetadata?: Prisma.InputJsonValue;
    responseMetadata?: Prisma.InputJsonValue;
    piiDetected?: boolean;
    redacted?: boolean;
  }) {
    return this.db.aIAuditLog.create({ data });
  }

  searchAuditLogs(tenantId: string, filters: {
    action?: string;
    modelId?: string;
    userId?: string;
    since?: Date;
    piiDetected?: boolean;
    limit?: number;
  }) {
    return this.db.aIAuditLog.findMany({
      where: {
        tenantId,
        ...(filters.action ? { action: filters.action } : {}),
        ...(filters.modelId ? { modelId: filters.modelId } : {}),
        ...(filters.userId ? { userId: filters.userId } : {}),
        ...(filters.piiDetected !== undefined ? { piiDetected: filters.piiDetected } : {}),
        ...(filters.since ? { timestamp: { gte: filters.since } } : {}),
      },
      orderBy: { timestamp: "desc" },
      take: filters.limit ?? 500,
    });
  }

  upsertAccessPolicy(tenantId: string, modelId: string, data: {
    allowedRoles: Prisma.InputJsonValue;
    allowedUsers?: Prisma.InputJsonValue;
  }) {
    return this.db.aIAccessPolicy.upsert({
      where: { tenantId_modelId: { tenantId, modelId } },
      create: { tenantId, modelId, ...data },
      update: data,
    });
  }

  listAccessPolicies(tenantId: string) {
    return this.db.aIAccessPolicy.findMany({ where: { tenantId }, orderBy: { createdAt: "desc" } });
  }

  getAccessPolicy(tenantId: string, modelId: string) {
    return this.db.aIAccessPolicy.findUnique({ where: { tenantId_modelId: { tenantId, modelId } } });
  }

  deleteAccessPolicy(id: string, tenantId: string) {
    return this.db.aIAccessPolicy.deleteMany({ where: { id, tenantId } });
  }

  createPIIIncident(data: {
    tenantId: string;
    modelId?: string;
    piiType: string;
    originalText: string;
    redactedText: string;
  }) {
    return this.db.aIPIIIncident.create({ data });
  }

  listPIIIncidents(tenantId: string, unresolvedOnly = false) {
    return this.db.aIPIIIncident.findMany({
      where: { tenantId, ...(unresolvedOnly ? { resolvedAt: null } : {}) },
      orderBy: { detectedAt: "desc" },
      take: 200,
    });
  }

  resolvePIIIncident(id: string, tenantId: string) {
    return this.db.aIPIIIncident.updateMany({
      where: { id, tenantId },
      data: { resolvedAt: new Date() },
    });
  }

  storeSecurePrompt(data: {
    tenantId: string;
    modelId?: string;
    promptHash: string;
    responseHash?: string;
    redactedPrompt: string;
    redactedResponse?: string;
  }) {
    return this.db.aISecurePromptStore.create({ data });
  }

  mapAuditLog(row: Awaited<ReturnType<SecurityRepository["createAuditLog"]>>) {
    return toAuditLogRecord(row);
  }

  mapPolicy(row: Awaited<ReturnType<SecurityRepository["listAccessPolicies"]>>[number]) {
    return toAccessPolicyRecord(row);
  }

  mapIncident(row: Awaited<ReturnType<SecurityRepository["listPIIIncidents"]>>[number]) {
    return toPIIIncidentRecord(row);
  }
}
