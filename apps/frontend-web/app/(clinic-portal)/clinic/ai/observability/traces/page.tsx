"use client";

import Link from "next/link";
import { useState } from "react";
import { TraceDetails } from "@/components/ai/observability/TraceDetails";
import { TraceList } from "@/components/ai/observability/TraceList";
import { ListPage } from "@/components/dashboard/ListPage";
import { useTraceDetail, useTraces } from "@/hooks/useAiObservability";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicObservabilityTracesPage() {
  const [selectedTraceId, setSelectedTraceId] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useTraces();
  const { data: traceDetail, isLoading: detailLoading } = useTraceDetail(selectedTraceId);

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="Distributed traces" isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={6}>
        <div className="ai-gateway-subnav">
          <Link href={clinicAiPaths.observability} className="ai-admin-nav-link">Dashboard</Link>
          <Link href={clinicAiPaths.observabilityTraces} className="ai-admin-nav-link ai-admin-nav-link-active">Traces</Link>
          <Link href={clinicAiPaths.observabilityLogs} className="ai-admin-nav-link">Logs</Link>
          <Link href={clinicAiPaths.observabilityMetrics} className="ai-admin-nav-link">Metrics</Link>
        </div>
        <TraceList traces={data ?? []} selectedTraceId={selectedTraceId} onSelect={setSelectedTraceId} />
        <TraceDetails trace={traceDetail} isLoading={detailLoading} />
      </ListPage>
    </WithPermission>
  );
}
