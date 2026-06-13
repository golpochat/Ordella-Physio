"use client";

import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { WorkflowDraft, WorkflowTemplate } from "@/lib/automation-types";

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: "missed-appointment",
    name: "Missed appointment follow-up",
    description: "Notify the patient and create a staff follow-up task when an appointment is missed.",
    draft: {
      name: "Missed appointment follow-up",
      description: "Automatically follow up on missed appointments.",
      isActive: false,
      dryRun: false,
      trigger: { type: "EVENT", eventKey: "APPOINTMENT_MISSED" },
      conditions: [],
      actions: [
        {
          type: "SEND_NOTIFICATION",
          config: { channel: "EMAIL", templateId: "MISSED_APPOINTMENT", recipient: "patient" },
        },
        { type: "CREATE_TASK", config: { title: "Follow up with patient", dueOffsetDays: 2, assignee: "staff" } },
      ],
    },
  },
  {
    id: "overdue-invoice",
    name: "Overdue invoice nudges",
    description: "Send payment reminders and generate an AI explanation for overdue invoices.",
    draft: {
      name: "Overdue invoice nudges",
      description: "Nudge patients with overdue invoices.",
      isActive: false,
      dryRun: false,
      trigger: { type: "EVENT", eventKey: "INVOICE_OVERDUE" },
      conditions: [{ field: "invoice.amount", operator: "GREATER_THAN", value: "0" }],
      actions: [
        {
          type: "SEND_NOTIFICATION",
          config: { channel: "EMAIL", templateId: "INVOICE_OVERDUE", recipient: "patient" },
        },
        { type: "RUN_AI_INSIGHT", config: { aiTaskKey: "INVOICE_EXPLANATION", storeResultAs: "note" } },
      ],
    },
  },
  {
    id: "inactive-patient",
    name: "Inactive patient reactivation",
    description: "Re-engage patients who have been inactive for a configured period.",
    draft: {
      name: "Inactive patient reactivation",
      description: "Reach out to inactive patients.",
      isActive: false,
      dryRun: false,
      trigger: { type: "THRESHOLD", metric: "PATIENT_INACTIVE_DAYS", threshold: 30 },
      conditions: [],
      actions: [
        {
          type: "SEND_NOTIFICATION",
          config: { channel: "EMAIL", templateId: "PATIENT_REACTIVATION", recipient: "patient" },
        },
        { type: "CREATE_TASK", config: { title: "Re-engage inactive patient", dueOffsetDays: 3, assignee: "staff" } },
      ],
    },
  },
  {
    id: "no-show-risk",
    name: "High no-show risk reminders",
    description: "Send reminders when no-show risk exceeds a threshold.",
    draft: {
      name: "High no-show risk reminders",
      description: "Proactive reminders for high no-show risk appointments.",
      isActive: false,
      dryRun: false,
      trigger: { type: "THRESHOLD", metric: "NO_SHOW_RATE", threshold: 0.35 },
      conditions: [{ field: "appointment.status", operator: "EQUALS", value: "SCHEDULED" }],
      actions: [
        {
          type: "SEND_NOTIFICATION",
          config: { channel: "SMS", templateId: "APPOINTMENT_REMINDER", recipient: "patient" },
        },
        { type: "RUN_AI_INSIGHT", config: { aiTaskKey: "APPOINTMENT_INSIGHTS", storeResultAs: "comment" } },
      ],
    },
  },
];

export type WorkflowTemplatePickerProps = {
  onSelect: (draft: WorkflowDraft) => void;
};

export function WorkflowTemplatePicker({ onSelect }: WorkflowTemplatePickerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Start from a template</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="automation-template-grid">
          {WORKFLOW_TEMPLATES.map((template) => (
            <div key={template.id} className="automation-template-card">
              <h3 className="automation-template-title">{template.name}</h3>
              <p className="automation-template-description">{template.description}</p>
              <Button type="button" variant="secondary" size="sm" onClick={() => onSelect(template.draft)}>
                Use template
              </Button>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
