"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { WorkflowAction, WorkflowActionType } from "@/lib/automation-types";

const ACTION_TYPES: Array<{ value: WorkflowActionType; label: string }> = [
  { value: "SEND_NOTIFICATION", label: "Send notification" },
  { value: "CREATE_TASK", label: "Create task" },
  { value: "RUN_AI_INSIGHT", label: "Run AI insight" },
  { value: "UPDATE_FIELD", label: "Update field" },
];

function createEmptyAction(): WorkflowAction {
  return {
    type: "SEND_NOTIFICATION",
    config: { channel: "EMAIL", templateId: "", recipient: "patient" },
  };
}

export type WorkflowActionFormProps = {
  actions: WorkflowAction[];
  onChange: (actions: WorkflowAction[]) => void;
};

export function WorkflowActionForm({ actions, onChange }: WorkflowActionFormProps) {
  function updateAction(index: number, patch: Partial<WorkflowAction>) {
    onChange(
      actions.map((action, currentIndex) =>
        currentIndex === index ? { ...action, ...patch, config: { ...action.config, ...(patch.config ?? {}) } } : action,
      ),
    );
  }

  function updateActionConfig(index: number, key: string, value: string) {
    const action = actions[index];
    updateAction(index, {
      config: {
        ...action.config,
        [key]: value,
      },
    });
  }

  function removeAction(index: number) {
    onChange(actions.filter((_, currentIndex) => currentIndex !== index));
  }

  return (
    <div className="automation-form-section">
      <div className="automation-form-section-header">
        <h3 className="automation-form-section-title">Actions</h3>
        <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...actions, createEmptyAction()])}>
          Add action
        </Button>
      </div>

      {actions.map((action, index) => (
        <div key={`action-${index}`} className="automation-action-row">
          <div className="tenant-create-form-field">
            <Label htmlFor={`action-type-${index}`}>Action type</Label>
            <select
              id={`action-type-${index}`}
              className="automation-select"
              value={action.type}
              onChange={(event) =>
                updateAction(index, {
                  type: event.target.value as WorkflowActionType,
                  config: {},
                })
              }
            >
              {ACTION_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {action.type === "SEND_NOTIFICATION" ? (
            <>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-channel-${index}`}>Channel</Label>
                <select
                  id={`action-channel-${index}`}
                  className="automation-select"
                  value={String(action.config.channel ?? "EMAIL")}
                  onChange={(event) => updateActionConfig(index, "channel", event.target.value)}
                >
                  <option value="EMAIL">Email</option>
                  <option value="SMS">SMS</option>
                  <option value="IN_APP">In-app</option>
                </select>
              </div>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-template-${index}`}>Template ID</Label>
                <Input
                  id={`action-template-${index}`}
                  value={String(action.config.templateId ?? "")}
                  onChange={(event) => updateActionConfig(index, "templateId", event.target.value)}
                />
              </div>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-recipient-${index}`}>Recipient</Label>
                <select
                  id={`action-recipient-${index}`}
                  className="automation-select"
                  value={String(action.config.recipient ?? "patient")}
                  onChange={(event) => updateActionConfig(index, "recipient", event.target.value)}
                >
                  <option value="patient">Patient</option>
                  <option value="staff">Staff</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </>
          ) : null}

          {action.type === "CREATE_TASK" ? (
            <>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-task-title-${index}`}>Task title</Label>
                <Input
                  id={`action-task-title-${index}`}
                  value={String(action.config.title ?? "")}
                  onChange={(event) => updateActionConfig(index, "title", event.target.value)}
                />
              </div>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-assignee-${index}`}>Assignee</Label>
                <select
                  id={`action-assignee-${index}`}
                  className="automation-select"
                  value={String(action.config.assignee ?? "staff")}
                  onChange={(event) => updateActionConfig(index, "assignee", event.target.value)}
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="therapist">Therapist</option>
                </select>
              </div>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-due-offset-${index}`}>Due offset (days)</Label>
                <Input
                  id={`action-due-offset-${index}`}
                  type="number"
                  value={String(action.config.dueOffsetDays ?? 2)}
                  onChange={(event) => updateActionConfig(index, "dueOffsetDays", event.target.value)}
                />
              </div>
            </>
          ) : null}

          {action.type === "RUN_AI_INSIGHT" ? (
            <>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-ai-task-${index}`}>AI task key</Label>
                <select
                  id={`action-ai-task-${index}`}
                  className="automation-select"
                  value={String(action.config.aiTaskKey ?? "APPOINTMENT_INSIGHTS")}
                  onChange={(event) => updateActionConfig(index, "aiTaskKey", event.target.value)}
                >
                  <option value="APPOINTMENT_INSIGHTS">Appointment insights</option>
                  <option value="INVOICE_EXPLANATION">Invoice explanation</option>
                  <option value="PATIENT_SUMMARY">Patient summary</option>
                </select>
              </div>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-store-result-${index}`}>Store result as</Label>
                <select
                  id={`action-store-result-${index}`}
                  className="automation-select"
                  value={String(action.config.storeResultAs ?? "note")}
                  onChange={(event) => updateActionConfig(index, "storeResultAs", event.target.value)}
                >
                  <option value="note">Note</option>
                  <option value="tag">Tag</option>
                  <option value="comment">Comment</option>
                </select>
              </div>
            </>
          ) : null}

          {action.type === "UPDATE_FIELD" ? (
            <>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-entity-${index}`}>Entity type</Label>
                <Input
                  id={`action-entity-${index}`}
                  value={String(action.config.entityType ?? "")}
                  onChange={(event) => updateActionConfig(index, "entityType", event.target.value)}
                />
              </div>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-field-path-${index}`}>Field path</Label>
                <Input
                  id={`action-field-path-${index}`}
                  value={String(action.config.fieldPath ?? "")}
                  onChange={(event) => updateActionConfig(index, "fieldPath", event.target.value)}
                />
              </div>
              <div className="tenant-create-form-field">
                <Label htmlFor={`action-field-value-${index}`}>Value</Label>
                <Input
                  id={`action-field-value-${index}`}
                  value={String(action.config.value ?? "")}
                  onChange={(event) => updateActionConfig(index, "value", event.target.value)}
                />
              </div>
            </>
          ) : null}

          <Button type="button" variant="ghost" size="sm" onClick={() => removeAction(index)} disabled={actions.length <= 1}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
