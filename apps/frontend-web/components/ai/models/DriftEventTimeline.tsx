"use client";

import { useState } from "react";
import { DriftSeverityBadge } from "@/components/ai/models/DriftSeverityBadge";
import type { DriftEventRecord } from "@/lib/training-types";

export type DriftEventTimelineProps = {
  events: DriftEventRecord[];
  onResolve?: (eventId: string) => void;
  canManage?: boolean;
  isResolving?: boolean;
};

export function DriftEventTimeline({
  events,
  onResolve,
  canManage = false,
  isResolving = false,
}: DriftEventTimelineProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = events.find((event) => event.id === selectedId) ?? null;

  if (!events.length) {
    return <p className="dashboard-cell-muted">No drift events recorded.</p>;
  }

  return (
    <section className="training-drift-timeline">
      <h3>Drift event timeline</h3>
      <ul className="training-drift-timeline-list">
        {events.map((event) => (
          <li key={event.id}>
            <button
              type="button"
              className={`training-drift-timeline-item ${selectedId === event.id ? "is-selected" : ""}`}
              onClick={() => setSelectedId(event.id)}
            >
              <div>
                <strong>{event.driftType}</strong>
                <span className="dashboard-cell-muted">
                  {new Date(event.detectedAt).toLocaleString()}
                </span>
              </div>
              <DriftSeverityBadge severity={event.severity} />
            </button>
          </li>
        ))}
      </ul>

      {selected ? (
        <div className="training-drift-event-details">
          <h4>Event details</h4>
          <p>{selected.summary}</p>
          <pre className="dataset-json-preview">{JSON.stringify(selected.metrics, null, 2)}</pre>
          {canManage && !selected.resolvedAt ? (
            <button
              type="button"
              className="automation-link-button"
              disabled={isResolving}
              onClick={() => onResolve?.(selected.id)}
            >
              Mark as resolved
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
