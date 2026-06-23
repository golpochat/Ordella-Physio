"use client";

import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { TableActionButton, TableActionLink, TableRowActions } from "@/components/ui/table-row-actions";
import type { DatasetVersionRecord } from "@/lib/dataset-types";
import { CLINIC_AI_BASE } from "@/lib/ai-admin-paths";

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export type DatasetVersionListProps = {
  datasetId: string;
  versions: DatasetVersionRecord[];
  compareFrom: number | null;
  compareTo: number | null;
  onCompareVersion: (versionNumber: number) => void;
  onRollback?: (versionNumber: number) => void;
  canManage?: boolean;
  basePath?: string;
};

export function DatasetVersionList({
  datasetId,
  versions,
  compareFrom,
  compareTo,
  onCompareVersion,
  onRollback,
  canManage = false,
  basePath = CLINIC_AI_BASE,
}: DatasetVersionListProps) {
  return (
    <DataTable
      columns={["Version", "Records", "Embeddings", "Created", "Actions"]}
      grid="default"
      emptyMessage="No versions yet."
      isEmpty={versions.length === 0}
    >
      {versions.map((version) => {
        const isCompare =
          compareFrom === version.versionNumber || compareTo === version.versionNumber;

        return (
          <Row key={version.id}>
            <div>
              <div className="dataset-list-name">v{version.versionNumber}</div>
              {isCompare ? <Badge variant="secondary">Comparing</Badge> : null}
            </div>
            <div>{version.recordCount}</div>
            <div>{version.embeddingModel ?? "—"}</div>
            <div>{formatDateTime(version.createdAt)}</div>
            <TableRowActions className="dataset-row-actions">
              <TableActionLink
                href={`${basePath}/datasets/${datasetId}/versions/${version.id}`}
                label={`View records for version ${version.versionNumber}`}
                icon="view"
              />
              <TableActionButton
                label={`Compare version ${version.versionNumber}`}
                icon="settings"
                onClick={() => onCompareVersion(version.versionNumber)}
              />
              {canManage && onRollback ? (
                <TableActionButton
                  label={`Rollback to version ${version.versionNumber}`}
                  icon="edit"
                  onClick={() => onRollback(version.versionNumber)}
                />
              ) : null}
            </TableRowActions>
          </Row>
        );
      })}
    </DataTable>
  );
}
