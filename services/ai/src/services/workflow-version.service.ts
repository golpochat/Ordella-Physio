import { Injectable } from "@nestjs/common";
import {
  toWorkflowVersionRecord,
  type WorkflowVersionDefinition,
  type WorkflowVersionDiffEntry,
  type WorkflowVersionDiffResult,
  type WorkflowVersionRecord,
} from "@/models/WorkflowVersion";
import { toWorkflowRecord, toWorkflowPayload } from "@/models/ai-workflow";
import { AiWorkflowRepository } from "@/repositories/ai-workflow.repository";
import { AiWorkflowVersionRepository } from "@/repositories/ai-workflow-version.repository";
import { aiValidationError, aiWorkflowNotFoundError } from "@/utils/ai-errors";

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function flattenJson(value: unknown, prefix = ""): Record<string, unknown> {
  if (Array.isArray(value)) {
    return { [prefix || "$"]: value };
  }

  if (!isObject(value)) {
    return { [prefix || "$"]: value };
  }

  const entries: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (isObject(nested) || Array.isArray(nested)) {
      Object.assign(entries, flattenJson(nested, path));
    } else {
      entries[path] = nested;
    }
  }

  return entries;
}

function buildJsonDiff(
  left: unknown,
  right: unknown,
): Pick<WorkflowVersionDiffResult, "added" | "removed" | "changed"> {
  const leftFlat = flattenJson(left);
  const rightFlat = flattenJson(right);
  const added: WorkflowVersionDiffEntry[] = [];
  const removed: WorkflowVersionDiffEntry[] = [];
  const changed: WorkflowVersionDiffEntry[] = [];

  for (const [path, newValue] of Object.entries(rightFlat)) {
    if (!(path in leftFlat)) {
      added.push({ path, type: "added", newValue });
      continue;
    }

    const oldValue = leftFlat[path];
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      changed.push({ path, type: "changed", oldValue, newValue });
    }
  }

  for (const [path, oldValue] of Object.entries(leftFlat)) {
    if (!(path in rightFlat)) {
      removed.push({ path, type: "removed", oldValue });
    }
  }

  return { added, removed, changed };
}

@Injectable()
export class WorkflowVersionService {
  constructor(
    private readonly workflowRepository: AiWorkflowRepository,
    private readonly workflowVersionRepository: AiWorkflowVersionRepository,
  ) {}

  async createVersion(
    tenantId: string,
    workflowId: string,
    definition: WorkflowVersionDefinition,
    userId: string,
    label?: string | null,
  ): Promise<WorkflowVersionRecord> {
    await this.requireWorkflow(tenantId, workflowId);

    const max = await this.workflowVersionRepository.getMaxVersionNumber(workflowId);
    const versionNumber = (max._max.versionNumber ?? 0) + 1;

    const saved = await this.workflowVersionRepository.create({
      tenantId,
      workflowId,
      versionNumber,
      label: label ?? null,
      definition: definition as never,
      createdByUserId: userId,
    });

    return toWorkflowVersionRecord(saved);
  }

  async getVersions(tenantId: string, workflowId: string) {
    await this.requireWorkflow(tenantId, workflowId);
    const versions = await this.workflowVersionRepository.listByWorkflow(tenantId, workflowId);
    return versions.map(toWorkflowVersionRecord);
  }

  async getVersion(tenantId: string, workflowId: string, versionNumber: number) {
    const version = await this.workflowVersionRepository.findByWorkflowAndNumber(
      tenantId,
      workflowId,
      versionNumber,
    );
    if (!version) {
      throw aiValidationError([
        { field: "versionNumber", message: "Workflow version not found." },
      ]);
    }
    return toWorkflowVersionRecord(version);
  }

  async diffVersions(
    tenantId: string,
    workflowId: string,
    fromVersion: number,
    toVersion: number,
  ): Promise<WorkflowVersionDiffResult> {
    const [left, right] = await Promise.all([
      this.getVersion(tenantId, workflowId, fromVersion),
      this.getVersion(tenantId, workflowId, toVersion),
    ]);

    const diff = buildJsonDiff(left.definition, right.definition);

    return {
      workflowId,
      fromVersion,
      toVersion,
      ...diff,
    };
  }

  async updateVersionLabel(
    tenantId: string,
    workflowId: string,
    versionNumber: number,
    label: string | null,
  ) {
    await this.getVersion(tenantId, workflowId, versionNumber);
    await this.workflowVersionRepository.updateLabel(tenantId, workflowId, versionNumber, label);
    return this.getVersion(tenantId, workflowId, versionNumber);
  }

  async rollbackToVersion(
    tenantId: string,
    workflowId: string,
    versionNumber: number,
    userId: string,
  ) {
    const version = await this.getVersion(tenantId, workflowId, versionNumber);
    const { versionMeta: _meta, ...definition } = version.definition;

    await this.workflowRepository.update(tenantId, workflowId, {
      name: definition.name,
      description: definition.description ?? "",
      isActive: definition.isActive ?? false,
      dryRun: definition.dryRun ?? false,
      trigger: definition.trigger as never,
      conditions: (definition.conditions ?? []) as never,
      actions: definition.actions as never,
    });

    const updated = await this.workflowRepository.findUpdated(tenantId, workflowId);
    if (!updated) {
      throw aiWorkflowNotFoundError();
    }

    await this.createVersion(
      tenantId,
      workflowId,
      {
        ...toWorkflowPayload(updated),
        versionMeta: { changeType: "ROLLBACK", sourceVersionNumber: versionNumber },
      },
      userId,
      `Rollback from v${versionNumber}`,
    );

    return toWorkflowRecord(updated);
  }

  snapshotFromWorkflow(
    workflow: Awaited<ReturnType<AiWorkflowRepository["findById"]>>,
    changeType: "SAVE" | "ROLLBACK" = "SAVE",
  ): WorkflowVersionDefinition {
    if (!workflow) {
      throw aiWorkflowNotFoundError();
    }
    return {
      ...toWorkflowPayload(workflow),
      versionMeta: { changeType },
    };
  }

  private async requireWorkflow(tenantId: string, workflowId: string) {
    const workflow = await this.workflowRepository.findById(tenantId, workflowId);
    if (!workflow) {
      throw aiWorkflowNotFoundError();
    }
    return workflow;
  }
}
