export type AuditLogActionInput = {
  tenantId: string;
  actorUserId: string;
  actorRole?: string;
  entityType: string;
  entityId: string;
  action: string;
  metadata?: Record<string, unknown>;
};

export type AuditLogClientContext = {
  ipAddress?: string;
  userAgent?: string;
};

export type AuditLogClientOptions = {
  baseUrl?: string;
  logger?: Pick<Console, "warn">;
};

export class AuditLogHttpClient {
  private readonly baseUrl: string;
  private readonly logger: Pick<Console, "warn">;

  constructor(options: AuditLogClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? process.env.AUDIT_SERVICE_URL ?? "http://audit-service:3070").replace(
      /\/$/,
      "",
    );
    this.logger = options.logger ?? console;
  }

  async logAction(input: AuditLogActionInput, context: AuditLogClientContext = {}): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/audit-logs/internal`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          tenantId: input.tenantId,
          actorUserId: input.actorUserId,
          actorRole: input.actorRole,
          entityType: input.entityType,
          entityId: input.entityId,
          action: input.action,
          metadata: input.metadata ?? {},
          ipAddress: context.ipAddress,
          userAgent: context.userAgent,
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
        error instanceof Error ? error.message : error,
      );
    }
  }
}
