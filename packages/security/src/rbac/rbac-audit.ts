export type RbacAuditEvent = {
  actorId: string;
  targetId?: string;
  action: string;
  permission: string;
  timestamp?: string;
  tenantId?: string | null;
  organizationId?: string | null;
  metadata?: Record<string, unknown>;
};

type RbacAuditSink = (event: RbacAuditEvent) => void | Promise<void>;

let auditSink: RbacAuditSink | null = null;

export function configureRbacAuditSink(sink: RbacAuditSink | null): void {
  auditSink = sink;
}

export async function logRbacAction(event: RbacAuditEvent): Promise<void> {
  const payload: RbacAuditEvent = {
    ...event,
    timestamp: event.timestamp ?? new Date().toISOString(),
  };

  if (auditSink) {
    await auditSink(payload);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[rbac-audit]", JSON.stringify(payload));
  }
}
