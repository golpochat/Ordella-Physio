"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { IfHasPermission } from "@/lib/auth/withPermission";
import type { WorkflowVersionRecord } from "@/lib/automation-types";

export type WorkflowVersionActionsProps = {
  versions: WorkflowVersionRecord[];
  compareFrom: number | null;
  compareTo: number | null;
  onCompareFromChange: (versionNumber: number | null) => void;
  onCompareToChange: (versionNumber: number | null) => void;
  onRollback: (versionNumber: number) => Promise<void>;
  onUpdateLabel: (versionNumber: number, label: string | null) => Promise<void>;
  isRollingBack?: boolean;
};

export function WorkflowVersionActions({
  versions,
  compareFrom,
  compareTo,
  onCompareFromChange,
  onCompareToChange,
  onRollback,
  onUpdateLabel,
  isRollingBack = false,
}: WorkflowVersionActionsProps) {
  const [labelVersion, setLabelVersion] = useState<number | "">("");
  const [labelDraft, setLabelDraft] = useState("");
  const [rollbackVersion, setRollbackVersion] = useState<number | "">("");

  async function handleSaveLabel() {
    if (!labelVersion) {
      toast.error("Select a version to label.");
      return;
    }

    try {
      await onUpdateLabel(Number(labelVersion), labelDraft.trim() || null);
      toast.success("Version label updated.");
      setLabelDraft("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update label.";
      toast.error(message);
    }
  }

  async function handleRollback() {
    if (!rollbackVersion) {
      toast.error("Select a version to rollback.");
      return;
    }

    if (!window.confirm(`Rollback workflow to v${rollbackVersion}? This creates a new version entry.`)) {
      return;
    }

    try {
      await onRollback(Number(rollbackVersion));
      toast.success(`Rolled back to v${rollbackVersion}.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Rollback failed.";
      toast.error(message);
    }
  }

  return (
    <div className="automation-version-actions">
      <div className="automation-version-actions-group">
        <h3>Compare versions</h3>
        <div className="automation-version-actions-row">
          <div className="tenant-create-form-field">
            <Label htmlFor="compare-from">From</Label>
            <select
              id="compare-from"
              className="automation-select"
              value={compareFrom ?? ""}
              onChange={(event) =>
                onCompareFromChange(event.target.value ? Number(event.target.value) : null)
              }
            >
              <option value="">Select version</option>
              {versions.map((version) => (
                <option key={`from-${version.id}`} value={version.versionNumber}>
                  v{version.versionNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="tenant-create-form-field">
            <Label htmlFor="compare-to">To</Label>
            <select
              id="compare-to"
              className="automation-select"
              value={compareTo ?? ""}
              onChange={(event) =>
                onCompareToChange(event.target.value ? Number(event.target.value) : null)
              }
            >
              <option value="">Select version</option>
              {versions.map((version) => (
                <option key={`to-${version.id}`} value={version.versionNumber}>
                  v{version.versionNumber}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <IfHasPermission permission="automation.versioning">
        <div className="automation-version-actions-group">
          <h3>Version label</h3>
          <div className="automation-version-actions-row">
            <div className="tenant-create-form-field">
              <Label htmlFor="label-version">Version</Label>
              <select
                id="label-version"
                className="automation-select"
                value={labelVersion}
                onChange={(event) =>
                  setLabelVersion(event.target.value ? Number(event.target.value) : "")
                }
              >
                <option value="">Select version</option>
                {versions.map((version) => (
                  <option key={`label-${version.id}`} value={version.versionNumber}>
                    v{version.versionNumber}
                  </option>
                ))}
              </select>
            </div>
            <div className="tenant-create-form-field">
              <Label htmlFor="version-label">Label</Label>
              <Input
                id="version-label"
                value={labelDraft}
                placeholder="Stable, Experiment, Rollback Point"
                onChange={(event) => setLabelDraft(event.target.value)}
              />
            </div>
            <Button type="button" variant="secondary" onClick={() => void handleSaveLabel()}>
              Save label
            </Button>
          </div>
        </div>

        <div className="automation-version-actions-group">
          <h3>Rollback</h3>
          <div className="automation-version-actions-row">
            <div className="tenant-create-form-field">
              <Label htmlFor="rollback-version">Restore version</Label>
              <select
                id="rollback-version"
                className="automation-select"
                value={rollbackVersion}
                onChange={(event) =>
                  setRollbackVersion(event.target.value ? Number(event.target.value) : "")
                }
              >
                <option value="">Select version</option>
                {versions.map((version) => (
                  <option key={`rollback-${version.id}`} value={version.versionNumber}>
                    v{version.versionNumber}
                    {version.label ? ` — ${version.label}` : ""}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="button"
              variant="secondary"
              disabled={isRollingBack}
              onClick={() => void handleRollback()}
            >
              {isRollingBack ? "Rolling back…" : "Rollback"}
            </Button>
          </div>
        </div>
      </IfHasPermission>
    </div>
  );
}
