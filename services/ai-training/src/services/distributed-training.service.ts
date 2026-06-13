import { Injectable, Logger } from "@nestjs/common";
import type { TrainingJobRecord } from "@/models/AITrainingJob";

export type DistributedResources = {
  mode: "SINGLE" | "MULTI_GPU" | "MULTI_NODE" | "PROVIDER";
  gpuCount: number;
  nodeCount: number;
  providerClusterId?: string;
};

@Injectable()
export class DistributedTrainingService {
  private readonly logger = new Logger(DistributedTrainingService.name);

  allocateResources(job: TrainingJobRecord): DistributedResources {
    const config = job.trainingConfig.distributed ?? {};
    const enabled = Boolean(
      (config as { enabled?: boolean }).enabled ??
        (job.trainingConfig as { distributedTraining?: { enabled?: boolean } }).distributedTraining
          ?.enabled,
    );

    if (!enabled) {
      return { mode: "SINGLE", gpuCount: 1, nodeCount: 1 };
    }

    const gpuCount = Number((config as { gpuCount?: number }).gpuCount ?? 2);
    const nodeCount = Number((config as { nodeCount?: number }).nodeCount ?? 1);

    if (job.trainingProvider === "OPENAI" || job.trainingProvider === "AZURE") {
      return {
        mode: "PROVIDER",
        gpuCount,
        nodeCount,
        providerClusterId: `${job.trainingProvider.toLowerCase()}-cluster`,
      };
    }

    if (nodeCount > 1) {
      return { mode: "MULTI_NODE", gpuCount, nodeCount };
    }

    return { mode: "MULTI_GPU", gpuCount, nodeCount: 1 };
  }

  async startDistributedTraining(job: TrainingJobRecord, resources: DistributedResources) {
    this.logger.log(
      `Starting distributed training for ${job.id} mode=${resources.mode} gpus=${resources.gpuCount} nodes=${resources.nodeCount}`,
    );
    return {
      started: true,
      resources,
      workerIds: Array.from({ length: resources.gpuCount }, (_, index) => `worker-${index + 1}`),
    };
  }

  monitorDistributedTraining(_job: TrainingJobRecord, resources: DistributedResources) {
    return {
      mode: resources.mode,
      activeWorkers: resources.gpuCount,
      throughputTokensPerSec: 1200 * resources.gpuCount,
      utilization: Math.min(0.95, 0.55 + resources.gpuCount * 0.1),
    };
  }

  collectMetrics(job: TrainingJobRecord, resources: DistributedResources) {
    const monitor = this.monitorDistributedTraining(job, resources);
    return {
      distributedMode: monitor.mode,
      activeWorkers: monitor.activeWorkers,
      throughputTokensPerSec: monitor.throughputTokensPerSec,
      gpuUtilization: monitor.utilization,
    };
  }
}
