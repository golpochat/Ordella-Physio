import { Injectable, Logger } from "@nestjs/common";
import { AiWorkflowRepository } from "@/repositories/ai-workflow.repository";
import { AiWorkflowRunRepository } from "@/repositories/ai-workflow-run.repository";
import { AgentService } from "@/services/agent.service";
import { WorkflowMonitorService } from "@/services/workflow-monitor.service";
import { aiValidationError, aiWorkflowNotFoundError } from "@/utils/ai-errors";
import type {
  WorkflowAction,
  WorkflowCondition,
  WorkflowEventKey,
  WorkflowTriggerConfig,
} from "@/validators/workflow.validator";

export type WorkflowTrigger =
  | "APPOINTMENT_MISSED"
  | "INVOICE_OVERDUE"
  | "PATIENT_INACTIVE";

export type WorkflowStep =
  | { action: "SEND_NOTIFICATION"; templateId: string; to?: string; variables?: Record<string, string> }
  | { action: "CREATE_TASK"; title: string; dueDate?: string }
  | { action: "RUN_AGENT"; request: string };

type LegacyWorkflowDefinition = {
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
};

const LEGACY_WORKFLOW_DEFINITIONS: Record<WorkflowTrigger, LegacyWorkflowDefinition> = {
  APPOINTMENT_MISSED: {
    trigger: "APPOINTMENT_MISSED",
    steps: [
      { action: "SEND_NOTIFICATION", templateId: "MISSED_APPOINTMENT" },
      { action: "CREATE_TASK", title: "Follow up with patient" },
    ],
  },
  INVOICE_OVERDUE: {
    trigger: "INVOICE_OVERDUE",
    steps: [
      { action: "SEND_NOTIFICATION", templateId: "INVOICE_OVERDUE" },
      { action: "RUN_AGENT", request: "Notify admin about overdue invoice" },
    ],
  },
  PATIENT_INACTIVE: {
    trigger: "PATIENT_INACTIVE",
    steps: [
      { action: "SEND_NOTIFICATION", templateId: "PATIENT_REACTIVATION" },
      { action: "CREATE_TASK", title: "Re-engage inactive patient" },
    ],
  },
};

type ExecutionContext = {
  patientId?: string;
  invoiceId?: string;
  appointmentId?: string;
  to?: string;
  [key: string]: unknown;
};

@Injectable()
export class WorkflowOrchestratorService {
  private readonly logger = new Logger(WorkflowOrchestratorService.name);

  constructor(
    private readonly workflowRepository: AiWorkflowRepository,
    private readonly workflowRunRepository: AiWorkflowRunRepository,
    private readonly agentService: AgentService,
    private readonly workflowMonitorService: WorkflowMonitorService,
  ) {}

  async listWorkflows(tenantId: string) {
    const tenantWorkflows = await this.workflowRepository.listByTenant(tenantId);
    const configured = tenantWorkflows.map((workflow) => ({
      id: workflow.id,
      name: workflow.name,
      trigger: workflow.trigger,
      isActive: workflow.isActive,
      actions: workflow.actions,
    }));

    const legacy = Object.values(LEGACY_WORKFLOW_DEFINITIONS).map((workflow) => ({
      trigger: workflow.trigger,
      steps: workflow.steps,
      isBuiltin: true,
    }));

    return [...configured, ...legacy];
  }

  async execute(
    tenantId: string,
    trigger: WorkflowTrigger,
    context: ExecutionContext,
  ) {
    const definition = LEGACY_WORKFLOW_DEFINITIONS[trigger];
    if (!definition) {
      throw aiValidationError([{ field: "trigger", message: "Unknown workflow trigger." }]);
    }

    return this.executeSteps(tenantId, {
      workflowId: undefined,
      workflowName: trigger,
      trigger,
      steps: definition.steps,
      dryRun: false,
      context,
    });
  }

