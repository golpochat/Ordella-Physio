"use client";

import { Badge } from "@/components/ui/badge";
import type { ExperimentComparisonResult } from "@/lib/training-types";

export type ExperimentComparisonTableProps = {
  comparison?: ExperimentComparisonResult;
  isLoading?: boolean;
};

export function ExperimentComparisonTable({
  comparison,
  isLoading = false,
}: ExperimentComparisonTableProps) {
  if (isLoading) {
    return <p className="dataset-empty-hint">Loading comparison…</p>;
  }

  if (!comparison?.comparison.length) {
    return <p className="dataset-empty-hint">Select experiments to compare.</p>;
  }

  return (
    <div className="training-comparison-table">
      <table>
        <thead>
          <tr>
            <th>Experiment</th>
            <th>Status</th>
            <th>Hyperparameters</th>
            <th>Metrics</th>
            <th>Best</th>
          </tr>
        </thead>
        <tbody>
          {comparison.comparison.map((entry) => (
            <tr key={entry.id} className={entry.isBest ? "training-comparison-best" : undefined}>
              <td>
                <strong>{entry.experimentName}</strong>
                {entry.label ? <div className="dashboard-cell-muted">{entry.label}</div> : null}
              </td>
              <td>
                <Badge variant="secondary">{entry.status}</Badge>
              </td>
              <td>
                <pre className="dataset-json-preview">
                  {JSON.stringify(entry.hyperparameters, null, 2)}
                </pre>
              </td>
              <td>
                <pre className="dataset-json-preview">{JSON.stringify(entry.metrics, null, 2)}</pre>
              </td>
              <td>{entry.isBest ? "Yes" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
