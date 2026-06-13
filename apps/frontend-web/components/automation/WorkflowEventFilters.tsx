"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { WorkflowLiveEventFilters, WorkflowLiveEventType, WorkflowRecord } from "@/lib/automation-types";

const EVENT_TYPES: Array<{ value: WorkflowLiveEventType | ""; label: string }> = [
  { value: "", label: "All event types" },
  { value: "TRIGGERED", label: "Triggered" },
  { value: "CONDITION_PASSED", label: "Condition passed" },
  { value: "CONDITION_FAILED", label: "Condition failed" },
  { value: "ACTION_EXECUTED", label: "Action executed" },
  { value: "ACTION_FAILED", label: "Action failed" },
  { value: "WORKFLOW_COMPLETED", label: "Workflow completed" },
];

export type WorkflowEventFiltersProps = {
  filters: WorkflowLiveEventFilters;
  workflows: WorkflowRecord[];
  disabled?: boolean;
  onChange: (filters: WorkflowLiveEventFilters) => void;
  onReset: () => void;
};

export function WorkflowEventFilters({
  filters,
  workflows,
  disabled = false,
  onChange,
  onReset,
}: WorkflowEventFiltersProps) {
  return (
    <div className="automation-history-filters">
      <div className="tenant-create-form-field">
        <Label htmlFor="monitor-search">Search</Label>
        <Input
          id="monitor-search"
          value={filters.search ?? ""}
          disabled={disabled}
          placeholder="Workflow name or event type"
          onChange={(event) => onChange({ ...filters, search: event.target.value || undefined })}
        />
      </div>

      <div className="tenant-create-form-field">
        <Label htmlFor="monitor-workflow">Workflow</Label>
        <select
          id="monitor-workflow"
          className="automation-select"
          disabled={disabled}
          value={filters.workflowId ?? ""}
          onChange={(event) =>
            onChange({ ...filters, workflowId: event.target.value || undefined })
          }
        >
          <option value="">All workflows</option>
          {workflows.map((workflow) => (
            <option key={workflow.id} value={workflow.id}>
              {workflow.name}
            </option>
          ))}
        </select>
      </div>

      <div className="tenant-create-form-field">
        <Label htmlFor="monitor-event-type">Event type</Label>
        <select
          id="monitor-event-type"
          className="automation-select"
          disabled={disabled}
          value={filters.eventType ?? ""}
          onChange={(event) =>
            onChange({
              ...filters,
              eventType: (event.target.value || undefined) as WorkflowLiveEventFilters["eventType"],
            })
          }
        >
          {EVENT_TYPES.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="tenant-create-form-field">
        <Label htmlFor="monitor-status">Status</Label>
        <select
          id="monitor-status"
          className="automation-select"
          disabled={disabled}
          value={filters.status ?? ""}
          onChange={(event) =>
            onChange({
              ...filters,
              status: (event.target.value || undefined) as WorkflowLiveEventFilters["status"],
            })
          }
        >
          <option value="">All statuses</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      <div className="tenant-create-form-field">
        <Label htmlFor="monitor-from">From</Label>
        <Input
          id="monitor-from"
          type="date"
          disabled={disabled}
          value={filters.from ?? ""}
          onChange={(event) => onChange({ ...filters, from: event.target.value || undefined })}
        />
      </div>

      <div className="tenant-create-form-field">
        <Label htmlFor="monitor-to">To</Label>
        <Input
          id="monitor-to"
          type="date"
          disabled={disabled}
          value={filters.to ?? ""}
          onChange={(event) => onChange({ ...filters, to: event.target.value || undefined })}
        />
      </div>

      <div className="automation-filter-actions">
        <Button type="button" variant="ghost" size="sm" disabled={disabled} onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </div>
  );
}
