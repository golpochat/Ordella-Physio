"use client";

import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { CheckpointRecord } from "@/lib/training-types";

export type CheckpointListProps = {
  checkpoints: CheckpointRecord[];
  canManage?: boolean;
  isBusy?: boolean;
  onResume?: (checkpointNumber: number) => void;
};

export function CheckpointList({
  checkpoints,
  canManage = false,
  isBusy = false,
  onResume,
}: CheckpointListProps) {
  return (
    <DataTable
      columns={["Checkpoint", "Metrics", "Location", "Created", "Actions"]}
      grid="default"
      emptyMessage="No checkpoints saved yet."
      isEmpty={checkpoints.length === 0}
    >
      {checkpoints.map((checkpoint) => (
        <Row key={checkpoint.id}>
          <div>#{checkpoint.checkpointNumber}</div>
          <div className="dashboard-cell-muted">
            loss: {String(checkpoint.metricsSnapshot.loss ?? "—")}
          </div>
          <div className="dashboard-cell-muted">{checkpoint.fileLocation}</div>
          <div>{new Date(checkpoint.createdAt).toLocaleString()}</div>
          <div>
            {canManage && onResume ? (
              <Button
                type="button"
                variant="ghost"
                disabled={isBusy}
                onClick={() => onResume(checkpoint.checkpointNumber)}
              >
                Resume
              </Button>
            ) : (
              "—"
            )}
          </div>
        </Row>
      ))}
    </DataTable>
  );
}
