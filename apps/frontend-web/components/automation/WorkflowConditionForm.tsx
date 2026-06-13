"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { WorkflowCondition, WorkflowConditionOperator } from "@/lib/automation-types";

const FIELD_OPTIONS = [
  { value: "patient.tags", label: "Patient tags" },
  { value: "patient.age", label: "Patient age" },
  { value: "invoice.amount", label: "Invoice amount" },
  { value: "appointment.status", label: "Appointment status" },
];

const OPERATOR_OPTIONS: Array<{ value: WorkflowConditionOperator; label: string }> = [
  { value: "EQUALS", label: "Equals" },
  { value: "NOT_EQUALS", label: "Not equals" },
  { value: "CONTAINS", label: "Contains" },
  { value: "GREATER_THAN", label: "Greater than" },
  { value: "LESS_THAN", label: "Less than" },
];

export type WorkflowConditionFormProps = {
  conditions: WorkflowCondition[];
  onChange: (conditions: WorkflowCondition[]) => void;
};

function createEmptyCondition(): WorkflowCondition {
  return {
    field: "patient.tags",
    operator: "EQUALS",
    value: "",
    joinWith: "AND",
  };
}

export function WorkflowConditionForm({ conditions, onChange }: WorkflowConditionFormProps) {
  function updateCondition(index: number, patch: Partial<WorkflowCondition>) {
    onChange(conditions.map((condition, currentIndex) => (currentIndex === index ? { ...condition, ...patch } : condition)));
  }

  function removeCondition(index: number) {
    onChange(conditions.filter((_, currentIndex) => currentIndex !== index));
  }

  return (
    <div className="automation-form-section">
      <div className="automation-form-section-header">
        <h3 className="automation-form-section-title">Conditions</h3>
        <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...conditions, createEmptyCondition()])}>
          Add condition
        </Button>
      </div>

      {conditions.length === 0 ? (
        <p className="automation-empty-hint">No conditions — workflow runs for every matching trigger.</p>
      ) : null}

      {conditions.map((condition, index) => (
        <div key={`condition-${index}`} className="automation-condition-row">
          {index > 0 ? (
            <div className="tenant-create-form-field automation-condition-join">
              <Label htmlFor={`condition-join-${index}`}>Join with previous</Label>
              <select
                id={`condition-join-${index}`}
                className="automation-select"
                value={conditions[index - 1].joinWith ?? "AND"}
                onChange={(event) =>
                  updateCondition(index - 1, {
                    joinWith: event.target.value as "AND" | "OR",
                  })
                }
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </div>
          ) : null}

          <div className="automation-condition-fields">
            <div className="tenant-create-form-field">
              <Label htmlFor={`condition-field-${index}`}>Field</Label>
              <select
                id={`condition-field-${index}`}
                className="automation-select"
                value={condition.field}
                onChange={(event) => updateCondition(index, { field: event.target.value })}
              >
                {FIELD_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor={`condition-operator-${index}`}>Operator</Label>
              <select
                id={`condition-operator-${index}`}
                className="automation-select"
                value={condition.operator}
                onChange={(event) =>
                  updateCondition(index, {
                    operator: event.target.value as WorkflowConditionOperator,
                  })
                }
              >
                {OPERATOR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="tenant-create-form-field">
              <Label htmlFor={`condition-value-${index}`}>Value</Label>
              <Input
                id={`condition-value-${index}`}
                value={condition.value}
                onChange={(event) => updateCondition(index, { value: event.target.value })}
              />
            </div>
          </div>

          <Button type="button" variant="ghost" size="sm" onClick={() => removeCondition(index)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}
