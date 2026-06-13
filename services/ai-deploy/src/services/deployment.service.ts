import { Injectable } from "@nestjs/common";
import {
  defaultHealth,
  defaultRollout,
  toDeploymentRecord,
  type RolloutMap,
  type StartDeploymentInput,
} from "@/models/AIModelDeployment";
import { DeploymentRepository } from "@/repositories/deployment.repository";
import { DeploymentMetricsService } from "@/services/deployment-metrics.service";
import { DeploymentPipelineService } from "@/services/deployment-pipeline.service";
import { RegionRouterService } from "@/services/region-router.service";
import { AiInferenceRoutingClient } from "@/integrations/ai-inference-routing.client";

@Injectable()
export class DeploymentService {
  constructor(
    private readonly repository: DeploymentRepository,
    private readonly pipelineService: DeploymentPipelineService,
    private readonly metricsService: DeploymentMetricsService,
    private readonly regionRouter: RegionRouterService,
    private readonly inferenceRoutingClient: AiInferenceRoutingClient,
  ) {}

  async startDeployment(tenantId: string, input: StartDeploymentInput) {
    const row = await this.pipelineService.startDeployment(
      tenantId,
      input.modelId,
      input.version,
      input.regions,
      input.rollout,
    );
    return toDeploymentRecord(row);
  }

  async getStatus(tenantId: string, modelId: string) {
    const active = await this.repository.getActive(tenantId, modelId);
    const latest = await this.repository.findByModel(tenantId, modelId);
    const history = await this.repository.listByModel(tenantId, modelId);
    return {
      active,
      latest: latest ? toDeploymentRecord(latest) : null,
      history: history.map(toDeploymentRecord),
    };
  }

  async rollback(tenantId: string, modelId: string) {
    const current = await this.repository.findByModel(tenantId, modelId);
    if (!current) {
      throw new Error("No deployment to roll back.");
    }

    await this.repository.update(current.id, { status: "ROLLED_BACK" });

    if (current.previousDeploymentId) {
      const previous = await this.repository.findById(current.previousDeploymentId);
      if (previous) {
        await this.repository.update(previous.id, { status: "ACTIVE" });
        await this.inferenceRoutingClient.syncMultiRegionRouting({
          tenantId,
          modelId,
          modelName: modelId,
          version: previous.version,
          artifactLocation: previous.artifactLocation,
          routes: (previous.regions as string[]).map((region) => ({
            region,
            endpoint: this.regionRouter.regionEndpoint(modelId, previous.version, region),
            rolloutPercent: (previous.rollout as RolloutMap)[region] ?? 0,
            health: (previous.health as Record<string, string>)[region] ?? "HEALTHY",
          })),
        });
        return { rolledBack: true, activeVersion: previous.version };
      }
    }

    return { rolledBack: true, activeVersion: null };
  }

  async adjustRollout(tenantId: string, modelId: string, region: string, rolloutPercent: number) {
    const deployment = await this.repository.findByModel(tenantId, modelId);
    if (!deployment) {
      throw new Error("Deployment not found.");
    }

    const rollout = { ...(deployment.rollout as RolloutMap), [region]: rolloutPercent };
    const updated = await this.repository.update(deployment.id, { rollout });
    await this.pipelineService.activateDeployment(tenantId, modelId, updated.version);
    return toDeploymentRecord(updated);
  }

  getMetrics(tenantId: string, modelId: string, version?: string) {
    return this.metricsService.getMetrics(tenantId, modelId, version);
  }

  routeInference(tenantId: string, modelId: string, version: string, tenantRegion?: string) {
    return this.regionRouter.routeInference(tenantId, modelId, version, tenantRegion);
  }
}
