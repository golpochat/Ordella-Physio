import { Injectable, Logger } from "@nestjs/common";
import { AiWorkflowRunRepository } from "@/repositories/ai-workflow-run.repository";
import { AgentService } from "@/services/agent.service";
import { aiValidationError } from "@/utils/ai-errors";

export type WorkflowTrigger =
  | "APPOINTMENT_MISSED"
  | "INVOICE_OVERDUE"
  | "PATIENT_INACTIVE";

export type WorkflowStep =
  | { action: "SEND_NOTIFICATION"; templateId: string; to?: string; variables?: Record<string, string> }
  | { action: "CREATE_TASK"; title: string; dueDate?: string }
  | { action: "RUN_AGENT"; request: string };

type WorkflowDefinition = {
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
};

const WORKFLOW_DEFINITIONS: Record<WorkflowTrigger, WorkflowDefinition> = {
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

@Injectable()
export class WorkflowOrchestratorService {
  private readonly logger = new Logger(WorkflowOrchestratorService.name);

  constructor(
    private readonly workflowRunRepository: AiWorkflowRunRepository,
    private readonly agentService: AgentService,
  ) {}

  listWorkflows() {
    return Object.values(WORKFLOW_DEFINITIONS).map((workflow) => ({
      trigger: workflow.trigger,
      steps: workflow.steps,
    }));
  }

  async execute(
    tenantId: string,
    trigger: WorkflowTrigger,
    context: { patientId?: string; invoiceId?: string; appointmentId?: string; to?: string },
  ) {
    const definition = WORKFLOW_DEFINITIONS[trigger];
    if (!definition) {
      throw aiValidationError([{ field: "trigger", message: "Unknown workflow trigger." }]);
    }

    const run = await this.workflowRunRepository.create({
      tenantId,
      trigger,
      status: "RUNNING",
      steps: definition.steps as never,
    });

    const stepResults: Array<{ action: string; success: boolean; output: unknown }> = [];

    try {
      for (const step of definition.steps) {
        const result = await this.executeStep(tenantId, step, context);
        stepResults.push(result);
      }

      await this.workflowRunRepository.updateResult(run.id, "COMPLETED", {
        steps: stepResults,
      } as never);

      return {
        runId: run.id,
        trigger,
        status: "COMPLETED",
        steps: stepResults,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Workflow failed.";
      this.logger.warn(`Workflow ${trigger} failed for tenant ${tenantId}`, message);

      await this.workflowRunRepository.updateResult(run.id, "FAILED", {
        steps: stepResults,
        error: message,
      } as never);

      return {
        runId: run.id,
        trigger,
        status: "FAILED",
        steps: stepResults,
        error: message,
      };
    }
  }

  private async executeStep(
    tenantId: string,
    step: WorkflowStep,
    context: { patientId?: string; invoiceId?: string; appointmentId?: string; to?: string },
  ) {
    if (step.action === "SEND_NOTIFICATION") {
      const output = await this.agentService.sendNotification(tenantId, {
        to: step.to ?? context.to ?? "patient@clinic.local",
        templateId: step.templateId,
        variables: step.variables,
      });
      return { action: step.action, success: true, output };
    }

    if (step.action === "CREATE_TASK") {
      const output = await this.agentService.createTask(tenantId, {
        title: step.title,
        dueDate: step.dueDate ?? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      });
      return { action: step.action, success: true, output };
    }

    const output = await this.agentService.run(tenantId, {
      request: step.request,
      patientId: context.patientId,
      invoiceId: context.invoiceId,
    });
    return { action: step.action, success: true, output };
  }
}
