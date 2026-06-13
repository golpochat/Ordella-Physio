import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { toExperimentRecord, type ExperimentVariant } from "@/models/Experiment";
import { ExperimentRepository } from "@/repositories/feature-flag.repository";
import { ExperimentAssignmentService } from "@/services/experiment-assignment.service";
import { ExperimentAnalyticsService } from "@/services/experiment-analytics.service";
import { AiExperimentRoutingClient } from "@/integrations/ai-experiment-routing.client";

@Injectable()
export class ExperimentService {
  constructor(
    private readonly repository: ExperimentRepository,
    private readonly assignmentService: ExperimentAssignmentService,
    private readonly analyticsService: ExperimentAnalyticsService,
    private readonly routingClient: AiExperimentRoutingClient,
  ) {}

  async listExperiments(tenantId: string) {
    return this.repository.mapExperiments(await this.repository.list(tenantId));
  }

  async getExperiment(tenantId: string, id: string) {
    const row = await this.repository.findById(id);
    if (!row || row.tenantId !== tenantId) return null;
    return toExperimentRecord(row);
  }

  async createExperiment(tenantId: string, input: {
    name: string;
    description?: string;
    variants?: ExperimentVariant[];
    targetAudience?: Record<string, unknown>;
    metricsTracked?: string[];
    experimentType?: string;
    modelKey?: string;
  }) {
    const row = await this.repository.create({
      tenantId,
      name: input.name,
      description: input.description,
      variants: (input.variants ?? [{ key: "A", weight: 50 }, { key: "B", weight: 50 }]) as Prisma.InputJsonValue,
      targetAudience: (input.targetAudience ?? {}) as Prisma.InputJsonValue,
      metricsTracked: (input.metricsTracked ?? ["conversion", "engagement"]) as Prisma.InputJsonValue,
      experimentType: input.experimentType ?? "AB",
      modelKey: input.modelKey,
    });
    return toExperimentRecord(row);
  }

  async startExperiment(tenantId: string, id: string) {
    const experiment = await this.getExperiment(tenantId, id);
    if (!experiment) throw new Error("Experiment not found.");
    const updated = await this.repository.updateStatus(id, "RUNNING");
    if (experiment.modelKey) {
      await this.routingClient.syncModelExperiment({
        tenantId,
        experimentId: id,
        modelKey: experiment.modelKey,
        variants: experiment.variants,
        status: "RUNNING",
      });
    }
    return toExperimentRecord(updated);
  }

  async pauseExperiment(tenantId: string, id: string) {
    const experiment = await this.getExperiment(tenantId, id);
    if (!experiment) throw new Error("Experiment not found.");
    const updated = await this.repository.updateStatus(id, "PAUSED");
    if (experiment.modelKey) {
      await this.routingClient.syncModelExperiment({
        tenantId,
        experimentId: id,
        modelKey: experiment.modelKey,
        variants: experiment.variants,
        status: "PAUSED",
      });
    }
    return toExperimentRecord(updated);
  }

  async completeExperiment(tenantId: string, id: string) {
    const experiment = await this.getExperiment(tenantId, id);
    if (!experiment) throw new Error("Experiment not found.");
    const updated = await this.repository.updateStatus(id, "COMPLETED");
    if (experiment.modelKey) {
      await this.routingClient.syncModelExperiment({
        tenantId,
        experimentId: id,
        modelKey: experiment.modelKey,
        variants: experiment.variants,
        status: "COMPLETED",
      });
    }
    return toExperimentRecord(updated);
  }

  assignVariant(experimentId: string, tenantId: string, userId?: string) {
    return this.assignmentService.assignVariant(experimentId, tenantId, userId);
  }

  async recordEvent(
    tenantId: string,
    experimentId: string,
    userId: string | undefined,
    eventType: string,
    payload?: Record<string, unknown>,
  ) {
    const experiment = await this.getExperiment(tenantId, experimentId);
    if (!experiment) throw new Error("Experiment not found.");

    let variant = "unknown";
    if (userId) {
      const assignment = await this.assignmentService.getAssignment(experimentId, userId);
      variant = assignment ?? (await this.assignmentService.assignVariant(experimentId, tenantId, userId)).variant;
    }

    await this.repository.recordEvent({
      experimentId,
      tenantId,
      userId,
      variant,
      eventType,
      payload: (payload ?? {}) as Prisma.InputJsonValue,
    });

    return { recorded: true, variant, eventType };
  }

  computeResults(tenantId: string, experimentId: string) {
    return this.analyticsService.generateExperimentReport(tenantId, experimentId);
  }
}
