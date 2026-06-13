"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FeatureFlagRecord, FlagVariant } from "@/lib/feature-flag-types";

export type FeatureFlagEditorProps = {
  flag?: FeatureFlagRecord | null;
  isSaving?: boolean;
  onSave: (payload: {
    key: string;
    type: "BOOLEAN" | "PERCENTAGE" | "VARIANT";
    variants?: FlagVariant[];
    rollout?: Record<string, unknown>;
    isActive?: boolean;
  }) => void;
  onPreview?: (key: string) => void;
};

export function FeatureFlagEditor({ flag, isSaving = false, onSave, onPreview }: FeatureFlagEditorProps) {
  const [key, setKey] = useState(flag?.key ?? "");
  const [type, setType] = useState<"BOOLEAN" | "PERCENTAGE" | "VARIANT">(flag?.type ?? "BOOLEAN");
  const [percentage, setPercentage] = useState(String(flag?.rollout.percentage ?? 50));
  const [enabled, setEnabled] = useState(Boolean(flag?.rollout.enabled ?? true));
  const [variantsJson, setVariantsJson] = useState(
    JSON.stringify(flag?.variants ?? [{ key: "A", weight: 50 }, { key: "B", weight: 50 }], null, 2),
  );
  const [isActive, setIsActive] = useState(flag?.isActive ?? true);

  const rollout = useMemo(() => {
    if (type === "PERCENTAGE") return { percentage: Number(percentage) };
    if (type === "BOOLEAN") return { enabled };
    return {};
  }, [type, percentage, enabled]);

  function handleSave() {
    let variants: FlagVariant[] | undefined;
    if (type === "VARIANT") {
      variants = JSON.parse(variantsJson) as FlagVariant[];
    }
    onSave({ key: key.trim(), type, variants, rollout, isActive });
  }

  return (
    <div className="dataset-create-dialog">
      <Input value={key} onChange={(e) => setKey(e.target.value)} placeholder="flag.key" disabled={Boolean(flag)} />
      <select className="automation-select" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
        <option value="BOOLEAN">Boolean</option>
        <option value="PERCENTAGE">Percentage rollout</option>
        <option value="VARIANT">Multivariate</option>
      </select>
      {type === "PERCENTAGE" ? (
        <Input value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="Rollout %" />
      ) : null}
      {type === "BOOLEAN" ? (
        <label className="automation-checkbox-label">
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          Enabled by default
        </label>
      ) : null}
      {type === "VARIANT" ? (
        <textarea className="automation-select" value={variantsJson} onChange={(e) => setVariantsJson(e.target.value)} rows={6} />
      ) : null}
      <label className="automation-checkbox-label">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        Active
      </label>
      <div className="automation-builder-actions">
        <Button type="button" disabled={isSaving || !key.trim()} onClick={handleSave}>
          {isSaving ? "Saving…" : flag ? "Update flag" : "Create flag"}
        </Button>
        {onPreview ? (
          <Button type="button" variant="secondary" onClick={() => onPreview(key)}>
            Preview assignment
          </Button>
        ) : null}
      </div>
    </div>
  );
}
