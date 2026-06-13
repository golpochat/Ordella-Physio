"use client";

import { Button } from "@/components/ui/button";

export type DriftMitigationPanelProps = {
  canManage?: boolean;
  isBusy?: boolean;
  onRetrain?: () => void;
  onRollback?: () => void;
  onReduceRollout?: () => void;
};

export function DriftMitigationPanel({
  canManage = false,
  isBusy = false,
  onRetrain,
  onRollback,
  onReduceRollout,
}: DriftMitigationPanelProps) {
  if (!canManage) {
    return null;
  }

  return (
    <section className="training-drift-mitigation">
      <h3>Mitigation actions</h3>
      <p className="dashboard-cell-muted">
        Critical drift triggers rollback; high drift reduces rollout; medium drift schedules retraining.
      </p>
      <div className="automation-builder-actions">
        <Button type="button" disabled={isBusy} onClick={onRetrain}>
          Trigger retraining
        </Button>
        <Button type="button" variant="secondary" disabled={isBusy} onClick={onReduceRollout}>
          Reduce rollout to 10%
        </Button>
        <Button type="button" variant="secondary" disabled={isBusy} onClick={onRollback}>
          Rollback model
        </Button>
      </div>
    </section>
  );
}
