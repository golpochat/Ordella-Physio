"use client";

import type { WorkflowVersionDiffResult } from "@/lib/automation-types";

function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value, null, 2);
}

export type WorkflowVersionDiffProps = {
  diff: WorkflowVersionDiffResult | undefined;
  isLoading?: boolean;
};

export function WorkflowVersionDiff({ diff, isLoading = false }: WorkflowVersionDiffProps) {
  if (isLoading) {
    return <p className="automation-empty-hint">Loading diff…</p>;
  }

  if (!diff) {
    return <p className="automation-empty-hint">Select two versions to compare.</p>;
  }

  const hasChanges =
    diff.added.length > 0 || diff.removed.length > 0 || diff.changed.length > 0;

  return (
    <div className="automation-version-diff">
      <header className="automation-version-diff-header">
        <h3>
          Diff v{diff.fromVersion} → v{diff.toVersion}
        </h3>
        {!hasChanges ? <p className="dashboard-cell-muted">No differences.</p> : null}
      </header>

      <div className="automation-version-diff-columns">
        <section>
          <h4>Removed</h4>
          <ul className="automation-version-diff-list">
            {diff.removed.map((entry) => (
              <li key={`removed-${entry.path}`} className="automation-diff-removed">
                <strong>{entry.path}</strong>
                <pre>{formatValue(entry.oldValue)}</pre>
              </li>
            ))}
            {!diff.removed.length ? <li className="dashboard-cell-muted">—</li> : null}
          </ul>
        </section>

        <section>
          <h4>Changed</h4>
          <ul className="automation-version-diff-list">
            {diff.changed.map((entry) => (
              <li key={`changed-${entry.path}`} className="automation-diff-changed">
                <strong>{entry.path}</strong>
                <pre>{formatValue(entry.oldValue)}</pre>
                <pre>{formatValue(entry.newValue)}</pre>
              </li>
            ))}
            {!diff.changed.length ? <li className="dashboard-cell-muted">—</li> : null}
          </ul>
        </section>

        <section>
          <h4>Added</h4>
          <ul className="automation-version-diff-list">
            {diff.added.map((entry) => (
              <li key={`added-${entry.path}`} className="automation-diff-added">
                <strong>{entry.path}</strong>
                <pre>{formatValue(entry.newValue)}</pre>
              </li>
            ))}
            {!diff.added.length ? <li className="dashboard-cell-muted">—</li> : null}
          </ul>
        </section>
      </div>
    </div>
  );
}
