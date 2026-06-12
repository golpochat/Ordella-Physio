import { Injectable, Logger } from "@nestjs/common";
import type { LogActionInput } from "@/models/AuditLog";

export type AuditLogClientContext = {
  ipAddress?: string;
  userAgent?: string;
  authorization?: string;
};

/**
 * HTTP client for domain services to append audit events via AuditLogService.
 * Wire AUDIT_SERVICE_URL in the calling service environment.
 */
@Injectable()
export class AuditLogClient {
  private readonly logger = new Logger(AuditLogClient.name);

  private get baseUrl(): string {
    return process.env.AUDIT_SERVICE_URL ?? "http://audit-service:3070";
  }

  async logAction(input: LogActionInput, context: AuditLogClientContext = {}): Promise<void> {
    try {
      const headers: Record<string, string> = {
        accept: "application/json",
        "content-type": "application/json",
      };

      if (context.authorization) {
        headers.authorization = context.authorization;
      }

      const response = await fetch(`${this.baseUrl}/audit-logs`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          tenantId: input.tenantId,
          actorUserId: input.actorUserId,
          actorRole: input.actorRole,
          entityType: input.entityType,
          entityId: input.entityId,
          action: input.action,
          metadata: input.metadata,
        }),
      });

      if (!response.ok) {
        this.logger.warn(
          `Audit log write failed for ${input.entityType}/${input.entityId} action ${input.action}: HTTP ${response.status}`,
        );
      }
    } catch (error) {
      this.logger.warn(
        `Audit log write failed for ${input.entityType}/${input.entityId} action ${input.action}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}
