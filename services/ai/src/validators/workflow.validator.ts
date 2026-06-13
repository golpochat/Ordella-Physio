import { aiValidationError } from "@/utils/ai-errors";

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
  value: unknown;
  joinWith?: "AND" | "OR";
};

export type WorkflowActionType =
  | "SEND_NOTIFICATION"
  | "CREATE_TASK"
  | "RUN_AI_INSIGHT"
  | "UPDATE_FIELD";

export type WorkflowAction = {
  type: WorkflowActionType;
  config: Record<string, unknown>;
};

export type WorkflowDefinitionPayload = {
  name: string;
  description?: string;
  isActive?: boolean;
  dryRun?: boolean;
  trigger: WorkflowTriggerConfig;
  conditions?: WorkflowCondition[];
  actions: WorkflowAction[];
};

const TRIGGER_TYPES: WorkflowTriggerType[] = ["EVENT", "SCHEDULE", "THRESHOLD"];
const EVENT_KEYS: WorkflowEventKey[] = [
  "APPOINTMENT_CREATED",
  "APPOINTMENT_UPDATED",
  "APPOINTMENT_MISSED",
  "INVOICE_CREATED",
  "INVOICE_OVERDUE",
  "INVOICE_PAID",
  "PATIENT_CREATED",
  "PATIENT_INACTIVE",
];
const METRIC_KEYS: WorkflowMetricKey[] = [
  "PATIENT_INACTIVE_DAYS",
  "OVERDUE_INVOICES",
  "NO_SHOW_RATE",
];
const OPERATORS: WorkflowConditionOperator[] = [
  "EQUALS",
  "NOT_EQUALS",
  "CONTAINS",
  "GREATER_THAN",
  "LESS_THAN",
];
const ACTION_TYPES: WorkflowActionType[] = [
  "SEND_NOTIFICATION",
  "CREATE_TASK",
  "RUN_AI_INSIGHT",
  "UPDATE_FIELD",
];

function parseTrigger(body: Record<string, unknown>): WorkflowTriggerConfig {
  const trigger = (body.trigger ?? {}) as Record<string, unknown>;
  const type = String(trigger.type ?? "EVENT").toUpperCase() as WorkflowTriggerType;
  const fields: Array<{ field: string; message: string }> = [];

  if (!TRIGGER_TYPES.includes(type)) {
    fields.push({ field: "trigger.type", message: "Invalid trigger type." });
  }

  const config: WorkflowTriggerConfig = { type };

  if (type === "EVENT") {
    const eventKey = String(trigger.eventKey ?? "").toUpperCase() as WorkflowEventKey;
    if (!EVENT_KEYS.includes(eventKey)) {
      fields.push({ field: "trigger.eventKey", message: "Invalid event key." });
    } else {
      config.eventKey = eventKey;
    }
  }

  if (type === "SCHEDULE") {
    const cron = String(trigger.cron ?? "").trim();
    if (!cron) {
      fields.push({ field: "trigger.cron", message: "Cron expression is required." });
    } else {
      config.cron = cron;
    }
  }

  if (type === "THRESHOLD") {
    const metric = String(trigger.metric ?? "").toUpperCase() as WorkflowMetricKey;
    if (!METRIC_KEYS.includes(metric)) {
      fields.push({ field: "trigger.metric", message: "Invalid metric." });
    } else {
      config.metric = metric;
    }

    const threshold = Number(trigger.threshold);
    if (!Number.isFinite(threshold)) {
      fields.push({ field: "trigger.threshold", message: "Threshold must be a number." });
    } else {
      config.threshold = threshold;
    }
  }

  if (fields.length) {
    throw aiValidationError(fields);
  }

  return config;
}

