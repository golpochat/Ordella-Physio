"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import type { DatasetRecordItem } from "@/lib/dataset-types";

function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value, null, 2);
}

export type DatasetRecordTableProps = {
  records: DatasetRecordItem[];
  isBusy?: boolean;
  canManage?: boolean;
  onAdd: (payload: { input: string; output: string }) => void;
  onUpdate: (recordId: string, payload: { input: string; output: string }) => void;
  onDelete: (recordId: string) => void;
};

export function DatasetRecordTable({
  records,
  isBusy = false,
  canManage = false,
  onAdd,
  onUpdate,
  onDelete,
}: DatasetRecordTableProps) {
  const [newInput, setNewInput] = useState("");
  const [newOutput, setNewOutput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const [editOutput, setEditOutput] = useState("");

  function startEdit(record: DatasetRecordItem) {
    setEditingId(record.id);
    setEditInput(formatValue(record.input));
    setEditOutput(record.output ? formatValue(record.output) : "");
  }

  function handleAdd() {
    if (!newInput.trim()) {
      return;
    }
    onAdd({ input: newInput, output: newOutput });
    setNewInput("");
    setNewOutput("");
  }

  function handleSaveEdit(recordId: string) {
    onUpdate(recordId, { input: editInput, output: editOutput });
    setEditingId(null);
  }

  return (
    <div className="dataset-records-panel">
      {canManage ? (
        <div className="dataset-record-form">
          <h3>Add record</h3>
          <textarea
            className="automation-select"
            value={newInput}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNewInput(event.target.value)}
            placeholder="Input text or JSON"
            rows={4}
          />
          <textarea
            className="automation-select"
            value={newOutput}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNewOutput(event.target.value)}
            placeholder="Output (optional)"
            rows={3}
          />
          <Button type="button" disabled={isBusy || !newInput.trim()} onClick={handleAdd}>
            Add record
          </Button>
        </div>
      ) : null}

      <DataTable
        columns={["Input", "Output", "Labels", "Embedding", "Actions"]}
        grid="default"
        emptyMessage="No records in this version."
        isEmpty={records.length === 0}
      >
        {records.map((record) => (
          <Row key={record.id}>
            <div>
              {editingId === record.id ? (
                <textarea
                  className="automation-select"
                  value={editInput}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setEditInput(event.target.value)
                  }
                  rows={5}
                />
              ) : (
                <pre className="dataset-json-preview">{formatValue(record.input)}</pre>
              )}
            </div>
            <div>
              {editingId === record.id ? (
                <textarea
                  className="automation-select"
                  value={editOutput}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setEditOutput(event.target.value)
                  }
                  rows={4}
                />
              ) : (
                <pre className="dataset-json-preview">
                  {record.output ? formatValue(record.output) : "—"}
                </pre>
              )}
            </div>
            <div className="dataset-tag-row">
              {record.labels.length
                ? record.labels.map((label) => (
                    <Badge key={label.id} variant="secondary">
                      {label.labelType}
                    </Badge>
                  ))
                : "—"}
            </div>
            <div>{record.embedding?.length ? `${record.embedding.length} dims` : "—"}</div>
            <div className="dataset-row-actions">
              {canManage ? (
                editingId === record.id ? (
                  <>
                    <button
                      type="button"
                      className="dashboard-link"
                      disabled={isBusy}
                      onClick={() => handleSaveEdit(record.id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="dashboard-link"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="dashboard-link"
                      onClick={() => startEdit(record)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="dashboard-link dataset-link-danger"
                      disabled={isBusy}
                      onClick={() => onDelete(record.id)}
                    >
                      Delete
                    </button>
                  </>
                )
              ) : null}
            </div>
          </Row>
        ))}
      </DataTable>
    </div>
  );
}
