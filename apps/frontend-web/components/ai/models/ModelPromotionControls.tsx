"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EvaluationReport, ModelPromotionStatus } from "@/lib/training-types";

export type ModelPromotionControlsProps = {
  promotionStatus: ModelPromotionStatus | null;
  evaluationReport?: EvaluationReport | null;
  canManage?: boolean;
  isBusy?: boolean;
  rolloutValue: number;
  onRolloutChange: (value: number) => void;
  onPromoteStaging?: () => void;
  onPromoteProduction?: () => void;
  onDeprecate?: () => void;
  onApplyRollout?: () => void;
  onAutoAdjust?: () => void;
};

export function ModelPromotionControls({
  promotionStatus,
  evaluationReport,
  canManage = false,
  isBusy = false,
  rolloutValue,
  onRolloutChange,
  onPromoteStaging,
  onPromoteProduction,
  onDeprecate,
  onApplyRollout,
  onAutoAdjust,
}: ModelPromotionControlsProps) {
  const stage = promotionStatus?.promotion?.stage ?? promotionStatus?.canary.stage ?? "STAGING";
  const hasSafetyWarning =
    evaluationReport?.scorecard.safety === "red" || evaluationReport?.scorecard.safety === "yellow";
  const hasBiasWarning =
    evaluationReport?.scorecard.bias === "red" || evaluationReport?.scorecard.bias === "yellow";

  return (
    <section className="training-promotion-controls">
      <header className="training-promotion-header">
        <div>
          <h3>Promotion workflow</h3>
          <p className="dashboard-cell-muted">Stage, rollout percentage, and canary controls.</p>
        </div>
        <Badge variant={stage === "PRODUCTION" ? "default" : "secondary"}>{stage}</Badge>
      </header>

      {hasSafetyWarning || hasBiasWarning ? (
        <div className="training-promotion-warnings">
          {hasSafetyWarning ? <p>Safety score requires review before full production rollout.</p> : null}
          {hasBiasWarning ? <p>Bias metrics elevated — consider retraining before promotion.</p> : null}
        </div>
      ) : null}

      <div className="training-promotion-rollout">
        <label className="automation-form-section-title" htmlFor="rollout-slider">
          Rollout percentage: {rolloutValue}%
        </label>
        <input
          id="rollout-slider"
          className="training-rollout-slider"
          type="range"
          min={0}
          max={100}
          step={5}
          value={rolloutValue}
          disabled={!canManage || isBusy}
          onChange={(event) => onRolloutChange(Number(event.target.value))}
        />
      </div>

      {canManage ? (
        <div className="automation-builder-actions">
          <Button type="button" variant="secondary" disabled={isBusy} onClick={onPromoteStaging}>
            Promote to staging
          </Button>
          <Button type="button" disabled={isBusy} onClick={onPromoteProduction}>
            Start canary (production)
          </Button>
          <Button type="button" variant="secondary" disabled={isBusy} onClick={onApplyRollout}>
            Apply rollout
          </Button>
          <Button type="button" variant="secondary" disabled={isBusy} onClick={onAutoAdjust}>
            Auto-adjust canary
          </Button>
          <Button type="button" variant="secondary" disabled={isBusy} onClick={onDeprecate}>
            Deprecate
          </Button>
        </div>
      ) : null}
    </section>
  );
}
