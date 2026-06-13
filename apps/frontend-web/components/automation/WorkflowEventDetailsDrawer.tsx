"use client";

import { Button } from "@/components/ui/button";
import { WorkflowEventTimeline } from "@/components/automation/WorkflowEventTimeline";
import type { WorkflowLiveEvent } from "@/lib/automation-types";

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

export type WorkflowEventDetailsDrawerProps = {
  event: WorkflowLiveEvent | null;
  relatedEvents: WorkflowLiveEvent[];
  onClose: () => void;
};

export function WorkflowEventDetailsDrawer({
  event,
  relatedEvents,
  onClose,
}: WorkflowEventDetailsDrawerProps) {
  if (!event) {
    return null;
  }

  return (
    <div className="automation-details-drawer-overlay" role="presentation" onClick={onClose}>
      <aside
        className="automation-details-drawer"
        role="dialog"
        aria-label="Workflow event details"
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <div className="automation-details-drawer-header">
          <div>
            <h2>{event.workflowName ?? "Workflow event"}</h2>
            <p className="dashboard-cell-muted">{formatTimestamp(event.timestamp)}</p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="automation-details-drawer-section">
          <h3>Timeline</h3>
          <WorkflowEventTimeline events={relatedEvents} runId={event.runId} />
        </div>

        <div className="automation-details-drawer-section">
          <h3>Payload</h3>
          <pre className="automation-json-preview">{JSON.stringify(event.payload, null, 2)}</pre>
        </div>

        <div className="automation-details-drawer-meta">
          <p>
            <strong>Event type:</strong> {event.eventType}
          </p>
          <p>
            <strong>Status:</strong> {event.status ?? "—"}
          </p>
          <p>
            <strong>Duration:</strong> {event.durationMs != null ? `${event.durationMs}ms` : "—"}
          </p>
          <p>
            <strong>Run ID:</strong> {event.runId ?? "—"}
          </p>
          <p>
            <strong>Workflow ID:</strong> {event.workflowId ?? "—"}
          </p>
        </div>
      </aside>
    </div>
  );
}
