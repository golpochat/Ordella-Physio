import { Injectable } from "@nestjs/common";
import type { FeatureFlagType, Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";
import { toExperimentRecord, toAssignmentRecord } from "@/models/Experiment";
import { toFeatureFlagRecord } from "@/models/FeatureFlag";

@Injectable()
export class FeatureFlagRepository {
  constructor(private readonly db: DatabaseService) {}

  list(tenantId: string) {
    return this.db.featureFlag.findMany({ where: { tenantId }, orderBy: { key: "asc" } });
  }

  findByKey(tenantId: string, key: string) {
    return this.db.featureFlag.findUnique({ where: { tenantId_key: { tenantId, key } } });
  }

  findById(id: string) {
    return this.db.featureFlag.findUnique({ where: { id } });
  }

  create(data: {
    tenantId: string;
    key: string;
    type: FeatureFlagType;
    variants?: Prisma.InputJsonValue;
    rollout?: Prisma.InputJsonValue;
    isActive?: boolean;
  }) {
    return this.db.featureFlag.create({ data });
  }

  update(id: string, data: Partial<{
    type: FeatureFlagType;
    variants: Prisma.InputJsonValue;
    rollout: Prisma.InputJsonValue;
    isActive: boolean;
  }>) {
    return this.db.featureFlag.update({ where: { id }, data });
  }

  mapFlags(rows: Awaited<ReturnType<FeatureFlagRepository["list"]>>) {
    return rows.map(toFeatureFlagRecord);
  }
}

@Injectable()
export class ExperimentRepository {
  constructor(private readonly db: DatabaseService) {}

  list(tenantId: string) {
    return this.db.experiment.findMany({ where: { tenantId }, orderBy: { createdAt: "desc" } });
  }

  findById(id: string) {
    return this.db.experiment.findUnique({ where: { id } });
  }

  findRunningByModelKey(tenantId: string, modelKey: string) {
    return this.db.experiment.findFirst({
      where: { tenantId, modelKey, status: "RUNNING" },
    });
  }

  create(data: {
    tenantId: string;
    name: string;
    description?: string;
    variants?: Prisma.InputJsonValue;
    targetAudience?: Prisma.InputJsonValue;
    metricsTracked?: Prisma.InputJsonValue;
    experimentType?: string;
    modelKey?: string;
  }) {
    return this.db.experiment.create({ data });
  }

  updateStatus(id: string, status: "DRAFT" | "RUNNING" | "PAUSED" | "COMPLETED") {
    return this.db.experiment.update({ where: { id }, data: { status } });
  }

  update(id: string, data: Partial<{
    name: string;
    description: string;
    variants: Prisma.InputJsonValue;
    targetAudience: Prisma.InputJsonValue;
    metricsTracked: Prisma.InputJsonValue;
  }>) {
    return this.db.experiment.update({ where: { id }, data });
  }

  getAssignment(experimentId: string, userId: string) {
    return this.db.experimentAssignment.findUnique({
      where: { experimentId_userId: { experimentId, userId } },
    });
  }

  createAssignment(data: { experimentId: string; tenantId: string; userId?: string; variant: string }) {
    return this.db.experimentAssignment.create({ data });
  }

  listAssignments(experimentId: string) {
    return this.db.experimentAssignment.findMany({ where: { experimentId } });
  }

  recordEvent(data: {
    experimentId: string;
    tenantId: string;
    userId?: string;
    variant: string;
    eventType: string;
    payload?: Prisma.InputJsonValue;
  }) {
    return this.db.experimentEvent.create({ data });
  }

  listEvents(experimentId: string) {
    return this.db.experimentEvent.findMany({
      where: { experimentId },
      orderBy: { recordedAt: "desc" },
    });
  }

  mapExperiments(rows: Awaited<ReturnType<ExperimentRepository["list"]>>) {
    return rows.map(toExperimentRecord);
  }

  mapAssignments(rows: Awaited<ReturnType<ExperimentRepository["listAssignments"]>>) {
    return rows.map(toAssignmentRecord);
  }
}