  async executeById(tenantId: string, workflowId: string, context: ExecutionContext = {}) {
    const workflow = await this.workflowRepository.findById(tenantId, workflowId);
    if (!workflow) {
      throw aiWorkflowNotFoundError();
    }

    if (!workflow.isActive) {
      throw aiValidationError([{ field: "workflowId", message: "Workflow is not active." }]);
    }

    const triggerConfig = workflow.trigger as WorkflowTriggerConfig;
    const conditions = (workflow.conditions ?? []) as WorkflowCondition[];
    const actions = (workflow.actions ?? []) as WorkflowAction[];
    const triggerLabel = this.resolveTriggerLabel(triggerConfig);
    const conditionsPassed = this.conditionsMatch(conditions, context);

    if (!conditionsPassed) {
      await this.workflowMonitorService.emitLiveEvent({
        tenantId,
        workflowId: workflow.id,
        workflowName: workflow.name,
        eventType: "CONDITION_FAILED",
        status: "FAILED",
        payload: { context, trigger: triggerLabel, reason: "Conditions not met." },
      });
      await this.workflowMonitorService.emitLiveEvent({
        tenantId,
        workflowId: workflow.id,
        workflowName: workflow.name,
        eventType: "WORKFLOW_COMPLETED",
        status: "SUCCESS",
        payload: { skipped: true, reason: "Conditions not met." },
      });

      return {
        runId: null,
        trigger: triggerLabel,
        status: "COMPLETED",
        steps: [],
        skipped: true,
        reason: "Conditions not met.",
      };
    }

    await this.workflowMonitorService.emitLiveEvent({
      tenantId,
      workflowId: workflow.id,
      workflowName: workflow.name,
      eventType: "CONDITION_PASSED",
      status: "SUCCESS",
      payload: { context, trigger: triggerLabel, conditions },
    });

    const steps = actions.map((action) => this.toExecutionStep(action));

    return this.executeSteps(tenantId, {
      workflowId: workflow.id,
      workflowName: workflow.name,
      trigger: triggerLabel,
      steps,
      dryRun: workflow.dryRun,
      context,
    });
  }

  async executeByEvent(
    tenantId: string,
    eventKey: WorkflowEventKey,
    context: ExecutionContext = {},
  ) {
    const workflows = await this.workflowRepository.listByTenant(tenantId);
    const matches = workflows.filter((workflow) => {
      if (!workflow.isActive) {
        return false;
      }
      const trigger = workflow.trigger as WorkflowTriggerConfig;
      return trigger.type === "EVENT" && trigger.eventKey === eventKey;
    });

    const results = [];
    for (const workflow of matches) {
      const result = await this.executeById(tenantId, workflow.id, context);
      results.push(result);
    }

    return results;
  }

