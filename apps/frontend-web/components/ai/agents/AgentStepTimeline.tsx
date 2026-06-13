"use client";

import { Badge } from "@/components/ui/badge";
import type { AgentRunStep } from "@/lib/agent-types";

export type AgentStepTimelineProps = {
  steps: AgentRunStep[];
};

export function AgentStepTimeline({ steps }: AgentStepTimelineProps) {
  if (!steps.length) return <p className="ai-observability-muted">No steps recorded yet.</p>;

  return (
    <div className="ai-agents-timeline">
      <h4>Step timeline</h4>
      {steps.map((step) => (
        <div key={step.stepNumber} className="ai-agents-timeline-step">
          <div className="ai-agents-timeline-header">
            <strong>Step {step.stepNumber}</strong>
            {step.toolUsed ? <Badge variant="secondary">{step.toolUsed}</Badge> : <Badge variant="outline">Reasoning</Badge>}
          </div>
          <p>{step.thought}</p>
          {step.toolInput ? (
            <pre className="ai-observability-metadata">Input: {JSON.stringify(step.toolInput, null, 2)}</pre>
          ) : null}
          {step.toolOutput != null ? (
            <pre className="ai-observability-metadata">Output: {JSON.stringify(step.toolOutput, null, 2)}</pre>
          ) : null}
        </div>
      ))}
    </div>
  );
}
