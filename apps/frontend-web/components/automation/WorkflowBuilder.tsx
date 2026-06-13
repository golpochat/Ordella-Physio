"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { WorkflowActionForm } from "@/components/automation/WorkflowActionForm";
import { WorkflowConditionForm } from "@/components/automation/WorkflowConditionForm";
import { WorkflowGraphView } from "@/components/automation/WorkflowGraphView";
import { WorkflowTemplatePicker } from "@/components/automation/WorkflowTemplatePicker";
import { WorkflowTriggerForm } from "@/components/automation/WorkflowTriggerForm";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import {
  useCreateAutomationWorkflow,
  useUpdateAutomationWorkflow,
} from "@/hooks/useAutomationPortal";
import type { WorkflowDraft } from "@/lib/automation-types";
import { EMPTY_WORKFLOW_DRAFT } from "@/lib/automation-types";

export type WorkflowBuilderProps = {
  mode: "create" | "edit";
  workflowId?: string;
  initialDraft?: WorkflowDraft;
};

function validateDraft(draft: WorkflowDraft): string | null {
  if (!draft.name.trim()) {
    return "Workflow name is required.";
  }
  if (!draft.actions.length) {
    return "At least one action is required.";
  }
  return null;
}

export function WorkflowBuilder({ mode, workflowId, initialDraft }: WorkflowBuilderProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<WorkflowDraft>(initialDraft ?? EMPTY_WORKFLOW_DRAFT);
  const [versionLabel, setVersionLabel] = useState("");
  const createWorkflow = useCreateAutomationWorkflow();
  const updateWorkflow = useUpdateAutomationWorkflow(workflowId ?? "");
  const isSaving = createWorkflow.isPending || updateWorkflow.isPending;

  const definitionPreview = useMemo(() => JSON.stringify(draft, null, 2), [draft]);

  async function handleSave() {
    const validationError = validateDraft(draft);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      if (mode === "create") {
        const created = await createWorkflow.mutateAsync({
          ...draft,
          versionLabel: versionLabel.trim() || undefined,
        } as WorkflowDraft & { versionLabel?: string });
        toast.success("Workflow created.");
        router.push(`/clinic/automation/workflows/${created.id}/edit`);
        return;
      }

      await updateWorkflow.mutateAsync({
        ...draft,
        versionLabel: versionLabel.trim() || undefined,
      } as WorkflowDraft & { versionLabel?: string });
      toast.success("Workflow saved.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save workflow.";
      toast.error(message);
    }
  }

  return (
    <div className="automation-builder-layout">
      <div className="automation-builder-main">
        {mode === "create" ? <WorkflowTemplatePicker onSelect={(template) => setDraft(template)} /> : null}

        <Card>
          <CardHeader>
            <CardTitle>{mode === "create" ? "Create workflow" : "Edit workflow"}</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="automation-warning-banner" role="status">
              Workflows can send messages and create tasks automatically. Use dry-run mode to test without side effects.
            </div>

            <form
              className="tenant-create-form"
              onSubmit={(event) => {
                event.preventDefault();
                void handleSave();
              }}
            >
              <div className="automation-form-section">
                <h3 className="automation-form-section-title">Basic info</h3>
                <div className="tenant-create-form-field">
                  <Label htmlFor="workflow-name">Name</Label>
                  <Input
                    id="workflow-name"
                    value={draft.name}
                    onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                  />
                </div>
                <div className="tenant-create-form-field">
                  <Label htmlFor="workflow-description">Description</Label>
                  <Textarea
                    id="workflow-description"
                    value={draft.description}
                    onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
                  />
                </div>
                {mode === "edit" ? (
                  <div className="tenant-create-form-field">
                    <Label htmlFor="workflow-version-label">Version label (optional)</Label>
                    <Input
                      id="workflow-version-label"
                      value={versionLabel}
                      placeholder="Stable, Experiment, Rollback Point"
                      onChange={(event) => setVersionLabel(event.target.value)}
                    />
                  </div>
                ) : null}
                <div className="automation-toggle-row">
                  <label className="automation-checkbox-label">
                    <input
                      type="checkbox"
                      checked={draft.isActive}
                      onChange={(event) => setDraft((current) => ({ ...current, isActive: event.target.checked }))}
                    />
                    Active on save
                  </label>
                  <label className="automation-checkbox-label">
                    <input
                      type="checkbox"
                      checked={draft.dryRun}
                      onChange={(event) => setDraft((current) => ({ ...current, dryRun: event.target.checked }))}
                    />
                    Dry run (log only)
                  </label>
                </div>
              </div>

              <WorkflowTriggerForm
                trigger={draft.trigger}
                onChange={(trigger) => setDraft((current) => ({ ...current, trigger }))}
              />

              <WorkflowConditionForm
                conditions={draft.conditions}
                onChange={(conditions) => setDraft((current) => ({ ...current, conditions }))}
              />

              <WorkflowActionForm
                actions={draft.actions}
                onChange={(actions) => setDraft((current) => ({ ...current, actions }))}
              />

              <div className="automation-builder-actions">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save workflow"}
                </Button>
                {mode === "edit" && workflowId ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.push(`/clinic/automation/workflows/${workflowId}/versions`)}
                  >
                    Version history
                  </Button>
                ) : null}
                <Button type="button" variant="ghost" onClick={() => router.push("/clinic/automation/workflows")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Definition preview</CardTitle>
          </CardHeader>
          <CardBody>
            <pre className="automation-json-preview">{definitionPreview}</pre>
          </CardBody>
        </Card>
      </div>

      <aside className="automation-builder-sidebar">
        <Card>
          <CardHeader>
            <CardTitle>Flow preview</CardTitle>
          </CardHeader>
          <CardBody>
            <WorkflowGraphView draft={draft} />
          </CardBody>
        </Card>
      </aside>
    </div>
  );
}