  private async executeSteps(
    tenantId: string,
    input: {
      workflowId?: string;
      workflowName: string;
      trigger: string;
      steps: Array<WorkflowStep | { action: string; [key: string]: unknown }>;
      dryRun: boolean;
      context: ExecutionContext;
    },
  ) {
    const startedAt = Date.now();
    const run = await this.workflowRunRepository.create({
      tenantId,
      workflowId: input.workflowId,
      trigger: input.trigger,
      status: "RUNNING",
      steps: input.steps as never,
      result: { inputContext: input.context } as never,
    });

    await this.workflowMonitorService.emitLiveEvent({
      tenantId,
      workflowId: input.workflowId ?? null,
      workflowName: input.workflowName,
      runId: run.id,
      eventType: "TRIGGERED",
      status: "SUCCESS",
      payload: {
        trigger: input.trigger,
        context: input.context,
        dryRun: input.dryRun,
      },
    });

    const stepResults: Array<{ action: string; success: boolean; output: unknown }> = [];

    try {
      for (const step of input.steps) {
        const stepStartedAt = Date.now();
        try {
          const result = await this.executeStep(tenantId, step, input.context, input.dryRun);
          stepResults.push(result);

          await this.workflowMonitorService.emitLiveEvent({
            tenantId,
            workflowId: input.workflowId ?? null,
            workflowName: input.workflowName,
            runId: run.id,
            eventType: result.success ? "ACTION_EXECUTED" : "ACTION_FAILED",
            status: result.success ? "SUCCESS" : "FAILED",
            durationMs: Date.now() - stepStartedAt,
            payload: {
              action: result.action,
              output: result.output,
              dryRun: input.dryRun,
            },
          });

          if (!result.success) {
            throw new Error(`Action ${result.action} failed.`);
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Action failed.";
          await this.workflowMonitorService.emitLiveEvent({
            tenantId,
            workflowId: input.workflowId ?? null,
            workflowName: input.workflowName,
            runId: run.id,
            eventType: "ACTION_FAILED",
            status: "FAILED",
            durationMs: Date.now() - stepStartedAt,
            payload: {
              action: step.action,
              error: message,
              dryRun: input.dryRun,
            },
          });
          throw error;
        }
      }

      await this.workflowRunRepository.updateResult(run.id, "COMPLETED", {
        inputContext: input.context,
        actionsExecuted: stepResults,
      } as never);

      await this.workflowMonitorService.emitLiveEvent({
        tenantId,
        workflowId: input.workflowId ?? null,
        workflowName: input.workflowName,
        runId: run.id,
        eventType: "WORKFLOW_COMPLETED",
        status: "SUCCESS",
        durationMs: Date.now() - startedAt,
        payload: {
          trigger: input.trigger,
          steps: stepResults,
          dryRun: input.dryRun,
        },
      });

      return {
        runId: run.id,
        trigger: input.trigger,
        status: "COMPLETED",
        steps: stepResults,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Workflow failed.";
      this.logger.warn(`Workflow ${input.trigger} failed for tenant ${tenantId}`, message);

      await this.workflowRunRepository.updateResult(run.id, "FAILED", {
        inputContext: input.context,
        actionsExecuted: stepResults,
        error: message,
      } as never);

      await this.workflowMonitorService.emitLiveEvent({
        tenantId,
        workflowId: input.workflowId ?? null,
        workflowName: input.workflowName,
        runId: run.id,
        eventType: "WORKFLOW_COMPLETED",
        status: "FAILED",
        durationMs: Date.now() - startedAt,
        payload: {
          trigger: input.trigger,
          error: message,
          steps: stepResults,
          dryRun: input.dryRun,
        },
      });

      return {
        runId: run.id,
        trigger: input.trigger,
        status: "FAILED",
        steps: stepResults,
        error: message,
      };
    }
  }

  private async executeStep(
    tenantId: string,
    step: WorkflowStep | { action: string; [key: string]: unknown },
    context: ExecutionContext,
    dryRun: boolean,
  ) {
    if (step.action === "SEND_NOTIFICATION") {
      const notificationStep = step as Extract<WorkflowStep, { action: "SEND_NOTIFICATION" }>;
      if (dryRun) {
        return {
          action: step.action,
          success: true,
          output: { dryRun: true, templateId: notificationStep.templateId },
        };
      }

      const output = await this.agentService.sendNotification(tenantId, {
        to: notificationStep.to ?? String(context.to ?? "patient@clinic.local"),
        templateId: notificationStep.templateId,
        variables: notificationStep.variables,
      });
      return { action: step.action, success: true, output };
    }

    if (step.action === "CREATE_TASK") {
      const taskStep = step as Extract<WorkflowStep, { action: "CREATE_TASK" }>;
      if (dryRun) {
        return {
          action: step.action,
          success: true,
          output: { dryRun: true, title: taskStep.title },
        };
      }

      const output = await this.agentService.createTask(tenantId, {
        title: taskStep.title,
        dueDate:
          taskStep.dueDate ?? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      });
      return { action: step.action, success: true, output };
    }

    if (step.action === "RUN_AGENT" || step.action === "RUN_AI_INSIGHT") {
      const request =
        "request" in step
          ? String(step.request)
          : String((step as { aiTaskKey?: string }).aiTaskKey ?? "Generate insight");

      if (dryRun) {
        return { action: step.action, success: true, output: { dryRun: true, request } };
      }

      const output = await this.agentService.run(tenantId, {
        request,
        patientId: context.patientId ? String(context.patientId) : undefined,
        invoiceId: context.invoiceId ? String(context.invoiceId) : undefined,
      });
      return { action: step.action, success: true, output };
    }

    if (step.action === "UPDATE_FIELD") {
      return {
        action: step.action,
        success: true,
        output: dryRun
          ? { dryRun: true, ...(step as Record<string, unknown>) }
          : { updated: false, message: "Field updates are logged for review." },
      };
    }

    return { action: String(step.action), success: false, output: "Unsupported action." };
  }

  private toExecutionStep(action: WorkflowAction): WorkflowStep | { action: string; [key: string]: unknown } {
    const config = action.config ?? {};

    if (action.type === "SEND_NOTIFICATION") {
      return {
        action: "SEND_NOTIFICATION",
        templateId: String(config.templateId ?? "GENERIC_NOTIFICATION"),
        to: config.recipient ? String(config.recipient) : undefined,
        variables: config.variables as Record<string, string> | undefined,
      };
    }

    if (action.type === "CREATE_TASK") {
      const dueOffsetDays = Number(config.dueOffsetDays ?? 2);
      const dueDate = new Date(Date.now() + dueOffsetDays * 24 * 60 * 60 * 1000).toISOString();
      return {
        action: "CREATE_TASK",
        title: String(config.title ?? "Workflow task"),
        dueDate,
      };
    }

    if (action.type === "RUN_AI_INSIGHT") {
      return {
        action: "RUN_AI_INSIGHT",
        aiTaskKey: String(config.aiTaskKey ?? "APPOINTMENT_INSIGHTS"),
        request: String(config.aiTaskKey ?? "Generate AI insight"),
      };
    }

    return {
      action: "UPDATE_FIELD",
      entityType: config.entityType,
      fieldPath: config.fieldPath,
      value: config.value,
    };
  }

  private resolveTriggerLabel(trigger: WorkflowTriggerConfig): string {
    if (trigger.type === "EVENT") {
      return trigger.eventKey ?? "EVENT";
    }
    if (trigger.type === "SCHEDULE") {
      return `SCHEDULE:${trigger.cron ?? ""}`;
    }
    return `THRESHOLD:${trigger.metric ?? ""}`;
  }

  private conditionsMatch(conditions: WorkflowCondition[], context: ExecutionContext): boolean {
    if (!conditions.length) {
      return true;
    }

    let result = this.evaluateCondition(conditions[0], context);

    for (let index = 1; index < conditions.length; index += 1) {
      const condition = conditions[index];
      const value = this.evaluateCondition(condition, context);
      const joinWith = conditions[index - 1].joinWith ?? "AND";

      if (joinWith === "OR") {
        result = result || value;
      } else {
        result = result && value;
      }
    }

    return result;
  }

  private evaluateCondition(condition: WorkflowCondition, context: ExecutionContext): boolean {
    const actual = this.resolveFieldValue(condition.field, context);
    const expected = condition.value;

    switch (condition.operator) {
      case "EQUALS":
        return String(actual) === String(expected);
      case "NOT_EQUALS":
        return String(actual) !== String(expected);
      case "CONTAINS":
        return Array.isArray(actual)
          ? actual.map(String).includes(String(expected))
          : String(actual).includes(String(expected));
      case "GREATER_THAN":
        return Number(actual) > Number(expected);
      case "LESS_THAN":
        return Number(actual) < Number(expected);
      default:
        return false;
    }
  }

  private resolveFieldValue(field: string, context: ExecutionContext): unknown {
    const parts = field.split(".");
    let value: unknown = context;

    for (const part of parts) {
      if (!value || typeof value !== "object") {
        return undefined;
      }
      value = (value as Record<string, unknown>)[part];
    }

    return value;
  }
}
