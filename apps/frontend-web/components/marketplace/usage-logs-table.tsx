"use client";

import { Card, CardBody } from "@/components/ui/card";
import { IntegrationStatusBadge } from "@/components/marketplace/integration-status-badge";
import { useIntegrationUsageLogs } from "@/hooks/useMarketplace";
import { formatPatientDateTime } from "@/lib/patient-portal-utils";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";

type UsageLogsTableProps = {
  integrationId?: string;
};

export function UsageLogsTable({ integrationId }: UsageLogsTableProps) {
  const { data, isLoading, isError, refetch } = useIntegrationUsageLogs(integrationId);
  const logs = data ?? [];

  if (isLoading) {
    return <PageLoading rows={4} />;
  }

  if (isError) {
    return <PageError onRetry={() => void refetch()} />;
  }

  if (!logs.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        No integration activity recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <Card key={log.id}>
          <CardBody className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div>
              <p className="font-medium">{log.action}</p>
              <p className="text-xs text-muted-foreground">
                {formatPatientDateTime(log.createdAt)}
              </p>
            </div>
            <IntegrationStatusBadge status={log.status} />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
