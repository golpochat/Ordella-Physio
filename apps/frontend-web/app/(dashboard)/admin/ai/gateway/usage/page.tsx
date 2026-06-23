import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";
"use client";

import Link from "next/link";
import { AiAdminShell } from "@/components/ai/admin";
import { UsageByKeyTable } from "@/components/ai/gateway/UsageByKeyTable";
import { UsageByModelChart } from "@/components/ai/gateway/UsageByModelChart";
import { UsageSummary } from "@/components/ai/gateway/UsageSummary";
import { ListPage } from "@/components/dashboard/ListPage";
import { useGatewayKeys, useGatewayUsageByKey, useGatewayUsageByModel, useGatewayUsageSummary } from "@/hooks/useAiGateway";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { aiGatewaySectionNav } from "@/lib/ai-admin-section-nav";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminGatewayUsagePage() {
  const summary = useGatewayUsageSummary();
  const byModel = useGatewayUsageByModel();
  const byKey = useGatewayUsageByKey();
  const keys = useGatewayKeys();
  const keyNames = Object.fromEntries((keys.data ?? []).map((key) => [key.id, key.name]));
  const isLoading = summary.isLoading || byModel.isLoading || byKey.isLoading;
  const isError = summary.isError || byModel.isError || byKey.isError;

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="AI Gateway usage"
          subtitle="Tokens, cost, and latency across models and API keys."
          isLoading={isLoading}
          isError={isError}
          onRetry={() => {
            void summary.refetch();
            void byModel.refetch();
            void byKey.refetch();
          }}
          loadingRows={4}
        >
          <AiAdminSectionNav items={aiGatewaySectionNav(adminAiPaths)} />
          <UsageSummary summary={summary.data} />
          <UsageByModelChart models={byModel.data ?? []} />
          <UsageByKeyTable usage={byKey.data ?? []} keyNames={keyNames} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
