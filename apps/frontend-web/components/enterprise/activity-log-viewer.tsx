"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { useActivityLogs } from "@/hooks/useEnterprise";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

type ActivityLogViewerProps = {
  global?: boolean;
};

export function ActivityLogViewer({ global = false }: ActivityLogViewerProps) {
  const logsQuery = useActivityLogs(global);
  const logs = logsQuery.data ?? [];

  if (logsQuery.isLoading) return <PageLoading rows={5} />;
  if (logsQuery.isError) return <PageError onRetry={() => void logsQuery.refetch()} />;

  if (!logs.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        No activity recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <Card key={log.id}>
          <CardBody className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div>
              <p className="font-medium">{log.eventType}</p>
              <p className="text-xs text-muted-foreground">
                {log.source} · {formatPatientDateTime(log.createdAt)}
                {global ? ` · Tenant ${log.tenantId}` : ""}
              </p>
            </div>
            <Badge variant="outline">{log.status}</Badge>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
