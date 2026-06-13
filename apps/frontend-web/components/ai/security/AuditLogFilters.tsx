"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AuditAction } from "@/lib/security-types";

export type AuditLogFiltersProps = {
  onFilter: (filters: { action?: AuditAction; modelId?: string; piiDetected?: boolean }) => void;
};

export function AuditLogFilters({ onFilter }: AuditLogFiltersProps) {
  const [action, setAction] = useState<AuditAction | "">("");
  const [modelId, setModelId] = useState("");
  const [piiOnly, setPiiOnly] = useState(false);

  return (
    <div className="ai-security-filters form-grid">
      <div>
        <label className="automation-form-section-title" htmlFor="audit-action-filter">Action</label>
        <select id="audit-action-filter" value={action} onChange={(e) => setAction(e.target.value as AuditAction | "")}>
          <option value="">All</option>
          {(["INFERENCE", "TRAINING", "DEPLOYMENT", "DATASET", "MODEL_ACCESS"] as AuditAction[]).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="automation-form-section-title" htmlFor="audit-model-filter">Model ID</label>
        <input id="audit-model-filter" className="input" value={modelId} onChange={(e) => setModelId(e.target.value)} placeholder="gpt-4o" />
      </div>
      <label className="ai-gateway-scope-option">
        <input type="checkbox" checked={piiOnly} onChange={(e) => setPiiOnly(e.target.checked)} />
        <span>PII detected only</span>
      </label>
      <Button
        type="button"
        onClick={() =>
          onFilter({
            action: action || undefined,
            modelId: modelId || undefined,
            piiDetected: piiOnly || undefined,
          })
        }
      >
        Apply filters
      </Button>
    </div>
  );
}
