"use client";

import Link from "next/link";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
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
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminGatewayLimitsPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const rateLimits = useGatewayRateLimits();
  const budget = useGatewayBudget();
  const upsertRateLimit = useUpsertGatewayRateLimit();
  const updateBudget = useUpdateGatewayBudget();
  const isLoading = rateLimits.isLoading || budget.isLoading;
  const isError = rateLimits.isError || budget.isError;

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="AI Gateway limits"
          subtitle="Per-tenant rate limits and monthly token/cost budgets."
          isLoading={isLoading}
          isError={isError}
          onRetry={() => {
            void rateLimits.refetch();
            void budget.refetch();
          }}
          loadingRows={4}
        >
          <div className="ai-gateway-subnav">
            <Link href={adminAiPaths.gatewayKeys} className="ai-admin-nav-link">Keys</Link>
            <Link href={adminAiPaths.gatewayUsage} className="ai-admin-nav-link">Usage</Link>
            <Link href={adminAiPaths.gatewayLimits} className="ai-admin-nav-link ai-admin-nav-link-active">Limits</Link>
          </div>
          {canManage ? (
            <>
              <RateLimitConfig
                limits={rateLimits.data ?? []}
                isSaving={upsertRateLimit.isPending}
                onSave={(payload) => void upsertRateLimit.mutateAsync(payload).then(() => toast.success("Rate limits saved."))}
              />
              <BudgetConfig
                budget={budget.data}
                isSaving={updateBudget.isPending}
                onSave={(payload) => void updateBudget.mutateAsync(payload).then(() => toast.success("Budget saved."))}
              />
            </>
          ) : (
            <p>Read-only. Contact an admin to change limits.</p>
          )}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
