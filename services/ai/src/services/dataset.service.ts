import { Injectable } from "@nestjs/common";
import { PERMISSIONS } from "@ordella/security";
import { toDatasetRecord } from "@/models/AIDataset";
import { toDatasetVersionRecord } from "@/models/AIDatasetVersion";
import { toDatasetRecordItem } from "@/models/AIDatasetRecord";
import {
  AiDatasetRecordRepository,
  AiDatasetRepository,
  AiDatasetVersionRepository,
} from "@/repositories/ai-dataset.repository";
import { DatasetGovernanceService } from "@/services/dataset-governance.service";
import { DatasetVersionService } from "@/services/dataset-version.service";
import {
  validateCreateDataset,
  validateImportDataset,
  validateUpdateDataset,
} from "@/validators/dataset.validator";

@Injectable()
export class DatasetService {
  constructor(
    private readonly datasetRepository: AiDatasetRepository,
    private readonly versionRepository: AiDatasetVersionRepository,
    private readonly recordRepository: AiDatasetRecordRepository,
    private readonly versionService: DatasetVersionService,
    private readonly governanceService: DatasetGovernanceService,
  ) {}

  async createDataset(
    tenantId: string,
    body: Record<string, unknown>,
    userId: string,
  ) {
    const payload = validateCreateDataset(body);
    const dataset = await this.datasetRepository.create({
      tenantId,
      name: payload.name,
      description: payload.description,
      type: payload.type,
      tags: payload.tags,
      createdByUserId: userId,
    });

    const version = await this.versionService.createVersion(tenantId, dataset.id, userId);

    if (payload.records.length) {
      await this.recordRepository.createMany(
        payload.records.map((record: { input: unknown; output?: unknown; metadata?: Record<string, unknown> }) => ({
          tenantId,
          datasetId: dataset.id,
          versionId: version.id,
          input: record.input as never,
          output: (record.output ?? null) as never,
          metadata: (record.metadata ?? {}) as never,
        })),
      );
      const count = await this.recordRepository.countByVersion(version.id);
      await this.versionRepository.updateRecordCount(version.id, count);
    }

    await this.governanceService.auditLog(tenantId, dataset.id, "DATASET_CREATED", userId, {
      name: dataset.name,
    });

    return toDatasetRecord(dataset, {
      latestVersionNumber: version.versionNumber,
      recordCount: payload.records.length,
    });
  }

  async listDatasets(tenantId: string, user: { userId: string; permissions?: string[]; role?: string }) {
    if (!this.governanceService.userHasPermission(user, PERMISSIONS.AI_DATASET_VIEW)) {
      throw new Error("Missing dataset permission.");
    }

    const datasets = await this.datasetRepository.listByTenant(tenantId);
    const enriched = await Promise.all(
      datasets.map(async (dataset) => {
        const latest = await this.versionRepository.getLatest(tenantId, dataset.id);
        return toDatasetRecord(dataset, {
          latestVersionNumber: latest?.versionNumber,
          recordCount: latest?.recordCount,
        });
      }),
    );
    return enriched;
  }

  async getDataset(
    tenantId: string,
    id: string,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    const dataset = await this.governanceService.assertDatasetAccess(
      tenantId,
      id,
      user,
      PERMISSIONS.AI_DATASET_VIEW,
    );
    const latest = await this.versionRepository.getLatest(tenantId, id);
    const auditLogs = await this.governanceService.listAuditLogs(tenantId, id);
    return {
      ...toDatasetRecord(dataset, {
        latestVersionNumber: latest?.versionNumber,
        recordCount: latest?.recordCount,
      }),
      auditLogs,
    };
  }

  async updateDataset(
    tenantId: string,
    id: string,
    body: Record<string, unknown>,
    userId: string,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    await this.governanceService.assertDatasetAccess(
      tenantId,
      id,
      user,
      PERMISSIONS.AI_DATASET_MANAGE,
    );
    const payload = validateUpdateDataset(body);
    await this.datasetRepository.update(tenantId, id, payload);
    await this.governanceService.auditLog(tenantId, id, "DATASET_UPDATED", userId, payload);

    const updated = await this.datasetRepository.findById(tenantId, id);
    const latest = await this.versionRepository.getLatest(tenantId, id);
    return toDatasetRecord(updated!, {
      latestVersionNumber: latest?.versionNumber,
      recordCount: latest?.recordCount,
    });
  }

  async deleteDataset(
    tenantId: string,
    id: string,
    userId: string,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    await this.governanceService.assertDatasetAccess(
      tenantId,
      id,
      user,
      PERMISSIONS.AI_DATASET_MANAGE,
    );
    await this.governanceService.auditLog(tenantId, id, "DATASET_DELETED", userId, {});
    await this.datasetRepository.delete(tenantId, id);
    return { deleted: true };
  }

  async cloneDataset(
    tenantId: string,
    id: string,
    userId: string,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    const source = await this.governanceService.assertDatasetAccess(
      tenantId,
      id,
      user,
      PERMISSIONS.AI_DATASET_MANAGE,
    );
    const latest = await this.versionRepository.getLatest(tenantId, id);

    const cloned = await this.datasetRepository.create({
      tenantId,
      name: `${source.name} (copy)`,
      description: source.description,
      type: source.type,
      tags: source.tags,
      createdByUserId: userId,
    });

    const version = await this.versionService.createVersion(
      tenantId,
      cloned.id,
      userId,
      latest?.id,
    );

    await this.governanceService.auditLog(tenantId, cloned.id, "DATASET_CLONED", userId, {
      sourceDatasetId: id,
    });

    return toDatasetRecord(cloned, {
      latestVersionNumber: version.versionNumber,
      recordCount: version.recordCount,
    });
  }

  async exportDataset(
    tenantId: string,
    id: string,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    const dataset = await this.governanceService.assertDatasetAccess(
      tenantId,
      id,
      user,
      PERMISSIONS.AI_DATASET_VIEW,
    );
    const latest = await this.versionRepository.getLatest(tenantId, id);
    const records = latest
      ? await this.recordRepository.listByVersion(tenantId, latest.id)
      : [];

    await this.governanceService.auditLog(tenantId, id, "DATASET_EXPORTED", user.userId, {
      recordCount: records.length,
    });

    return {
      dataset: toDatasetRecord(dataset),
      version: latest ? toDatasetVersionRecord(latest) : null,
      records: records.map((record) => toDatasetRecordItem(record)),
      exportedAt: new Date().toISOString(),
    };
  }

  async importDataset(
    tenantId: string,
    body: Record<string, unknown>,
    userId: string,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    if (!this.governanceService.userHasPermission(user, PERMISSIONS.AI_DATASET_MANAGE)) {
      throw new Error("Missing dataset permission.");
    }

    const payload = validateImportDataset(body);
    return this.createDataset(
      tenantId,
      {
        name: payload.name,
        description: payload.description,
        type: payload.type,
        tags: payload.tags,
        records: payload.records,
      },
      userId,
    );
  }
}
