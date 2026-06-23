"use client";

import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { TableActionLink, TableRowActions } from "@/components/ui/table-row-actions";
import type { ExperimentRecord } from "@/lib/training-types";
import { CLINIC_AI_BASE } from "@/lib/ai-admin-paths";

export type ExperimentListProps = {
  jobId: string;
  experiments: ExperimentRecord[];
  selectedIds?: string[];
  onToggleSelect?: (experimentId: string) => void;
  basePath?: string;
};

export function ExperimentList({
  jobId,
  experiments,
  selectedIds = [],
  onToggleSelect,
  basePath = CLINIC_AI_BASE,
}: ExperimentListProps) {
  return (
    <DataTable
      columns={["Select", "Name", "Status", "Metrics", "Label", "Actions"]}
      grid="default"
      emptyMessage="No experiments tracked yet."
      isEmpty={experiments.length === 0}
    >
      {experiments.map((experiment) => (
        <Row key={experiment.id}>
          <div>
            {onToggleSelect ? (
              <input
                type="checkbox"
                checked={selectedIds.includes(experiment.id)}
                onChange={() => onToggleSelect(experiment.id)}
              />
            ) : (
              "—"
            )}
          </div>
          <div className="dataset-list-name">{experiment.experimentName}</div>
          <div>
            <Badge variant="secondary">{experiment.status}</Badge>
          </div>
          <div className="dashboard-cell-muted">
            loss: {String(experiment.metrics.loss ?? "—")} · acc:{" "}
            {String(experiment.metrics.accuracy ?? "—")}
          </div>
          <div>{experiment.label ?? "—"}</div>
          <TableRowActions>
            <TableActionLink
              href={`${basePath}/training/${jobId}/experiments/compare?ids=${experiment.id}`}
              label={`Compare experiment ${experiment.experimentName}`}
              icon="settings"
            />
            <TableActionLink
              href={`${basePath}/experiments/${experiment.id}`}
              label={`View experiment ${experiment.experimentName}`}
              icon="view"
            />
          </TableRowActions>
        </Row>
      ))}
    </DataTable>
  );
}
