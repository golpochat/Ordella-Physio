import { Injectable } from "@nestjs/common";
import { PERMISSIONS } from "@ordella/security";
import { aiForbiddenError } from "@/utils/ai-errors";
import { AiDatasetAuditRepository, AiDatasetRepository } from "@/repositories/ai-dataset.repository";
import type { Permission } from "@ordella/security";

type GovernanceUser = {
  userId: string;
  permissions?: string[];
  role?: string;
};

@Injectable()
export class DatasetGovernanceService {
  constructor(
    private readonly datasetRepository: AiDatasetRepository,
    private readonly auditRepository: AiDatasetAuditRepository,
  ) {}

  async assertDatasetAccess(
    tenantId: string,
    datasetId: string,
    user: GovernanceUser,
    permission: Permission,
  ) {
    const dataset = await this.datasetRepository.findById(tenantId, datasetId);
    if (!dataset) {
      throw aiForbiddenError("Dataset not found.");
    }

    if (!this.userHasPermission(user, permission)) {
      throw aiForbiddenError("Missing dataset permission.");
    }

    return dataset;
  }

  userHasPermission(user: GovernanceUser, permission: Permission): boolean {
    if (user.role === "SYSTEM") {
      return true;
    }
    if (user.permissions?.includes(permission)) {
      return true;
    }

    const roleMap: Record<string, Permission[]> = {
      ADMIN: [
        PERMISSIONS.AI_DATASET_VIEW,
        PERMISSIONS.AI_DATASET_MANAGE,
        PERMISSIONS.AI_DATASET_LABEL,
      ],
      OWNER: [
        PERMISSIONS.AI_DATASET_VIEW,
        PERMISSIONS.AI_DATASET_MANAGE,
        PERMISSIONS.AI_DATASET_LABEL,
      ],
      THERAPIST: [PERMISSIONS.AI_DATASET_VIEW, PERMISSIONS.AI_DATASET_LABEL],
      STAFF: [PERMISSIONS.AI_DATASET_VIEW],
    };

    const role = user.role ?? "";
    return (roleMap[role] ?? []).includes(permission);
  }

  async auditLog(
    tenantId: string,
    datasetId: string,
    action: string,
    userId: string,
    metadata: Record<string, unknown> = {},
  ) {
    return this.auditRepository.create({
      tenantId,
      datasetId,
      action,
      userId,
      metadata: metadata as never,
    });
  }

  async listAuditLogs(tenantId: string, datasetId: string) {
    const logs = await this.auditRepository.listByDataset(tenantId, datasetId);
    return logs.map((log) => ({
      id: log.id,
      datasetId: log.datasetId,
      action: log.action,
      userId: log.userId,
      metadata:
        log.metadata && typeof log.metadata === "object"
          ? (log.metadata as Record<string, unknown>)
          : {},
      createdAt: log.createdAt.toISOString(),
    }));
  }
}
