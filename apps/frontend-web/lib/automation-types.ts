export type WorkflowTriggerType = "EVENT" | "SCHEDULE" | "THRESHOLD";

export type WorkflowEventKey =
  | "APPOINTMENT_CREATED"
  | "APPOINTMENT_UPDATED"
  | "APPOINTMENT_MISSED"
  | "INVOICE_CREATED"
  | "INVOICE_OVERDUE"
  | "INVOICE_PAID"
  | "PATIENT_CREATED"
  | "PATIENT_INACTIVE";

export type WorkflowMetricKey =
  | "PATIENT_INACTIVE_DAYS"
  | "OVERDUE_INVOICES"
  | "NO_SHOW_RATE";

export type WorkflowTriggerConfig = {
  type: WorkflowTriggerType;
  eventKey?: WorkflowEventKey;
  cron?: string;
  metric?: WorkflowMetricKey;
  threshold?: number;
};

export type WorkflowConditionOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "CONTAINS"
  | "GREATER_THAN"
  | "LESS_THAN";

export type WorkflowCondition = {
  field: string;
  operator: WorkflowConditionOperator;
  value: string;
  joinWith?: "AND" | "OR";
};

export type WorkflowActionType =
  | "SEND_NOTIFICATION"
  | "CREATE_TASK"
  | "RUN_AI_INSIGHT"
  | "UPDATE_FIELD";

export type WorkflowAction = {
  type: WorkflowActionType;
  config: Record<string, string | number | boolean>;
};

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
  lastRun?: {
    id: string;
    status: "SUCCESS" | "FAILED" | "RUNNING";
    startedAt: string;
    finishedAt: string | null;
    errorMessage?: string | null;
  } | null;
};

export type WorkflowDraft = {
  name: string;
  description: string;
  isActive: boolean;
  dryRun: boolean;
  trigger: WorkflowTriggerConfig;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
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

export type WorkflowRunListFilters = {
  page?: number;
  limit?: number;
  workflowId?: string;
  status?: "SUCCESS" | "FAILED" | "RUNNING" | "";
  from?: string;
  to?: string;
};

export type WorkflowRunListResponse = {
  data: WorkflowRunRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type WorkflowTemplate = {
  id: string;
  name: string;
  description: string;
  draft: WorkflowDraft;
};

export type WorkflowLiveEventType =
  | "TRIGGERED"
  | "CONDITION_PASSED"
  | "CONDITION_FAILED"
  | "ACTION_EXECUTED"
  | "ACTION_FAILED"
  | "WORKFLOW_COMPLETED";

export type WorkflowLiveEventStatus = "SUCCESS" | "FAILED";

export type WorkflowLiveEvent = {
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
  eventType?: WorkflowLiveEventType | "";
  status?: WorkflowLiveEventStatus | "";
  from?: string;
  to?: string;
  search?: string;
  tenantId?: string;
  limit?: number;
};

export type WorkflowVersionRecord = {
  id: string;
  tenantId: string;
  workflowId: string;
  versionNumber: number;
  label: string | null;
  definition: WorkflowDraft & {
    versionMeta?: {
      changeType?: "SAVE" | "ROLLBACK" | "LABEL";
      sourceVersionNumber?: number;
    };
  };
  createdByUserId: string;
  createdAt: string;
};

export type WorkflowVersionDiffEntry = {
  path: string;
  type: "added" | "removed" | "changed";
  oldValue?: unknown;
  newValue?: unknown;
};

export type WorkflowVersionDiffResult = {
  workflowId: string;
  fromVersion: number;
  toVersion: number;
  added: WorkflowVersionDiffEntry[];
  removed: WorkflowVersionDiffEntry[];
  changed: WorkflowVersionDiffEntry[];
};

export const EMPTY_WORKFLOW_DRAFT: WorkflowDraft = {
  name: "",
  description: "",
  isActive: false,
  dryRun: false,
  trigger: { type: "EVENT", eventKey: "APPOINTMENT_MISSED" },
  conditions: [],
  actions: [{ type: "SEND_NOTIFICATION", config: { channel: "EMAIL", templateId: "", recipient: "patient" } }],
};
