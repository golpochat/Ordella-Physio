"use client";

import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { RegionHealth } from "@/lib/training-types";
import { DeploymentRolloutSlider } from "@/components/ai/models/DeploymentRolloutSlider";

export type DeploymentRegionRow = {
  region: string;
  rolloutPercent: number;
  health: RegionHealth;
  latencyMs: number;
  errorRate: number;
};

export type DeploymentRegionTableProps = {
  regions: DeploymentRegionRow[];
  canManage?: boolean;
  isBusy?: boolean;
  onAdjustRollout?: (region: string, rolloutPercent: number) => void;
};

function healthLabel(health: RegionHealth) {
  return health === "HEALTHY" ? "Healthy" : health === "DEGRADED" ? "Degraded" : "Unhealthy";
}

export function DeploymentRegionTable({
  regions,
  canManage = false,
  isBusy = false,
  onAdjustRollout,
}: DeploymentRegionTableProps) {
  return (
    <DataTable
      columns={["Region", "Rollout %", "Health", "Latency", "Error rate", "Actions"]}
      grid="default"
      isEmpty={!regions.length}
      emptyMessage="No regions configured."
    >
      {regions.map((row) => (
        <Row key={row.region}>
          <div>{row.region}</div>
          <div>{row.rolloutPercent}%</div>
          <div className={`deployment-health-${row.health.toLowerCase()}`}>{healthLabel(row.health)}</div>
          <div>{Math.round(row.latencyMs)} ms</div>
          <div>{(row.errorRate * 100).toFixed(2)}%</div>
          <div>
            {canManage && onAdjustRollout ? (
              <DeploymentRolloutSlider
                region={row.region}
                value={row.rolloutPercent}
                disabled={isBusy}
                onApply={(value) => onAdjustRollout(row.region, value)}
              />
            ) : (
              <Button type="button" variant="ghost" disabled>
                View only
              </Button>
            )}
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
