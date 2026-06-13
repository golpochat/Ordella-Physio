import type { AIWorkflowVersion } from "@/generated/prisma";
import type { WorkflowDefinitionPayload } from "@/validators/workflow.validator";

export type WorkflowVersionDefinition = WorkflowDefinitionPayload & {
  versionMeta?: {
    changeType?: "SAVE" | "ROLLBACK" | "LABEL";
    sourceVersionNumber?: number;
  };
};

export type WorkflowVersionRecord = {
  id: string;
  tenantId: string;
  workflowId: string;
  versionNumber: number;
  label: string | null;
  definition: WorkflowVersionDefinition;
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

export function toWorkflowVersionRecord(version: AIWorkflowVersion): WorkflowVersionRecord {
  return {
    id: version.id,
    tenantId: version.tenantId,
    workflowId: version.workflowId,
    versionNumber: version.versionNumber,
    label: version.label,
    definition:
      version.definition && typeof version.definition === "object"
        ? (version.definition as WorkflowVersionDefinition)
        : ({} as WorkflowVersionDefinition),
    createdByUserId: version.createdByUserId,
    createdAt: version.createdAt.toISOString(),
  };
}
