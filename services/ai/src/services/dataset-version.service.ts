import { Injectable } from "@nestjs/common";
import { PERMISSIONS } from "@ordella/security";
import { toDatasetVersionRecord, type DatasetVersionDiffResult } from "@/models/AIDatasetVersion";
import { inputToText } from "@/models/AIDatasetRecord";
import {
  AiDatasetRecordRepository,
  AiDatasetVersionRepository,
} from "@/repositories/ai-dataset.repository";
import { DatasetGovernanceService } from "@/services/dataset-governance.service";

@Injectable()
export class DatasetVersionService {
  constructor(
    private readonly versionRepository: AiDatasetVersionRepository,
    private readonly recordRepository: AiDatasetRecordRepository,
    private readonly governanceService: DatasetGovernanceService,
  ) {}

  async createVersion(
    tenantId: string,
    datasetId: string,
    userId: string,
    copyFromVersionId?: string,
  ) {
    await this.governanceService.assertDatasetAccess(
      tenantId,
      datasetId,
      { userId },
      PERMISSIONS.AI_DATASET_MANAGE,
    );

    const max = await this.versionRepository.getMaxVersionNumber(datasetId);
    const versionNumber = (max._max.versionNumber ?? 0) + 1;

    const version = await this.versionRepository.create({
      tenantId,
      datasetId,
      versionNumber,
      recordCount: 0,
      createdByUserId: userId,
    });

    if (copyFromVersionId) {
      const sourceRecords = await this.recordRepository.listByVersion(tenantId, copyFromVersionId);
      if (sourceRecords.length) {
        await this.recordRepository.createMany(
          sourceRecords.map((record) => ({
            tenantId,
            datasetId,
            versionId: version.id,
            input: record.input as never,
            output: record.output as never,
            metadata: record.metadata as never,
            embedding: record.embedding as never,
          })),
        );
        await this.versionRepository.updateRecordCount(version.id, sourceRecords.length);
        version.recordCount = sourceRecords.length;
      }
    }

    await this.governanceService.auditLog(tenantId, datasetId, "VERSION_CREATED", userId, {
      versionNumber,
      versionId: version.id,
    });

    return toDatasetVersionRecord(version);
  }

  async listVersions(
    tenantId: string,
    datasetId: string,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    await this.governanceService.assertDatasetAccess(
      tenantId,
      datasetId,
      user,
      PERMISSIONS.AI_DATASET_VIEW,
    );
    const versions = await this.versionRepository.listByDataset(tenantId, datasetId);
    return versions.map(toDatasetVersionRecord);
  }

  async getVersion(
    tenantId: string,
    datasetId: string,
    versionNumber: number,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    await this.governanceService.assertDatasetAccess(
      tenantId,
      datasetId,
      user,
      PERMISSIONS.AI_DATASET_VIEW,
    );
    const version = await this.versionRepository.findByNumber(tenantId, datasetId, versionNumber);
    if (!version) {
      throw new Error("Version not found.");
    }
    return toDatasetVersionRecord(version);
  }

  async getVersionById(tenantId: string, versionId: string) {
    const version = await this.versionRepository.findById(tenantId, versionId);
    if (!version) {
      throw new Error("Version not found.");
    }
    return version;
  }

  async rollbackVersion(
    tenantId: string,
    datasetId: string,
    versionNumber: number,
    userId: string,
  ) {
    const source = await this.getVersion(tenantId, datasetId, versionNumber, { userId });
    const sourceVersion = await this.versionRepository.findByNumber(tenantId, datasetId, versionNumber);
    const created = await this.createVersion(tenantId, datasetId, userId, sourceVersion!.id);

    await this.governanceService.auditLog(tenantId, datasetId, "VERSION_ROLLBACK", userId, {
      fromVersion: source.versionNumber,
      toVersion: created.versionNumber,
    });

    return created;
  }

  async computeDiff(
    tenantId: string,
    datasetId: string,
    fromVersion: number,
    toVersion: number,
    user: { userId: string; permissions?: string[]; role?: string },
  ): Promise<DatasetVersionDiffResult> {
    await this.governanceService.assertDatasetAccess(
      tenantId,
      datasetId,
      user,
      PERMISSIONS.AI_DATASET_VIEW,
    );

    const leftVersion = await this.versionRepository.findByNumber(tenantId, datasetId, fromVersion);
    const rightVersion = await this.versionRepository.findByNumber(tenantId, datasetId, toVersion);
    if (!leftVersion || !rightVersion) {
      throw new Error("Version not found.");
    }

    const [leftRecords, rightRecords] = await Promise.all([
      this.recordRepository.listByVersion(tenantId, leftVersion.id),
      this.recordRepository.listByVersion(tenantId, rightVersion.id),
    ]);

    const leftByKey = new Map(leftRecords.map((record, index) => [inputToText(record.input), record]));
    const rightByKey = new Map(
      rightRecords.map((record, index) => [inputToText(record.input), record]),
    );

    const details: DatasetVersionDiffResult["details"] = [];
    let addedRecords = 0;
    let removedRecords = 0;
    let changedRecords = 0;

    for (const [key, record] of rightByKey.entries()) {
      const previous = leftByKey.get(key);
      if (!previous) {
        addedRecords += 1;
        details.push({ type: "added", recordId: record.id, input: record.input });
        continue;
      }
      if (JSON.stringify(previous.output) !== JSON.stringify(record.output)) {
        changedRecords += 1;
        details.push({
          type: "changed",
          recordId: record.id,
          input: record.input,
          previousInput: previous.input,
        });
      }
    }

    for (const [key, record] of leftByKey.entries()) {
      if (!rightByKey.has(key)) {
        removedRecords += 1;
        details.push({ type: "removed", recordId: record.id, input: record.input });
      }
    }

    return {
      datasetId,
      fromVersion,
      toVersion,
      addedRecords,
      removedRecords,
      changedRecords,
      details,
    };
  }
}
