"use client";

import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { TableActionButton, TableRowActions } from "@/components/ui/table-row-actions";
import type { WorkflowVersionRecord } from "@/lib/automation-types";

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

export type WorkflowVersionListProps = {
  versions: WorkflowVersionRecord[];
  selectedVersion?: number | null;
  compareVersion?: number | null;
  onSelectVersion: (versionNumber: number) => void;
  onCompareVersion: (versionNumber: number) => void;
  renderActions: (version: WorkflowVersionRecord) => ReactNode;
};

export function WorkflowVersionList({
  versions,
  selectedVersion,
  compareVersion,
  onSelectVersion,
  onCompareVersion,
  renderActions,
}: WorkflowVersionListProps) {
  return (
    <DataTable
      columns={["Version", "Label", "Created by", "Created at", "Actions"]}
      grid="default"
      emptyMessage="No versions saved yet."
      isEmpty={versions.length === 0}
    >
      {versions.map((version) => (
        <Row key={version.id}>
          <div>
            <button
              type="button"
              className="dashboard-link"
              onClick={() => onSelectVersion(version.versionNumber)}
            >
              v{version.versionNumber}
            </button>
            {selectedVersion === version.versionNumber ? (
              <Badge variant="secondary">Selected</Badge>
            ) : null}
            {compareVersion === version.versionNumber ? (
              <Badge variant="secondary">Compare</Badge>
            ) : null}
          </div>
          <div>{version.label ?? "—"}</div>
          <div className="dashboard-cell-muted">{version.createdByUserId}</div>
          <div className="dashboard-cell-muted">{formatDateTime(version.createdAt)}</div>
          <TableRowActions>
            <TableActionButton
              label={`View workflow version ${version.versionNumber}`}
              icon="view"
              onClick={() => onSelectVersion(version.versionNumber)}
            />
            <TableActionButton
              label={`Compare workflow version ${version.versionNumber}`}
              icon="settings"
              onClick={() => onCompareVersion(version.versionNumber)}
            />
            {renderActions(version)}
          </TableRowActions>
        </Row>
      ))}
    </DataTable>
  );
}
