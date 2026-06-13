"use client";

import { Badge } from "@/components/ui/badge";
import type { PipelineView } from "@/lib/observability-types";

export type PipelineViewProps = {
  pipeline?: PipelineView;
};

export function PipelineViewPanel({ pipeline }: PipelineViewProps) {
  if (!pipeline) return <p className="ai-observability-muted">Loading pipeline view…</p>;

  return (
    <div className="ai-observability-pipeline">
      <div className="ai-observability-pipeline-flow">
        {pipeline.flow.map((stage) => (
          <div key={stage.stage} className="ai-observability-pipeline-stage">
            <div className="ai-observability-pipeline-node">
              <strong>{stage.label}</strong>
              <Badge variant={stage.status === "active" ? "secondary" : "outline"}>{stage.status}</Badge>
              <span>{stage.events} events</span>
            </div>
            {stage.next ? <div className="ai-observability-pipeline-arrow">→</div> : null}
          </div>
        ))}
      </div>
      <p className="ai-observability-muted">
        {pipeline.endToEndTraces.length} end-to-end traces in the last 7 days (dataset → training → deployment → inference).
      </p>
    </div>
  );
}
