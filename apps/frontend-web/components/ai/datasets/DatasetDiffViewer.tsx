"use client";

import type { DatasetVersionDiffResult } from "@/lib/dataset-types";

function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value, null, 2);
}

export type DatasetDiffViewerProps = {
  diff: DatasetVersionDiffResult | undefined;
  isLoading?: boolean;
};

export function DatasetDiffViewer({ diff, isLoading = false }: DatasetDiffViewerProps) {
  if (isLoading) {
    return <p className="dataset-empty-hint">Loading diff…</p>;
  }

  if (!diff) {
    return <p className="dataset-empty-hint">Select two versions to compare.</p>;
  }

  const added = diff.details.filter((entry) => entry.type === "added");
  const removed = diff.details.filter((entry) => entry.type === "removed");
  const changed = diff.details.filter((entry) => entry.type === "changed");
  const hasChanges = added.length > 0 || removed.length > 0 || changed.length > 0;

  return (
    <div className="dataset-version-diff">
      <header className="dataset-version-diff-header">
        <h3>
          Diff v{diff.fromVersion} → v{diff.toVersion}
        </h3>
        <p className="dashboard-cell-muted">
          +{diff.addedRecords} added · -{diff.removedRecords} removed · ~{diff.changedRecords}{" "}
          changed
        </p>
        {!hasChanges ? <p className="dashboard-cell-muted">No differences.</p> : null}
      </header>

      <div className="dataset-version-diff-columns">
        <section>
          <h4>Removed ({removed.length})</h4>
          <ul className="dataset-version-diff-list">
            {removed.map((entry, index) => (
              <li key={`removed-${entry.recordId ?? index}`} className="dataset-diff-removed">
                <pre>{formatValue(entry.input)}</pre>
              </li>
            ))}
            {!removed.length ? <li className="dashboard-cell-muted">—</li> : null}
          </ul>
        </section>

        <section>
          <h4>Changed ({changed.length})</h4>
          <ul className="dataset-version-diff-list">
            {changed.map((entry, index) => (
              <li key={`changed-${entry.recordId ?? index}`} className="dataset-diff-changed">
                <strong>Before</strong>
                <pre>{formatValue(entry.previousInput)}</pre>
                <strong>After</strong>
                <pre>{formatValue(entry.input)}</pre>
              </li>
            ))}
            {!changed.length ? <li className="dashboard-cell-muted">—</li> : null}
          </ul>
        </section>

        <section>
          <h4>Added ({added.length})</h4>
          <ul className="dataset-version-diff-list">
            {added.map((entry, index) => (
              <li key={`added-${entry.recordId ?? index}`} className="dataset-diff-added">
                <pre>{formatValue(entry.input)}</pre>
              </li>
            ))}
            {!added.length ? <li className="dashboard-cell-muted">—</li> : null}
          </ul>
        </section>
      </div>
    </div>
  );
}
