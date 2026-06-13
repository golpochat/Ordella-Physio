"use client";

import { Input, Label } from "@/components/ui/input";
import type { WorkflowDraft, WorkflowEventKey, WorkflowMetricKey, WorkflowTriggerType } from "@/lib/automation-types";

const TRIGGER_TYPES: Array<{ value: WorkflowTriggerType; label: string }> = [
  { value: "EVENT", label: "Event" },
  { value: "SCHEDULE", label: "Schedule" },
  { value: "THRESHOLD", label: "Threshold" },
];

const EVENT_OPTIONS: Array<{ value: WorkflowEventKey; label: string }> = [
  { value: "APPOINTMENT_CREATED", label: "Appointment created" },
  { value: "APPOINTMENT_UPDATED", label: "Appointment updated" },
  { value: "APPOINTMENT_MISSED", label: "Appointment missed" },
  { value: "INVOICE_CREATED", label: "Invoice created" },
  { value: "INVOICE_OVERDUE", label: "Invoice overdue" },
  { value: "INVOICE_PAID", label: "Invoice paid" },
  { value: "PATIENT_CREATED", label: "Patient created" },
  { value: "PATIENT_INACTIVE", label: "Patient inactive" },
];

const METRIC_OPTIONS: Array<{ value: WorkflowMetricKey; label: string }> = [
  { value: "PATIENT_INACTIVE_DAYS", label: "Inactive patients (days)" },
  { value: "OVERDUE_INVOICES", label: "Overdue invoices" },
  { value: "NO_SHOW_RATE", label: "No-show rate" },
];

const CRON_PRESETS = [
  { label: "Daily at 8am", value: "0 8 * * *" },
  { label: "Weekly on Monday", value: "0 8 * * 1" },
  { label: "Monthly on 1st", value: "0 8 1 * *" },
];

export type WorkflowTriggerFormProps = {
  trigger: WorkflowDraft["trigger"];
  onChange: (trigger: WorkflowDraft["trigger"]) => void;
};

export function WorkflowTriggerForm({ trigger, onChange }: WorkflowTriggerFormProps) {
  return (
    <div className="automation-form-section">
      <h3 className="automation-form-section-title">Trigger</h3>

      <div className="tenant-create-form-field">
        <Label htmlFor="trigger-type">Trigger type</Label>
        <select
          id="trigger-type"
          className="automation-select"
          value={trigger.type}
          onChange={(event) =>
            onChange({
              type: event.target.value as WorkflowTriggerType,
              eventKey: "APPOINTMENT_MISSED",
            })
          }
        >
          {TRIGGER_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {trigger.type === "EVENT" ? (
        <div className="tenant-create-form-field">
          <Label htmlFor="trigger-event">Event</Label>
          <select
            id="trigger-event"
            className="automation-select"
            value={trigger.eventKey ?? "APPOINTMENT_MISSED"}
            onChange={(event) =>
              onChange({
                ...trigger,
                eventKey: event.target.value as WorkflowEventKey,
              })
            }
          >
            {EVENT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {trigger.type === "SCHEDULE" ? (
        <>
          <div className="tenant-create-form-field">
            <Label htmlFor="trigger-cron-preset">Schedule preset</Label>
            <select
              id="trigger-cron-preset"
              className="automation-select"
              value={trigger.cron ?? CRON_PRESETS[0].value}
              onChange={(event) => onChange({ ...trigger, cron: event.target.value })}
            >
              {CRON_PRESETS.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>
          <div className="tenant-create-form-field">
            <Label htmlFor="trigger-cron">Cron expression</Label>
            <Input
              id="trigger-cron"
              value={trigger.cron ?? ""}
              onChange={(event) => onChange({ ...trigger, cron: event.target.value })}
              placeholder="0 8 * * *"
            />
          </div>
        </>
      ) : null}

      {trigger.type === "THRESHOLD" ? (
        <>
          <div className="tenant-create-form-field">
            <Label htmlFor="trigger-metric">Metric</Label>
            <select
              id="trigger-metric"
              className="automation-select"
              value={trigger.metric ?? "PATIENT_INACTIVE_DAYS"}
              onChange={(event) =>
                onChange({
                  ...trigger,
                  metric: event.target.value as WorkflowMetricKey,
                })
              }
            >
              {METRIC_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="tenant-create-form-field">
            <Label htmlFor="trigger-threshold">Threshold value</Label>
            <Input
              id="trigger-threshold"
              type="number"
              value={trigger.threshold ?? 0}
              onChange={(event) =>
                onChange({
                  ...trigger,
                  threshold: Number(event.target.value),
                })
              }
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
