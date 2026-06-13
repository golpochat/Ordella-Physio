"use client";

import Link from "next/link";
import { useMemo } from "react";
import { toast } from "sonner";
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
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function ModelDeploymentPage({ params }: Props) {
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

  async function handleDeploy() {
    if (!modelQuery.data) return;
    try {
      await startDeploy.mutateAsync({
        modelId,
        version: modelQuery.data.version,
      });
      toast.success("Deployment pipeline started.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Deployment failed.");
    }
  }

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title={modelQuery.data?.modelName ?? "Model deployment"}
        subtitle="Multi-region serving, canary rollout, failover, and performance monitoring."
        action={
          <div className="automation-builder-actions">
            {canManage ? (
              <>
                <Button type="button" disabled={startDeploy.isPending} onClick={() => void handleDeploy()}>
                  {startDeploy.isPending ? "Deploying…" : "Deploy model"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={rollback.isPending || !deployment}
                  onClick={() => void rollback.mutateAsync().then(() => toast.success("Rolled back."))}
                >
                  Rollback
                </Button>
              </>
            ) : null}
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/models/${modelId}`}>&larr; Model</Link>
            </Button>
          </div>
        }
        isLoading={modelQuery.isLoading || statusQuery.isLoading}
        isError={modelQuery.isError || statusQuery.isError}
        onRetry={() => {
          void modelQuery.refetch();
          void statusQuery.refetch();
          void metricsQuery.refetch();
        }}
        loadingRows={6}
      >
        <div className="training-deployment-page">
          <DeploymentStatusCard
            deployment={deployment}
            failoverActive={metrics?.failoverActive}
            failoverRegion={metrics?.failoverRegion}
          />
          <DeploymentRegionTable
            regions={regionRows}
            canManage={canManage}
            isBusy={setRollout.isPending}
            onAdjustRollout={(region, rolloutPercent) =>
              void setRollout.mutateAsync({ region, rolloutPercent }).then(() => toast.success(`Rollout updated for ${region}.`))
            }
          />
          <DeploymentHealthPanel
            metrics={metrics}
            failoverActive={metrics?.failoverActive}
            failoverRegion={metrics?.failoverRegion}
          />
          <DeploymentMetricsChart metrics={metrics} />
        </div>
      </ListPage>
    </WithPermission>
  );
}
