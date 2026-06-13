"use client";

import { Badge } from "@/components/ui/badge";
import type { WorkflowDraft } from "@/lib/automation-types";

function triggerLabel(trigger: WorkflowDraft["trigger"]): string {
  if (trigger.type === "EVENT") {
    return trigger.eventKey?.replaceAll("_", " ").toLowerCase() ?? "event";
  }
  if (trigger.type === "SCHEDULE") {
    return `schedule (${trigger.cron ?? "cron"})`;
  }
  return `${trigger.metric?.replaceAll("_", " ").toLowerCase() ?? "metric"} ≥ ${trigger.threshold ?? 0}`;
}

export type WorkflowGraphViewProps = {
  draft: WorkflowDraft;
};

export function WorkflowGraphView({ draft }: WorkflowGraphViewProps) {
  return (
    <div className="automation-graph">
      <div className="automation-graph-node automation-graph-node-trigger">
        <span className="automation-graph-node-label">Trigger</span>
        <strong>{triggerLabel(draft.trigger)}</strong>
        <Badge variant="secondary">{draft.trigger.type}</Badge>
      </div>

      <div className="automation-graph-arrow" aria-hidden="true">
        ↓
      </div>

      <div className="automation-graph-node automation-graph-node-conditions">
        <span className="automation-graph-node-label">Conditions</span>
        {draft.conditions.length === 0 ? (
          <p className="automation-graph-muted">Always continue</p>
        ) : (
          <ul className="automation-graph-list">
            {draft.conditions.map((condition, index) => (
              <li key={`graph-condition-${index}`}>
                {index > 0 ? <span className="automation-graph-join">{draft.conditions[index - 1].joinWith ?? "AND"} </span> : null}
                {condition.field} {condition.operator.toLowerCase().replaceAll("_", " ")} {condition.value}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="automation-graph-arrow" aria-hidden="true">
        ↓
      </div>

      <div className="automation-graph-actions">
        {draft.actions.map((action, index) => (
          <div key={`graph-action-${index}`} className="automation-graph-node automation-graph-node-action">
            <span className="automation-graph-node-label">Action {index + 1}</span>
            <strong>{action.type.replaceAll("_", " ").toLowerCase()}</strong>
            <p className="automation-graph-muted">
              {Object.entries(action.config)
                .map(([key, value]) => `${key}: ${value}`)
                .join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
