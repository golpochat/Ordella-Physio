"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { useAuditLogs } from "@/hooks/useEnterprise";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

type AuditLogViewerProps = {
  global?: boolean;
};

export function AuditLogViewer({ global = false }: AuditLogViewerProps) {
  const logsQuery = useAuditLogs(global);
  const logs = logsQuery.data ?? [];

  if (logsQuery.isLoading) return <PageLoading rows={5} />;
  if (logsQuery.isError) return <PageError onRetry={() => void logsQuery.refetch()} />;

  if (!logs.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        No audit logs recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <Card key={log.id}>
          <CardBody className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div>
              <p className="font-medium">
                {log.action} — {log.resource}
              </p>
              <p className="text-xs text-muted-foreground">
                {log.actorEmail ?? log.actorId ?? "System"} · {formatPatientDateTime(log.createdAt)}
                {global ? ` · Tenant ${log.tenantId}` : ""}
              </p>
            </div>
            <Badge variant={log.status === "success" ? "default" : "destructive"}>{log.status}</Badge>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
