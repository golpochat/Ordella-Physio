import { Injectable } from "@nestjs/common";

import { toWorkflowRecord, toWorkflowRunRecord } from "@/models/ai-workflow";

import { AiWorkflowRepository } from "@/repositories/ai-workflow.repository";

import { AiWorkflowRunRepository } from "@/repositories/ai-workflow-run.repository";

import { WorkflowVersionService } from "@/services/workflow-version.service";

import { aiWorkflowNotFoundError } from "@/utils/ai-errors";

import {

  validateCreateWorkflow,

  validateUpdateWorkflow,

  validateWorkflowRunsQuery,

  type WorkflowDefinitionPayload,

} from "@/validators/workflow.validator";



@Injectable()

export class WorkflowManagementService {

  constructor(

    private readonly workflowRepository: AiWorkflowRepository,

    private readonly workflowRunRepository: AiWorkflowRunRepository,

    private readonly workflowVersionService: WorkflowVersionService,

  ) {}



  async listWorkflows(tenantId: string) {

    const workflows = await this.workflowRepository.listByTenant(tenantId);

    const workflowIds = workflows.map((workflow) => workflow.id);

    const latestRuns = await this.workflowRunRepository.findLatestByWorkflowIds(

      tenantId,

      workflowIds,

    );

    const latestRunByWorkflowId = new Map(

      latestRuns.map((run) => [run.workflowId ?? "", run]),

    );



    return workflows.map((workflow) =>

      toWorkflowRecord(workflow, latestRunByWorkflowId.get(workflow.id)),

    );

  }



  async getWorkflow(tenantId: string, id: string) {

    const workflow = await this.workflowRepository.findById(tenantId, id);

    if (!workflow) {

      throw aiWorkflowNotFoundError();

    }



    const runs = await this.workflowRunRepository.listByWorkflow(tenantId, id, 1);

    return toWorkflowRecord(workflow, runs[0] ?? null);

  }



  async createWorkflow(tenantId: string, body: Record<string, unknown>, userId: string) {

    const payload = validateCreateWorkflow(body);

    const workflow = await this.workflowRepository.create({

      tenantId,

      name: payload.name,

      description: payload.description ?? "",

      isActive: payload.isActive ?? false,

      dryRun: payload.dryRun ?? false,

      trigger: payload.trigger as never,

      conditions: (payload.conditions ?? []) as never,

      actions: payload.actions as never,

    });



    await this.workflowVersionService.createVersion(

      tenantId,

      workflow.id,

      this.workflowVersionService.snapshotFromWorkflow(workflow, "SAVE"),

      userId,

      body.versionLabel ? String(body.versionLabel) : "Initial version",

    );



    return toWorkflowRecord(workflow);

  }



  async updateWorkflow(

    tenantId: string,

    id: string,

    body: Record<string, unknown>,

    userId: string,

  ) {

    const existing = await this.workflowRepository.findById(tenantId, id);

    if (!existing) {

      throw aiWorkflowNotFoundError();

    }



    const payload = validateUpdateWorkflow(body);

    await this.workflowRepository.update(tenantId, id, this.toUpdateData(payload));



    const updated = await this.workflowRepository.findUpdated(tenantId, id);

    if (!updated) {

      throw aiWorkflowNotFoundError();

    }



    await this.workflowVersionService.createVersion(

      tenantId,

      id,

      this.workflowVersionService.snapshotFromWorkflow(updated, "SAVE"),

      userId,

      body.versionLabel ? String(body.versionLabel) : null,

    );



    return toWorkflowRecord(updated);

  }



  async enableWorkflow(tenantId: string, id: string) {

    return this.setWorkflowActive(tenantId, id, true);

  }



  async disableWorkflow(tenantId: string, id: string) {

    return this.setWorkflowActive(tenantId, id, false);

  }



  async listWorkflowRuns(tenantId: string, workflowId: string, query: Record<string, unknown>) {

    const workflow = await this.workflowRepository.findById(tenantId, workflowId);

    if (!workflow) {

      throw aiWorkflowNotFoundError();

    }



    const filters = validateWorkflowRunsQuery(query);

    const result = await this.workflowRunRepository.listPaginated(tenantId, {

      ...filters,

      workflowId,

    });



    return {

      data: result.data.map((run) => toWorkflowRunRecord(run, workflow.name)),

      pagination: result.pagination,

    };

  }



  async listAllRuns(tenantId: string, query: Record<string, unknown>) {

    const filters = validateWorkflowRunsQuery(query);

    const result = await this.workflowRunRepository.listPaginated(tenantId, filters);

    const workflows = await this.workflowRepository.listByTenant(tenantId);

    const workflowNames = new Map(workflows.map((workflow) => [workflow.id, workflow.name]));



    return {

      data: result.data.map((run) =>

        toWorkflowRunRecord(run, run.workflowId ? workflowNames.get(run.workflowId) ?? null : null),

      ),

      pagination: result.pagination,

    };

  }



  private async setWorkflowActive(tenantId: string, id: string, isActive: boolean) {

    const existing = await this.workflowRepository.findById(tenantId, id);

    if (!existing) {

      throw aiWorkflowNotFoundError();

    }



    await this.workflowRepository.setActive(tenantId, id, isActive);

    const updated = await this.workflowRepository.findUpdated(tenantId, id);

    if (!updated) {

      throw aiWorkflowNotFoundError();

    }



    return toWorkflowRecord(updated);

  }



  private toUpdateData(payload: Partial<WorkflowDefinitionPayload>) {

    const data: Record<string, unknown> = {};



    if (payload.name !== undefined) {

      data.name = payload.name;

    }

    if (payload.description !== undefined) {

      data.description = payload.description;

    }

    if (payload.isActive !== undefined) {

      data.isActive = payload.isActive;

    }

    if (payload.dryRun !== undefined) {

      data.dryRun = payload.dryRun;

    }

    if (payload.trigger !== undefined) {

      data.trigger = payload.trigger;

    }

    if (payload.conditions !== undefined) {

      data.conditions = payload.conditions;

    }

    if (payload.actions !== undefined) {

      data.actions = payload.actions;

    }



    return data;

  }

}


