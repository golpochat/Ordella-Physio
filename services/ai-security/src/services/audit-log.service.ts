import { createHash } from "node:crypto";
import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { AuditAction, AuditLogRecord } from "@/models/AIAuditLog";
import { SecurityRepository } from "@/repositories/security.repository";

export type AuditSearchFilters = {
  action?: AuditAction;
  modelId?: string;
  userId?: string;
  since?: Date;
  piiDetected?: boolean;
  limit?: number;
};

@Injectable()
export class AuditLogService {
  constructor(private readonly repository: SecurityRepository) {}

  private async record(action: AuditAction, input: {
    tenantId: string;
    userId?: string;
    apiKeyId?: string;
    modelId?: string;
    requestMetadata?: Record<string, unknown>;
    responseMetadata?: Record<string, unknown>;
    piiDetected?: boolean;
    redacted?: boolean;
  }): Promise<AuditLogRecord> {
    const row = await this.repository.createAuditLog({
      tenantId: input.tenantId,
      userId: input.userId,
      apiKeyId: input.apiKeyId,
      action,
      modelId: input.modelId,
      requestMetadata: (input.requestMetadata ?? {}) as Prisma.InputJsonValue,
      responseMetadata: (input.responseMetadata ?? {}) as Prisma.InputJsonValue,
      piiDetected: input.piiDetected ?? false,
      redacted: input.redacted ?? false,
    });
    return this.repository.mapAuditLog(row);
  }

  recordInferenceEvent(input: Parameters<AuditLogService["record"]>[1]) {
    return this.record("INFERENCE", input);
  }

  recordTrainingEvent(input: Parameters<AuditLogService["record"]>[1]) {
    return this.record("TRAINING", input);
  }

  recordDeploymentEvent(input: Parameters<AuditLogService["record"]>[1]) {
    return this.record("DEPLOYMENT", input);
  }

  recordDatasetEvent(input: Parameters<AuditLogService["record"]>[1]) {
    return this.record("DATASET", input);
  }

  recordModelAccessEvent(input: Parameters<AuditLogService["record"]>[1]) {
    return this.record("MODEL_ACCESS", input);
  }

  async searchAuditLogs(tenantId: string, filters: AuditSearchFilters = {}) {
    const rows = await this.repository.searchAuditLogs(tenantId, filters);
    return rows.map((row) => this.repository.mapAuditLog(row));
  }

  async exportAuditLogs(tenantId: string, filters: AuditSearchFilters = {}) {
    const logs = await this.searchAuditLogs(tenantId, { ...filters, limit: 5000 });
    return {
      tenantId,
      exportedAt: new Date().toISOString(),
      count: logs.length,
      format: "json",
      logs,
      complianceFrameworks: ["SOC2", "ISO27001"],
    };
  }

  hashText(text: string) {
    return createHash("sha256").update(text).digest("hex");
  }
}
