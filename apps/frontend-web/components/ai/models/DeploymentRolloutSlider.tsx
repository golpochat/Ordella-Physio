"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type DeploymentRolloutSliderProps = {
  region: string;
  value: number;
  disabled?: boolean;
  onApply: (value: number) => void;
};

export function DeploymentRolloutSlider({ region, value, disabled = false, onApply }: DeploymentRolloutSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  return (
    <div className="deployment-rollout-slider">
      <label className="dashboard-cell-muted" htmlFor={`rollout-${region}`}>
        {localValue}%
      </label>
      <input
        id={`rollout-${region}`}
        type="range"
        min={0}
        max={100}
        step={5}
        value={localValue}
        disabled={disabled}
        onChange={(event) => setLocalValue(Number(event.target.value))}
      />
      <Button type="button" variant="secondary" disabled={disabled} onClick={() => onApply(localValue)}>
        Apply
      </Button>
    </div>
  );
}
