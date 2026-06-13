"use client";

import { Badge } from "@/components/ui/badge";
import type { WorkflowLiveEvent } from "@/lib/automation-types";
import { cn } from "@/lib/cn";

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    month: "short",
    day: "numeric",
  });
}

function eventTypeLabel(eventType: WorkflowLiveEvent["eventType"]): string {
  return eventType.replaceAll("_", " ").toLowerCase();
}

function statusClass(status: WorkflowLiveEvent["status"]): string {
  if (status === "SUCCESS") {
    return "automation-status-pill automation-status-pill-success";
  }
  if (status === "FAILED") {
    return "automation-status-pill automation-status-pill-failed";
  }
  return "automation-status-pill";
}

export type WorkflowEventCardProps = {
  event: WorkflowLiveEvent;
  expanded?: boolean;
  onToggle?: () => void;
  onSelect?: () => void;
};

export function WorkflowEventCard({
  event,
  expanded = false,
  onToggle,
  onSelect,
}: WorkflowEventCardProps) {
  return (
    <article className={cn("automation-event-card", expanded && "automation-event-card-expanded")}>
      <button type="button" className="automation-event-card-button" onClick={onSelect ?? onToggle}>
        <div className="automation-event-card-header">
          <time className="automation-event-card-time">{formatTimestamp(event.timestamp)}</time>
          {event.status ? <span className={statusClass(event.status)}>{event.status}</span> : null}
        </div>
        <div className="automation-event-card-body">
          <strong>{event.workflowName ?? "Workflow"}</strong>
          <Badge variant="secondary">{eventTypeLabel(event.eventType)}</Badge>
        </div>
        {event.durationMs != null ? (
          <p className="automation-event-card-meta">Duration: {event.durationMs}ms</p>
        ) : null}
        {expanded ? (
          <pre className="automation-event-card-preview">{JSON.stringify(event.payload, null, 2)}</pre>
        ) : null}
      </button>
    </article>
  );
}
