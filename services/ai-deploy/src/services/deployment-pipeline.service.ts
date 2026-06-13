import { Injectable, Logger } from "@nestjs/common";
import { deployConfig } from "@/config/deploy.config";
import {
  defaultHealth,
  defaultRollout,
  type PipelineStep,
  type RolloutMap,
} from "@/models/AIModelDeployment";
import { DeploymentRepository } from "@/repositories/deployment.repository";
import { AiInferenceRoutingClient } from "@/integrations/ai-inference-routing.client";
import { DeploymentArtifactService } from "@/services/deployment-artifact.service";
import { DeploymentHealthService } from "@/services/deployment-health.service";
import { DeploymentMetricsService } from "@/services/deployment-metrics.service";
import { RegionRouterService } from "@/services/region-router.service";

@Injectable()
export class DeploymentPipelineService {
  private readonly logger = new Logger(DeploymentPipelineService.name);

  constructor(
    private readonly repository: DeploymentRepository,
    private readonly artifactService: DeploymentArtifactService,
    private readonly healthService: DeploymentHealthService,
    private readonly metricsService: DeploymentMetricsService,
    private readonly regionRouter: RegionRouterService,
    private readonly inferenceRoutingClient: AiInferenceRoutingClient,
  ) {}

  async startDeployment(
    tenantId: string,
    modelId: string,
    version: string,
    regions?: string[],
    rollout?: RolloutMap,
  ) {
    const targetRegions = regions?.length ? regions : [...deployConfig.defaultRegions];
    const targetRollout = rollout ?? defaultRollout(targetRegions);
    const previous = await this.repository.findByModel(tenantId, modelId);

    const pipeline: PipelineStep[] = [
      { name: "package", status: "PENDING" },
      { name: "upload", status: "PENDING" },
      { name: "deploy", status: "PENDING" },
      { name: "health", status: "PENDING" },
      { name: "activate", status: "PENDING" },
      { name: "notify", status: "PENDING" },
    ];

    const deployment = await this.repository.create({
      tenantId,
      modelId,
      version,
      regions: targetRegions,
      rollout: targetRollout,
      health: defaultHealth(targetRegions),
      previousDeploymentId: previous?.id,
      pipeline,
    });

    void this.runPipeline(tenantId, deployment.id, modelId, version, targetRegions, targetRollout);
    return deployment;
  }

  private async runPipeline(
    tenantId: string,
    deploymentId: string,
    modelId: string,
    version: string,
    regions: string[],
    rollout: RolloutMap,
  ) {
    const steps = ["package", "upload", "deploy", "health", "activate", "notify"];

    try {
      for (const step of steps) {
        await this.updatePipelineStep(deploymentId, step, "RUNNING");
        switch (step) {
          case "package":
            await this.artifactService.packageModel(modelId, version);
            break;
          case "upload": {
            const upload = await this.artifactService.uploadArtifact(modelId, version);
            await this.repository.update(deploymentId, { artifactLocation: upload.location });
            break;
          }
          case "deploy":
            for (const region of regions) {
              await this.deployToRegion(tenantId, modelId, version, region);
            }
            break;
          case "health":
            for (const region of regions) {
              await this.verifyDeployment(tenantId, modelId, version, region);
            }
            break;
          case "activate":
            await this.activateDeployment(tenantId, modelId, version);
            break;
          case "notify":
            this.logger.log(`Deployment complete: ${modelId}@${version} for tenant ${tenantId}`);
            break;
        }
        await this.updatePipelineStep(deploymentId, step, "COMPLETED");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Pipeline failed.";
      this.logger.error(`Deployment pipeline failed for ${modelId}@${version}: ${message}`);
      await this.repository.update(deploymentId, { status: "FAILED" });
    }
  }

  async deployToRegion(tenantId: string, modelId: string, version: string, region: string) {
    const endpoint = this.regionRouter.regionEndpoint(modelId, version, region);
    this.logger.log(`Deployed ${modelId}@${version} to ${region} → ${endpoint}`);
    await this.metricsService.collectSnapshot(
      tenantId,
      modelId,
      version,
      region,
      (await this.repository.findByModelVersion(tenantId, modelId, version))?.rollout
        ? ((await this.repository.findByModelVersion(tenantId, modelId, version))!.rollout as RolloutMap)[region] ?? 0
        : 0,
    );
    return { region, endpoint, deployed: true };
  }

  async verifyDeployment(tenantId: string, modelId: string, version: string, region: string) {
    const verification = await this.artifactService.verifyArtifact(modelId, version);
    const health = await this.healthService.runHealthCheck(tenantId, modelId, version, region);
    return { verification, health };
  }

  async activateDeployment(tenantId: string, modelId: string, version: string) {
    const deployment = await this.repository.findByModelVersion(tenantId, modelId, version);
    if (!deployment) {
      throw new Error("Deployment not found.");
    }

    await this.repository.update(deployment.id, { status: "ACTIVE" });

    const routes = await this.regionRouter.applyRolloutWeights(tenantId, modelId, version);
    await this.inferenceRoutingClient.syncMultiRegionRouting({
      tenantId,
      modelId,
      modelName: modelId,
      version,
      artifactLocation: deployment.artifactLocation,
      routes: routes.routes.map((route) => ({
        region: route.region,
        endpoint: route.endpoint,
        rolloutPercent: route.rolloutPercent,
        health: route.health,
      })),
    });

    return { activated: true, routes };
  }

  private async updatePipelineStep(deploymentId: string, stepName: string, status: PipelineStep["status"]) {
    const deployment = await this.repository.findById(deploymentId);
    if (!deployment) return;
    const current = (deployment.pipeline as PipelineStep[]) ?? [];
    const next = current.map((step) =>
      step.name === stepName
        ? {
            ...step,
            status,
            startedAt: status === "RUNNING" ? new Date().toISOString() : step.startedAt,
            finishedAt: status === "COMPLETED" ? new Date().toISOString() : step.finishedAt,
          }
        : step,
    );
    await this.repository.update(deploymentId, { pipeline: next });
  }
}
