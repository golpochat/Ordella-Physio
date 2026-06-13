"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
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
            <div className="dataset-row-actions">
              <Link
                href={`${basePath}/datasets/${datasetId}/versions/${version.id}`}
                className="dashboard-link"
              >
                Records
              </Link>
              <button
                type="button"
                className="dashboard-link"
                onClick={() => onCompareVersion(version.versionNumber)}
              >
                Compare
              </button>
              {canManage && onRollback ? (
                <button
                  type="button"
                  className="dashboard-link"
                  onClick={() => onRollback(version.versionNumber)}
                >
                  Rollback
                </button>
              ) : null}
            </div>
          </Row>
        );
      })}
    </DataTable>
  );
}
