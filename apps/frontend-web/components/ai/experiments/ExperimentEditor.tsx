"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AbExperimentRecord, ExperimentVariant } from "@/lib/feature-flag-types";

export type ExperimentEditorProps = {
  experiment?: AbExperimentRecord | null;
  isSaving?: boolean;
  onSave?: (payload: {
    name: string;
    description?: string;
    variants?: ExperimentVariant[];
    targetAudience?: Record<string, unknown>;
    metricsTracked?: string[];
    modelKey?: string;
  }) => void;
  onStart?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
};

const METRIC_OPTIONS = ["conversion", "engagement", "retention", "latency", "error_rate"];

export function ExperimentEditor({
  experiment,
  isSaving = false,
  onSave,
  onStart,
  onPause,
  onComplete,
}: ExperimentEditorProps) {
  const [name, setName] = useState(experiment?.name ?? "");
  const [description, setDescription] = useState(experiment?.description ?? "");
  const [modelKey, setModelKey] = useState(experiment?.modelKey ?? "");
  const [variantsJson, setVariantsJson] = useState(
    JSON.stringify(experiment?.variants ?? [{ key: "A", weight: 50, modelId: "" }, { key: "B", weight: 50, modelId: "" }], null, 2),
  );
  const [metrics, setMetrics] = useState<string[]>(experiment?.metricsTracked ?? ["conversion", "engagement"]);

  function toggleMetric(metric: string) {
    setMetrics((current) =>
      current.includes(metric) ? current.filter((m) => m !== metric) : [...current, metric],
    );
  }

  function handleSave() {
    if (!onSave) return;
    onSave({
      name: name.trim(),
      description: description.trim(),
      variants: JSON.parse(variantsJson) as ExperimentVariant[],
      metricsTracked: metrics,
      modelKey: modelKey.trim() || undefined,
      targetAudience: experiment?.targetAudience ?? {},
    });
  }

  return (
    <div className="dataset-create-dialog">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Experiment name" />
      <textarea className="automation-select" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Description" />
      <Input value={modelKey} onChange={(e) => setModelKey(e.target.value)} placeholder="Model key (for model A/B)" />
      <textarea className="automation-select" value={variantsJson} onChange={(e) => setVariantsJson(e.target.value)} rows={8} />
      <div className="training-form-grid">
        {METRIC_OPTIONS.map((metric) => (
          <label key={metric} className="automation-checkbox-label">
            <input type="checkbox" checked={metrics.includes(metric)} onChange={() => toggleMetric(metric)} />
            {metric}
          </label>
        ))}
      </div>
      <div className="automation-builder-actions">
        {!experiment && onSave ? (
          <Button type="button" disabled={isSaving || !name.trim()} onClick={handleSave}>Create experiment</Button>
        ) : experiment ? (
          <>
            {experiment.status === "DRAFT" || experiment.status === "PAUSED" ? (
              <Button type="button" onClick={onStart}>Start</Button>
            ) : null}
            {experiment.status === "RUNNING" ? (
              <Button type="button" variant="secondary" onClick={onPause}>Pause</Button>
            ) : null}
            {experiment.status === "RUNNING" || experiment.status === "PAUSED" ? (
              <Button type="button" variant="secondary" onClick={onComplete}>Complete</Button>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
