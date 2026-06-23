"use client";

import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";

import Link from "next/link";
import { useState } from "react";
import { AiAdminShell } from "@/components/ai/admin";
import { TraceDetails } from "@/components/ai/observability/TraceDetails";
import { TraceList } from "@/components/ai/observability/TraceList";
import { ListPage } from "@/components/dashboard/ListPage";
import { useTraceDetail, useTraces } from "@/hooks/useAiObservability";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { aiObservabilitySectionNav } from "@/lib/ai-admin-section-nav";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminObservabilityTracesPage() {
  const [selectedTraceId, setSelectedTraceId] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useTraces();
  const { data: traceDetail, isLoading: detailLoading } = useTraceDetail(selectedTraceId);

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage title="Distributed traces" subtitle="Waterfall view across AI services." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={6}>
          <AiAdminSectionNav items={aiObservabilitySectionNav(adminAiPaths)} />
          <TraceList traces={data ?? []} selectedTraceId={selectedTraceId} onSelect={setSelectedTraceId} />
          <TraceDetails trace={traceDetail} isLoading={detailLoading} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
