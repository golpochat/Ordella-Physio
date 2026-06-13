"use client";

import type { WorkflowLiveEvent } from "@/lib/automation-types";
import { cn } from "@/lib/cn";

const TIMELINE_ORDER = [
  "TRIGGERED",
  "CONDITION_PASSED",
  "CONDITION_FAILED",
  "ACTION_EXECUTED",
  "ACTION_FAILED",
  "WORKFLOW_COMPLETED",
] as const;

function labelFor(eventType: WorkflowLiveEvent["eventType"]): string {
  return eventType.replaceAll("_", " ").toLowerCase();
}

export type WorkflowEventTimelineProps = {
  events: WorkflowLiveEvent[];
  runId?: string | null;
};

export function WorkflowEventTimeline({ events, runId }: WorkflowEventTimelineProps) {
  const scopedEvents = runId
    ? events.filter((event) => event.runId === runId)
    : events;

  const sortedEvents = [...scopedEvents].sort((left, right) => {
    const leftIndex = TIMELINE_ORDER.indexOf(left.eventType);
    const rightIndex = TIMELINE_ORDER.indexOf(right.eventType);
    if (leftIndex !== rightIndex) {
      return leftIndex - rightIndex;
    }
    return new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime();
  });

  if (!sortedEvents.length) {
    return <p className="automation-empty-hint">Select an event to view its run timeline.</p>;
  }

  return (
    <ol className="automation-event-timeline">
      {sortedEvents.map((event) => (
        <li
          key={event.id}
          className={cn(
            "automation-event-timeline-item",
            event.status === "FAILED" && "automation-event-timeline-item-failed",
            event.status === "SUCCESS" && "automation-event-timeline-item-success",
          )}
        >
          <span className="automation-event-timeline-dot" aria-hidden="true" />
          <div>
            <strong>{labelFor(event.eventType)}</strong>
            <p className="automation-graph-muted">
              {event.durationMs != null ? `${event.durationMs}ms` : new Date(event.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
