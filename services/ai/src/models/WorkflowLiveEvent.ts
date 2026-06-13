import type { AIWorkflowLiveEvent } from "@/generated/prisma";

export type WorkflowLiveEventType =
  | "TRIGGERED"
  | "CONDITION_PASSED"
  | "CONDITION_FAILED"
  | "ACTION_EXECUTED"
  | "ACTION_FAILED"
  | "WORKFLOW_COMPLETED";

export type WorkflowLiveEventStatus = "SUCCESS" | "FAILED";

export type WorkflowLiveEventInput = {
  tenantId: string;
  workflowId?: string | null;
  workflowName?: string | null;
  runId?: string | null;
  eventType: WorkflowLiveEventType;
  payload?: Record<string, unknown>;
  durationMs?: number;
  status?: WorkflowLiveEventStatus;
};

export type WorkflowLiveEventRecord = {
  id: string;
  tenantId: string;
  workflowId: string | null;
  workflowName: string | null;
  runId: string | null;
  eventType: WorkflowLiveEventType;
  timestamp: string;
  payload: Record<string, unknown>;
  durationMs: number | null;
  status: WorkflowLiveEventStatus | null;
};

export type WorkflowLiveEventFilters = {
  workflowId?: string;
  eventType?: WorkflowLiveEventType;
  status?: WorkflowLiveEventStatus;
  from?: string;
  to?: string;
  search?: string;
  tenantId?: string;
  limit?: number;
};

export function toWorkflowLiveEventRecord(event: AIWorkflowLiveEvent): WorkflowLiveEventRecord {
  return {
    id: event.id,
    tenantId: event.tenantId,
    workflowId: event.workflowId,
    workflowName: event.workflowName,
    runId: event.runId,
    eventType: event.eventType as WorkflowLiveEventType,
    timestamp: event.timestamp.toISOString(),
    payload:
      event.payload && typeof event.payload === "object"
        ? (event.payload as Record<string, unknown>)
        : {},
    durationMs: event.durationMs,
    status: event.status as WorkflowLiveEventStatus | null,
  };
}
