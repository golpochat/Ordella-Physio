"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { AbExperimentRecord } from "@/lib/feature-flag-types";

export type ExperimentListProps = {
  experiments: AbExperimentRecord[];
  basePath?: string;
  experimentsPath?: string;
};

export function ExperimentList({ experiments, basePath = "/clinic/ai", experimentsPath }: ExperimentListProps) {
  const detailBase = experimentsPath ?? `${basePath}/experiments`;
  return (
    <DataTable columns={["Name", "Status", "Variants", "Metrics", "Actions"]} grid="default" isEmpty={!experiments.length} emptyMessage="No experiments.">
      {experiments.map((experiment) => (
        <Row key={experiment.id}>
          <div>
            <div className="dataset-list-name">{experiment.name}</div>
            {experiment.modelKey ? <span className="dashboard-cell-muted">Model: {experiment.modelKey}</span> : null}
          </div>
          <div><Badge variant="secondary">{experiment.status}</Badge></div>
          <div>{experiment.variants.map((v) => `${v.key} (${v.weight}%)`).join(", ")}</div>
          <div>{experiment.metricsTracked.join(", ")}</div>
          <div>
            <Link href={`${detailBase}/${experiment.id}`} className="dashboard-link">View</Link>
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
