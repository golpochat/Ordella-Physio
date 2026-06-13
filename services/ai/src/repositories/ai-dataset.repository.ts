import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiDatasetRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIDatasetCreateInput) {
    return this.database.aIDataset.create({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.aIDataset.findFirst({ where: { id, tenantId } });
  }

  listByTenant(tenantId: string) {
    return this.database.aIDataset.findMany({
      where: { tenantId },
      orderBy: { updatedAt: "desc" },
    });
  }

  update(tenantId: string, id: string, data: Prisma.AIDatasetUpdateInput) {
    return this.database.aIDataset.updateMany({ where: { id, tenantId }, data });
  }

  delete(tenantId: string, id: string) {
    return this.database.aIDataset.deleteMany({ where: { id, tenantId } });
  }
}

@Injectable()
export class AiDatasetVersionRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIDatasetVersionUncheckedCreateInput) {
    return this.database.aIDatasetVersion.create({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.aIDatasetVersion.findFirst({ where: { id, tenantId } });
  }

  findByNumber(tenantId: string, datasetId: string, versionNumber: number) {
    return this.database.aIDatasetVersion.findFirst({
      where: { tenantId, datasetId, versionNumber },
    });
  }

  listByDataset(tenantId: string, datasetId: string) {
    return this.database.aIDatasetVersion.findMany({
      where: { tenantId, datasetId },
      orderBy: { versionNumber: "desc" },
    });
  }

  getLatest(tenantId: string, datasetId: string) {
    return this.database.aIDatasetVersion.findFirst({
      where: { tenantId, datasetId },
      orderBy: { versionNumber: "desc" },
    });
  }

  getMaxVersionNumber(datasetId: string) {
    return this.database.aIDatasetVersion.aggregate({
      where: { datasetId },
      _max: { versionNumber: true },
    });
  }

  updateRecordCount(id: string, recordCount: number) {
    return this.database.aIDatasetVersion.update({
      where: { id },
      data: { recordCount },
    });
  }

  updateEmbeddingModel(id: string, embeddingModel: string) {
    return this.database.aIDatasetVersion.update({
      where: { id },
      data: { embeddingModel },
    });
  }
}

@Injectable()
export class AiDatasetRecordRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIDatasetRecordUncheckedCreateInput) {
    return this.database.aIDatasetRecord.create({ data });
  }

  createMany(data: Prisma.AIDatasetRecordCreateManyInput[]) {
    return this.database.aIDatasetRecord.createMany({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.aIDatasetRecord.findFirst({ where: { id, tenantId } });
  }

  listByVersion(tenantId: string, versionId: string, _search?: string) {
    return this.database.aIDatasetRecord.findMany({
      where: { tenantId, versionId },
      orderBy: { createdAt: "asc" },
    });
  }

  update(tenantId: string, id: string, data: Prisma.AIDatasetRecordUpdateInput) {
    return this.database.aIDatasetRecord.updateMany({ where: { id, tenantId }, data });
  }

  delete(tenantId: string, id: string) {
    return this.database.aIDatasetRecord.deleteMany({ where: { id, tenantId } });
  }

  countByVersion(versionId: string) {
    return this.database.aIDatasetRecord.count({ where: { versionId } });
  }

  updateEmbedding(id: string, embedding: Prisma.InputJsonValue) {
    return this.database.aIDatasetRecord.update({
      where: { id },
      data: { embedding },
    });
  }
}

@Injectable()
export class AiDatasetLabelRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIDatasetLabelUncheckedCreateInput) {
    return this.database.aIDatasetLabel.create({ data });
  }

  listByRecord(recordId: string) {
    return this.database.aIDatasetLabel.findMany({
      where: { recordId },
      orderBy: { createdAt: "desc" },
    });
  }

  listByRecords(recordIds: string[]) {
    if (!recordIds.length) {
      return [];
    }
    return this.database.aIDatasetLabel.findMany({
      where: { recordId: { in: recordIds } },
      orderBy: { createdAt: "desc" },
    });
  }
}

@Injectable()
export class AiDatasetAuditRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: {
    tenantId: string;
    datasetId: string;
    action: string;
    userId: string;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.database.aIDatasetAuditLog.create({ data });
  }

  listByDataset(tenantId: string, datasetId: string, limit = 100) {
    return this.database.aIDatasetAuditLog.findMany({
      where: { tenantId, datasetId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}
