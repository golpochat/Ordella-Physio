import type { AIWorkflow, AIWorkflowRun } from "@/generated/prisma";
import type {
  WorkflowAction,
  WorkflowCondition,
  WorkflowDefinitionPayload,
  WorkflowTriggerConfig,
} from "@/validators/workflow.validator";

export type WorkflowRecord = {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  isActive: boolean;
  dryRun: boolean;
  trigger: WorkflowTriggerConfig;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  createdAt: string;
  updatedAt: string;
  lastRun?: WorkflowRunSummary | null;
};

export type WorkflowRunSummary = {
  id: string;
  status: "SUCCESS" | "FAILED" | "RUNNING";
  startedAt: string;
  finishedAt: string | null;
  errorMessage?: string | null;
};

export type WorkflowRunRecord = {
  id: string;
  tenantId: string;
  workflowId: string | null;
  workflowName: string | null;
  trigger: string;
  status: "SUCCESS" | "FAILED" | "RUNNING";
  startedAt: string;
  finishedAt: string | null;
  errorMessage?: string | null;
  inputContext: Record<string, unknown>;
  actionsExecuted: Array<{ action: string; success: boolean; output: unknown }>;
};

function parseTrigger(value: unknown): WorkflowTriggerConfig {
  if (!value || typeof value !== "object") {
    return { type: "EVENT", eventKey: "APPOINTMENT_MISSED" };
  }
  return value as WorkflowTriggerConfig;
}

function parseConditions(value: unknown): WorkflowCondition[] {
  return Array.isArray(value) ? (value as WorkflowCondition[]) : [];
}

function parseActions(value: unknown): WorkflowAction[] {
  return Array.isArray(value) ? (value as WorkflowAction[]) : [];
}

function mapRunStatus(status: string): WorkflowRunSummary["status"] {
  if (status === "COMPLETED") {
    return "SUCCESS";
  }
  if (status === "FAILED") {
    return "FAILED";
  }
  return "RUNNING";
}

function extractRunError(result: unknown): string | null {
  if (!result || typeof result !== "object") {
    return null;
  }
  const error = (result as { error?: unknown }).error;
  return typeof error === "string" ? error : null;
}

function extractInputContext(result: unknown): Record<string, unknown> {
  if (!result || typeof result !== "object") {
    return {};
  }
  const inputContext = (result as { inputContext?: unknown }).inputContext;
  return inputContext && typeof inputContext === "object"
    ? (inputContext as Record<string, unknown>)
    : {};
}

function extractActionsExecuted(
  result: unknown,
  steps: unknown,
): Array<{ action: string; success: boolean; output: unknown }> {
  if (result && typeof result === "object") {
    const actionsExecuted = (result as { actionsExecuted?: unknown }).actionsExecuted;
    if (Array.isArray(actionsExecuted)) {
      return actionsExecuted as Array<{ action: string; success: boolean; output: unknown }>;
    }
    const stepResults = (result as { steps?: unknown }).steps;
    if (Array.isArray(stepResults)) {
      return stepResults as Array<{ action: string; success: boolean; output: unknown }>;
    }
  }

  return Array.isArray(steps)
    ? (steps as Array<{ action: string; success: boolean; output: unknown }>)
    : [];
}

export function toWorkflowRecord(
  workflow: AIWorkflow,
  lastRun?: AIWorkflowRun | null,
): WorkflowRecord {
  const summary = lastRun
    ? {
        id: lastRun.id,
        status: mapRunStatus(lastRun.status),
        startedAt: lastRun.createdAt.toISOString(),
        finishedAt:
          lastRun.status === "RUNNING" ? null : lastRun.updatedAt.toISOString(),
        errorMessage: extractRunError(lastRun.result),
      }
    : null;

  return {
    id: workflow.id,
    tenantId: workflow.tenantId,
    name: workflow.name,
    description: workflow.description,
    isActive: workflow.isActive,
    dryRun: workflow.dryRun,
    trigger: parseTrigger(workflow.trigger),
    conditions: parseConditions(workflow.conditions),
    actions: parseActions(workflow.actions),
    createdAt: workflow.createdAt.toISOString(),
    updatedAt: workflow.updatedAt.toISOString(),
    lastRun: summary,
  };
}

export function toWorkflowRunRecord(
  run: AIWorkflowRun,
  workflowName?: string | null,
): WorkflowRunRecord {
  return {
    id: run.id,
    tenantId: run.tenantId,
    workflowId: run.workflowId,
    workflowName: workflowName ?? null,
    trigger: run.trigger,
    status: mapRunStatus(run.status),
    startedAt: run.createdAt.toISOString(),
    finishedAt: run.status === "RUNNING" ? null : run.updatedAt.toISOString(),
    errorMessage: extractRunError(run.result),
    inputContext: extractInputContext(run.result),
    actionsExecuted: extractActionsExecuted(run.result, run.steps),
  };
}

export function toWorkflowPayload(workflow: AIWorkflow): WorkflowDefinitionPayload {
  return {
    name: workflow.name,
    description: workflow.description,
    isActive: workflow.isActive,
    dryRun: workflow.dryRun,
    trigger: parseTrigger(workflow.trigger),
    conditions: parseConditions(workflow.conditions),
    actions: parseActions(workflow.actions),
  };
}
