"use client";

import Link from "next/link";
import { useMemo } from "react";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { DeploymentHealthPanel } from "@/components/ai/models/DeploymentHealthPanel";
import { DeploymentMetricsChart } from "@/components/ai/models/DeploymentMetricsChart";
import { DeploymentRegionTable } from "@/components/ai/models/DeploymentRegionTable";
import { DeploymentStatusCard } from "@/components/ai/models/DeploymentStatusCard";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useDeploymentMetrics,
  useModelDeploymentStatus,
  useRegistryModel,
  useRollbackModelDeployment,
  useSetRegionRollout,
  useStartModelDeployment,
} from "@/hooks/useTrainingPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function AdminModelDeploymentPage({ params }: Props) {
  const modelId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage") || userHasPermission(user, "ai.promotion.manage");
  const modelQuery = useRegistryModel(modelId);
  const statusQuery = useModelDeploymentStatus(modelId);
  const metricsQuery = useDeploymentMetrics(modelId, statusQuery.data?.active?.version);
  const startDeploy = useStartModelDeployment();
  const rollback = useRollbackModelDeployment(modelId);
  const setRollout = useSetRegionRollout(modelId);
  const deployment = statusQuery.data?.active ?? statusQuery.data?.latest ?? null;
  const metrics = metricsQuery.data;

  const regionRows = useMemo(() => {
    if (!deployment) return [];
    return deployment.regions.map((region) => ({
      region,
      rolloutPercent: deployment.rollout[region] ?? 0,
      health: deployment.health[region] ?? "HEALTHY",
      latencyMs: metrics?.byRegion[region]?.avgLatencyMs ?? 0,
      errorRate: metrics?.byRegion[region]?.errorRate ?? 0,
    }));
  }, [deployment, metrics]);

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title={modelQuery.data?.modelName ?? "Model deployment"}
          subtitle="Multi-region serving, canary rollout, failover, and monitoring."
          action={
            <div className="automation-builder-actions">
              {canManage ? (
                <Button
                  type="button"
                  onClick={() =>
                    void startDeploy
                      .mutateAsync({ modelId, version: modelQuery.data?.version ?? "v1" })
                      .then(() => toast.success("Deployment started."))
                  }
                >
                  Deploy
                </Button>
              ) : null}
              <Button asChild variant="ghost"><Link href={adminAiPaths.model(modelId)}>&larr; Model</Link></Button>
            </div>
          }
          isLoading={statusQuery.isLoading}
          isError={statusQuery.isError}
          onRetry={() => void statusQuery.refetch()}
          loadingRows={5}
        >
          <DeploymentStatusCard deployment={deployment} failoverActive={metrics?.failoverActive} failoverRegion={metrics?.failoverRegion} />
          <DeploymentRegionTable
            regions={regionRows}
            canManage={canManage}
            isBusy={setRollout.isPending}
            onAdjustRollout={(region, rolloutPercent) => void setRollout.mutateAsync({ region, rolloutPercent })}
          />
          <DeploymentHealthPanel metrics={metrics} failoverActive={metrics?.failoverActive} failoverRegion={metrics?.failoverRegion} />
          <DeploymentMetricsChart metrics={metrics} />
          {canManage ? (
            <Button type="button" variant="secondary" onClick={() => void rollback.mutateAsync().then(() => toast.success("Rolled back."))}>
              Rollback deployment
            </Button>
          ) : null}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
