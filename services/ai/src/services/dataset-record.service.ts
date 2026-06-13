import { Injectable } from "@nestjs/common";
import { PERMISSIONS } from "@ordella/security";
import type { AIDatasetLabel } from "@/generated/prisma";
import {
  toDatasetLabelRecord,
  toDatasetRecordItem,
} from "@/models/AIDatasetRecord";
import {
  AiDatasetLabelRepository,
  AiDatasetRecordRepository,
  AiDatasetVersionRepository,
} from "@/repositories/ai-dataset.repository";
import { DatasetGovernanceService } from "@/services/dataset-governance.service";
import {
  validateBulkRecords,
  validateLabelInput,
  validateRecordInput,
} from "@/validators/dataset.validator";

@Injectable()
export class DatasetRecordService {
  constructor(
    private readonly recordRepository: AiDatasetRecordRepository,
    private readonly versionRepository: AiDatasetVersionRepository,
    private readonly labelRepository: AiDatasetLabelRepository,
    private readonly governanceService: DatasetGovernanceService,
  ) {}

  async listRecords(
    tenantId: string,
    datasetId: string,
    versionId: string,
    user: { userId: string; permissions?: string[]; role?: string },
    search?: string,
  ) {
    await this.governanceService.assertDatasetAccess(
      tenantId,
      datasetId,
      user,
      PERMISSIONS.AI_DATASET_VIEW,
    );
    const version = await this.versionRepository.findById(tenantId, versionId);
    if (!version || version.datasetId !== datasetId) {
      throw new Error("Version not found.");
    }

    const records = await this.recordRepository.listByVersion(tenantId, versionId, search);
    const labels = await this.labelRepository.listByRecords(records.map((record) => record.id));
    const labelsByRecord = labels.reduce<Record<string, AIDatasetLabel[]>>((acc, label) => {
      acc[label.recordId] = acc[label.recordId] ?? [];
      acc[label.recordId].push(label);
      return acc;
    }, {});

    return records.map((record) =>
      toDatasetRecordItem(record, labelsByRecord[record.id] ?? []),
    );
  }

  async addRecord(
    tenantId: string,
    datasetId: string,
    versionId: string,
    body: Record<string, unknown>,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    await this.governanceService.assertDatasetAccess(
      tenantId,
      datasetId,
      user,
      PERMISSIONS.AI_DATASET_MANAGE,
    );
    const version = await this.versionRepository.findById(tenantId, versionId);
    if (!version || version.datasetId !== datasetId) {
      throw new Error("Version not found.");
    }

    const payload = validateRecordInput(body);
    const record = await this.recordRepository.create({
      tenantId,
      datasetId,
      versionId,
      input: payload.input as never,
      output: payload.output as never,
      metadata: payload.metadata as never,
    });

    const count = await this.recordRepository.countByVersion(versionId);
    await this.versionRepository.updateRecordCount(versionId, count);
    await this.governanceService.auditLog(tenantId, datasetId, "RECORD_ADDED", user.userId, {
      recordId: record.id,
      versionId,
    });

    return toDatasetRecordItem(record, []);
  }

  async bulkAddRecords(
    tenantId: string,
    datasetId: string,
    versionId: string,
    body: Record<string, unknown>,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    await this.governanceService.assertDatasetAccess(
      tenantId,
      datasetId,
      user,
      PERMISSIONS.AI_DATASET_MANAGE,
    );
    const version = await this.versionRepository.findById(tenantId, versionId);
    if (!version || version.datasetId !== datasetId) {
      throw new Error("Version not found.");
    }

    const records = validateBulkRecords(body);
    await this.recordRepository.createMany(
      records.map((record) => ({
        tenantId,
        datasetId,
        versionId,
        input: record.input as never,
        output: record.output as never,
        metadata: record.metadata as never,
      })),
    );

    const count = await this.recordRepository.countByVersion(versionId);
    await this.versionRepository.updateRecordCount(versionId, count);
    await this.governanceService.auditLog(tenantId, datasetId, "RECORDS_BULK_ADDED", user.userId, {
      versionId,
      count: records.length,
    });

    return { added: records.length, recordCount: count };
  }

  async updateRecord(
    tenantId: string,
    recordId: string,
    body: Record<string, unknown>,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    const existing = await this.recordRepository.findById(tenantId, recordId);
    if (!existing) {
      throw new Error("Record not found.");
    }

    await this.governanceService.assertDatasetAccess(
      tenantId,
      existing.datasetId,
      user,
      PERMISSIONS.AI_DATASET_MANAGE,
    );

    const payload = validateRecordInput({ ...existing, ...body });
    await this.recordRepository.update(tenantId, recordId, {
      input: payload.input as never,
      output: payload.output as never,
      metadata: payload.metadata as never,
    });

    await this.governanceService.auditLog(
      tenantId,
      existing.datasetId,
      "RECORD_UPDATED",
      user.userId,
      { recordId },
    );

    const updated = await this.recordRepository.findById(tenantId, recordId);
    const labels = await this.labelRepository.listByRecord(recordId);
    return toDatasetRecordItem(updated!, labels);
  }

  async deleteRecord(
    tenantId: string,
    recordId: string,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    const existing = await this.recordRepository.findById(tenantId, recordId);
    if (!existing) {
      throw new Error("Record not found.");
    }

    await this.governanceService.assertDatasetAccess(
      tenantId,
      existing.datasetId,
      user,
      PERMISSIONS.AI_DATASET_MANAGE,
    );

    await this.recordRepository.delete(tenantId, recordId);
    const count = await this.recordRepository.countByVersion(existing.versionId);
    await this.versionRepository.updateRecordCount(existing.versionId, count);
    await this.governanceService.auditLog(
      tenantId,
      existing.datasetId,
      "RECORD_DELETED",
      user.userId,
      { recordId },
    );

    return { deleted: true, recordCount: count };
  }

  async addLabel(
    tenantId: string,
    recordId: string,
    body: Record<string, unknown>,
    user: { userId: string; permissions?: string[]; role?: string },
  ) {
    const existing = await this.recordRepository.findById(tenantId, recordId);
    if (!existing) {
      throw new Error("Record not found.");
    }

    await this.governanceService.assertDatasetAccess(
      tenantId,
      existing.datasetId,
      user,
      PERMISSIONS.AI_DATASET_LABEL,
    );

    const payload = validateLabelInput(body);
    const label = await this.labelRepository.create({
      tenantId,
      recordId,
      labelType: payload.labelType,
      labelValue: payload.labelValue as never,
      createdByUserId: user.userId,
    });

    await this.governanceService.auditLog(
      tenantId,
      existing.datasetId,
      "LABEL_ADDED",
      user.userId,
      { recordId, labelType: payload.labelType },
    );

    return toDatasetLabelRecord(label);
  }
}
