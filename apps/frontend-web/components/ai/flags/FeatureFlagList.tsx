"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { FeatureFlagRecord } from "@/lib/feature-flag-types";

export type FeatureFlagListProps = {
  flags: FeatureFlagRecord[];
  basePath?: string;
  onToggleActive?: (id: string, isActive: boolean) => void;
};

export function FeatureFlagList({ flags, basePath = "/clinic/ai", onToggleActive }: FeatureFlagListProps) {
  return (
    <DataTable columns={["Key", "Type", "Rollout", "Active", "Actions"]} grid="default" isEmpty={!flags.length} emptyMessage="No feature flags.">
      {flags.map((flag) => (
        <Row key={flag.id}>
          <div className="dataset-list-name">{flag.key}</div>
          <div>{flag.type}</div>
          <div>
            {flag.type === "PERCENTAGE"
              ? `${Number(flag.rollout.percentage ?? 0)}%`
              : flag.type === "BOOLEAN"
                ? String(Boolean(flag.rollout.enabled ?? true))
                : JSON.stringify(flag.rollout)}
          </div>
          <div>
            <Badge variant={flag.isActive ? "default" : "secondary"}>{flag.isActive ? "Active" : "Off"}</Badge>
          </div>
          <div className="automation-builder-actions">
            {onToggleActive ? (
              <Button type="button" variant="ghost" onClick={() => onToggleActive(flag.id, !flag.isActive)}>
                {flag.isActive ? "Disable" : "Enable"}
              </Button>
            ) : null}
            <Link href={`${basePath}/flags?edit=${flag.id}`} className="dashboard-link">Edit</Link>
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