function parseConditions(body: Record<string, unknown>): WorkflowCondition[] {
  if (body.conditions === undefined) {
    return [];
  }

  if (!Array.isArray(body.conditions)) {
    throw aiValidationError([{ field: "conditions", message: "conditions must be an array." }]);
  }

  const fields: Array<{ field: string; message: string }> = [];
  const conditions: WorkflowCondition[] = [];

  body.conditions.forEach((item, index) => {
    const condition = (item ?? {}) as Record<string, unknown>;
    const field = String(condition.field ?? "").trim();
    const operator = String(condition.operator ?? "").toUpperCase() as WorkflowConditionOperator;
    const joinWith = condition.joinWith
      ? (String(condition.joinWith).toUpperCase() as "AND" | "OR")
      : undefined;

    if (!field) {
      fields.push({ field: `conditions[${index}].field`, message: "Field is required." });
    }
    if (!OPERATORS.includes(operator)) {
      fields.push({ field: `conditions[${index}].operator`, message: "Invalid operator." });
    }
    if (joinWith && joinWith !== "AND" && joinWith !== "OR") {
      fields.push({ field: `conditions[${index}].joinWith`, message: "joinWith must be AND or OR." });
    }

    conditions.push({
      field,
      operator,
      value: condition.value,
      joinWith,
    });
  });

  if (fields.length) {
    throw aiValidationError(fields);
  }

  return conditions;
}

function parseActions(body: Record<string, unknown>): WorkflowAction[] {
  if (!Array.isArray(body.actions)) {
    throw aiValidationError([{ field: "actions", message: "actions must be a non-empty array." }]);
  }

  if (!body.actions.length) {
    throw aiValidationError([{ field: "actions", message: "At least one action is required." }]);
  }

  const fields: Array<{ field: string; message: string }> = [];
  const actions: WorkflowAction[] = [];

  body.actions.forEach((item, index) => {
    const action = (item ?? {}) as Record<string, unknown>;
    const type = String(action.type ?? "").toUpperCase() as WorkflowActionType;
    const config = (action.config ?? {}) as Record<string, unknown>;

    if (!ACTION_TYPES.includes(type)) {
      fields.push({ field: `actions[${index}].type`, message: "Invalid action type." });
    }

    actions.push({ type, config });
  });

  if (fields.length) {
    throw aiValidationError(fields);
  }

  return actions;
}

export function validateCreateWorkflow(body: Record<string, unknown>): WorkflowDefinitionPayload {
  const name = String(body.name ?? "").trim();
  const fields: Array<{ field: string; message: string }> = [];

  if (!name) {
    fields.push({ field: "name", message: "name is required." });
  }

  if (fields.length) {
    throw aiValidationError(fields);
  }

  return {
    name,
    description: body.description ? String(body.description).trim() : "",
    isActive: body.isActive === true,
    dryRun: body.dryRun === true,
    trigger: parseTrigger(body),
    conditions: parseConditions(body),
    actions: parseActions(body),
  };
}

export function validateUpdateWorkflow(body: Record<string, unknown>): Partial<WorkflowDefinitionPayload> {
  const input: Partial<WorkflowDefinitionPayload> = {};

  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) {
      throw aiValidationError([{ field: "name", message: "name cannot be empty." }]);
    }
    input.name = name;
  }

  if (body.description !== undefined) {
    input.description = String(body.description).trim();
  }

  if (body.isActive !== undefined) {
    input.isActive = body.isActive === true;
  }

  if (body.dryRun !== undefined) {
    input.dryRun = body.dryRun === true;
  }

  if (body.trigger !== undefined) {
    input.trigger = parseTrigger(body);
  }

  if (body.conditions !== undefined) {
    input.conditions = parseConditions(body);
  }

  if (body.actions !== undefined) {
    input.actions = parseActions(body);
  }

  return input;
}

export function validateWorkflowRunsQuery(query: Record<string, unknown>) {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 20);
  const fields: Array<{ field: string; message: string }> = [];

  if (!Number.isInteger(page) || page < 1) {
    fields.push({ field: "page", message: "page must be a positive integer." });
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    fields.push({ field: "limit", message: "limit must be between 1 and 100." });
  }

  if (fields.length) {
    throw aiValidationError(fields);
  }

  const status = query.status ? String(query.status).toUpperCase() : undefined;
  if (status && status !== "SUCCESS" && status !== "FAILED" && status !== "RUNNING") {
    throw aiValidationError([{ field: "status", message: "Invalid status filter." }]);
  }

  return {
    page,
    limit,
    workflowId: query.workflowId ? String(query.workflowId) : undefined,
    status: status as "SUCCESS" | "FAILED" | "RUNNING" | undefined,
    from: query.from ? String(query.from) : undefined,
    to: query.to ? String(query.to) : undefined,
  };
}
