"use client";

import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";

import Link from "next/link";
import { UsageByKeyTable } from "@/components/ai/gateway/UsageByKeyTable";
import { UsageByModelChart } from "@/components/ai/gateway/UsageByModelChart";
import { UsageSummary } from "@/components/ai/gateway/UsageSummary";
import { ListPage } from "@/components/dashboard/ListPage";
import { useGatewayKeys, useGatewayUsageByKey, useGatewayUsageByModel, useGatewayUsageSummary } from "@/hooks/useAiGateway";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { aiGatewaySectionNav } from "@/lib/ai-admin-section-nav";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicGatewayUsagePage() {
  const summary = useGatewayUsageSummary();
  const byModel = useGatewayUsageByModel();
  const byKey = useGatewayUsageByKey();
  const keys = useGatewayKeys();
  const keyNames = Object.fromEntries((keys.data ?? []).map((key) => [key.id, key.name]));

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title="AI Gateway usage"
        subtitle="Track tokens, cost, and latency."
        isLoading={summary.isLoading || byModel.isLoading || byKey.isLoading}
        isError={summary.isError || byModel.isError || byKey.isError}
        onRetry={() => {
          void summary.refetch();
          void byModel.refetch();
          void byKey.refetch();
        }}
        loadingRows={4}
      >
        <AiAdminSectionNav items={aiGatewaySectionNav(clinicAiPaths)} />
        <UsageSummary summary={summary.data} />
        <UsageByModelChart models={byModel.data ?? []} />
        <UsageByKeyTable usage={byKey.data ?? []} keyNames={keyNames} />
      </ListPage>
    </WithPermission>
  );
}
