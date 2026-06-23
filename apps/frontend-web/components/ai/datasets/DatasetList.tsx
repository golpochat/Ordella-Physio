"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { TableActionButton, TableActionLink, TableRowActions } from "@/components/ui/table-row-actions";
import type { DatasetRecord } from "@/lib/dataset-types";
import { CLINIC_AI_BASE } from "@/lib/ai-admin-paths";

function formatDateTime(value: string | null | undefined): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export type DatasetListProps = {
  datasets: DatasetRecord[];
  isBusy?: boolean;
  onClone: (id: string) => void;
  onDelete: (id: string) => void;
  canManage?: boolean;
  basePath?: string;
};

export function DatasetList({
  datasets,
  isBusy = false,
  onClone,
  onDelete,
  canManage = false,
  basePath = CLINIC_AI_BASE,
}: DatasetListProps) {
  return (
    <DataTable
      columns={["Name", "Type", "Records", "Version", "Updated", "Actions"]}
      grid="default"
      emptyMessage="No datasets yet. Create one to start building training data."
      isEmpty={datasets.length === 0}
    >
      {datasets.map((dataset) => (
        <Row key={dataset.id}>
          <div>
            <Link href={`${basePath}/datasets/${dataset.id}`} className="dataset-list-name">
              {dataset.name}
            </Link>
            {dataset.description ? (
              <div className="dashboard-cell-muted">{dataset.description}</div>
            ) : null}
            {dataset.tags.length ? (
              <div className="dataset-tag-row">
                {dataset.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <Badge variant="secondary">{dataset.type}</Badge>
          </div>
          <div>{dataset.recordCount ?? 0}</div>
          <div>v{dataset.latestVersionNumber ?? 1}</div>
          <div>{formatDateTime(dataset.updatedAt)}</div>
          <TableRowActions className="dataset-row-actions">
            <TableActionLink
              href={`${basePath}/datasets/${dataset.id}`}
              label={`Open dataset ${dataset.name}`}
              icon="view"
            />
            <TableActionLink
              href={`${basePath}/datasets/${dataset.id}/label`}
              label={`Label dataset ${dataset.name}`}
              icon="edit"
            />
            {canManage ? (
              <>
                <TableActionButton
                  label={`Clone dataset ${dataset.name}`}
                  icon="copy"
                  disabled={isBusy}
                  onClick={() => onClone(dataset.id)}
                />
                <TableActionButton
                  label={`Delete dataset ${dataset.name}`}
                  icon="delete"
                  destructive
                  disabled={isBusy}
                  onClick={() => onDelete(dataset.id)}
                />
              </>
            ) : null}
          </TableRowActions>
        </Row>
      ))}
    </DataTable>
  );
}
