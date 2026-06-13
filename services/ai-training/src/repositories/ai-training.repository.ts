import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiTrainingJobRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AITrainingJobUncheckedCreateInput) {
    return this.database.aITrainingJob.create({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.aITrainingJob.findFirst({ where: { id, tenantId } });
  }

  findByIdOnly(id: string) {
    return this.database.aITrainingJob.findUnique({ where: { id } });
  }

  listByTenant(tenantId: string) {
    return this.database.aITrainingJob.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
    });
  }

  update(tenantId: string, id: string, data: Prisma.AITrainingJobUpdateInput) {
    return this.database.aITrainingJob.updateMany({ where: { id, tenantId }, data });
  }

  updateById(id: string, data: Prisma.AITrainingJobUpdateInput) {
    return this.database.aITrainingJob.update({ where: { id }, data });
  }
}

@Injectable()
export class AiModelRegistryRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIModelRegistryUncheckedCreateInput) {
    return this.database.aIModelRegistry.create({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.aIModelRegistry.findFirst({ where: { id, tenantId } });
  }

  listByTenant(tenantId: string) {
    return this.database.aIModelRegistry.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
    });
  }

  update(tenantId: string, id: string, data: Prisma.AIModelRegistryUpdateInput) {
    return this.database.aIModelRegistry.updateMany({ where: { id, tenantId }, data });
  }
}

@Injectable()
export class AiTrainingExperimentRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AITrainingExperimentUncheckedCreateInput) {
    return this.database.aITrainingExperiment.create({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.aITrainingExperiment.findFirst({ where: { id, tenantId } });
  }

  listByJob(tenantId: string, trainingJobId: string) {
    return this.database.aITrainingExperiment.findMany({
      where: { tenantId, trainingJobId },
      orderBy: { startedAt: "desc" },
    });
  }

  listByIds(tenantId: string, ids: string[]) {
    if (!ids.length) {
      return [];
    }
    return this.database.aITrainingExperiment.findMany({
      where: { tenantId, id: { in: ids } },
    });
  }

  update(tenantId: string, id: string, data: Prisma.AITrainingExperimentUpdateInput) {
    return this.database.aITrainingExperiment.updateMany({ where: { id, tenantId }, data });
  }

  updateById(id: string, data: Prisma.AITrainingExperimentUpdateInput) {
    return this.database.aITrainingExperiment.update({ where: { id }, data });
  }
}

@Injectable()
export class AiTrainingCheckpointRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AITrainingCheckpointUncheckedCreateInput) {
    return this.database.aITrainingCheckpoint.create({ data });
  }

  findByNumber(tenantId: string, trainingJobId: string, checkpointNumber: number) {
    return this.database.aITrainingCheckpoint.findFirst({
      where: { tenantId, trainingJobId, checkpointNumber },
    });
  }

  listByJob(tenantId: string, trainingJobId: string) {
    return this.database.aITrainingCheckpoint.findMany({
      where: { tenantId, trainingJobId },
      orderBy: { checkpointNumber: "asc" },
    });
  }

  getMaxCheckpointNumber(trainingJobId: string) {
    return this.database.aITrainingCheckpoint.aggregate({
      where: { trainingJobId },
      _max: { checkpointNumber: true },
    });
  }
}

@Injectable()
export class AiModelEvaluationRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIModelEvaluationUncheckedCreateInput) {
    return this.database.aIModelEvaluation.create({ data });
  }

  findById(tenantId: string, id: string) {
    return this.database.aIModelEvaluation.findFirst({ where: { id, tenantId } });
  }

  findLatestByModel(tenantId: string, modelId: string) {
    return this.database.aIModelEvaluation.findFirst({
      where: { tenantId, modelId },
      orderBy: { createdAt: "desc" },
    });
  }

  listByModel(tenantId: string, modelId: string) {
    return this.database.aIModelEvaluation.findMany({
      where: { tenantId, modelId },
      orderBy: { createdAt: "desc" },
    });
  }
}

@Injectable()
export class AiModelPromotionRepository {
  constructor(private readonly database: DatabaseService) {}

  create(data: Prisma.AIModelPromotionUncheckedCreateInput) {
    return this.database.aIModelPromotion.create({ data });
  }

  findByModelId(tenantId: string, modelId: string) {
    return this.database.aIModelPromotion.findFirst({ where: { tenantId, modelId } });
  }

  findProductionByTenant(tenantId: string) {
    return this.database.aIModelPromotion.findFirst({
      where: { tenantId, stage: "PRODUCTION" },
      orderBy: { updatedAt: "desc" },
    });
  }

  upsertByModelId(
    tenantId: string,
    modelId: string,
    create: Prisma.AIModelPromotionUncheckedCreateInput,
    update: Prisma.AIModelPromotionUpdateInput,
  ) {
    return this.database.aIModelPromotion.upsert({
      where: { modelId },
      create,
      update,
    });
  }

  update(tenantId: string, modelId: string, data: Prisma.AIModelPromotionUpdateInput) {
    return this.database.aIModelPromotion.updateMany({ where: { modelId, tenantId }, data });
  }
}
