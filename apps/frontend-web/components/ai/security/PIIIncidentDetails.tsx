"use client";

import { Button } from "@/components/ui/button";
import type { PIIIncidentRecord } from "@/lib/security-types";

export type PIIIncidentDetailsProps = {
  incident: PIIIncidentRecord | null;
  onResolve?: (id: string) => void;
};

export function PIIIncidentDetails({ incident, onResolve }: PIIIncidentDetailsProps) {
  if (!incident) return null;

  return (
    <div className="ai-security-incident-details">
      <h3>PII incident details</h3>
      <p><strong>Type:</strong> {incident.piiType}</p>
      <p><strong>Model:</strong> {incident.modelId ?? "unknown"}</p>
      <p><strong>Detected:</strong> {new Date(incident.detectedAt).toLocaleString()}</p>
      <p><strong>Original hash:</strong> <code>{incident.originalText}</code></p>
      <div>
        <strong>Redacted preview</strong>
        <pre className="ai-security-metadata">{incident.redactedText}</pre>
      </div>
      {!incident.resolvedAt && onResolve ? (
        <Button type="button" onClick={() => onResolve(incident.id)}>Mark resolved</Button>
      ) : null}
    </div>
  );
}
