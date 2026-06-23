import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";
"use client";

import Link from "next/link";
import { toast } from "sonner";
import { BudgetConfig } from "@/components/ai/gateway/BudgetConfig";
import { RateLimitConfig } from "@/components/ai/gateway/RateLimitConfig";
import { ListPage } from "@/components/dashboard/ListPage";
import {
  useGatewayBudget,
  useGatewayRateLimits,
  useUpdateGatewayBudget,
  useUpsertGatewayRateLimit,
} from "@/hooks/useAiGateway";
import { useAuth } from "@/hooks/useAuth";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { aiGatewaySectionNav } from "@/lib/ai-admin-section-nav";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicGatewayLimitsPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const rateLimits = useGatewayRateLimits();
  const budget = useGatewayBudget();
  const upsertRateLimit = useUpsertGatewayRateLimit();
  const updateBudget = useUpdateGatewayBudget();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title="AI Gateway limits"
        subtitle="Configure tenant rate limits and budgets."
        isLoading={rateLimits.isLoading || budget.isLoading}
        isError={rateLimits.isError || budget.isError}
        onRetry={() => {
          void rateLimits.refetch();
          void budget.refetch();
        }}
        loadingRows={4}
      >
        <AiAdminSectionNav items={aiGatewaySectionNav(clinicAiPaths)} />
        {canManage ? (
          <>
            <RateLimitConfig
              limits={rateLimits.data ?? []}
              isSaving={upsertRateLimit.isPending}
              onSave={(payload) => void upsertRateLimit.mutateAsync(payload).then(() => toast.success("Saved."))}
            />
            <BudgetConfig
              budget={budget.data}
              isSaving={updateBudget.isPending}
              onSave={(payload) => void updateBudget.mutateAsync(payload).then(() => toast.success("Saved."))}
            />
          </>
        ) : (
          <p>Read-only view.</p>
        )}
      </ListPage>
    </WithPermission>
  );
}
