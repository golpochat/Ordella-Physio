import { Injectable } from "@nestjs/common";
import { toExperimentRecord } from "@/models/AITrainingExperiment";
import type { TrainingCurvePoint } from "@/models/AITrainingExperiment";
import { AiTrainingExperimentRepository } from "@/repositories/ai-training.repository";
import { experimentNotFoundError } from "@/utils/training-errors";

@Injectable()
export class ExperimentTrackingService {
  constructor(private readonly experimentRepository: AiTrainingExperimentRepository) {}

  async createExperiment(input: {
    tenantId: string;
    trainingJobId: string;
    experimentName: string;
    hyperparameters: Record<string, unknown>;
    createdByUserId: string;
  }) {
    const experiment = await this.experimentRepository.create({
      tenantId: input.tenantId,
      trainingJobId: input.trainingJobId,
      experimentName: input.experimentName,
      hyperparameters: input.hyperparameters as never,
      createdByUserId: input.createdByUserId,
      status: "RUNNING",
    });
    return toExperimentRecord(experiment);
  }

  async updateMetrics(
    experimentId: string,
    metrics: Record<string, unknown>,
    trainingCurve?: TrainingCurvePoint[],
  ) {
    const existing = await this.experimentRepository.updateById(experimentId, {
      metrics: metrics as never,
      ...(trainingCurve ? { trainingCurve: trainingCurve as never } : {}),
    });
    return toExperimentRecord(existing);
  }

  async finalizeExperiment(experimentId: string, status: "COMPLETED" | "FAILED") {
    const experiment = await this.experimentRepository.updateById(experimentId, {
      status,
      finishedAt: new Date(),
    });
    return toExperimentRecord(experiment);
  }

  async listExperiments(tenantId: string, trainingJobId: string) {
    const experiments = await this.experimentRepository.listByJob(tenantId, trainingJobId);
    return experiments.map(toExperimentRecord);
  }

  async getExperiment(tenantId: string, experimentId: string) {
    const experiment = await this.experimentRepository.findById(tenantId, experimentId);
    if (!experiment) {
      throw experimentNotFoundError();
    }
    return toExperimentRecord(experiment);
  }

  async labelExperiment(tenantId: string, experimentId: string, label: string | null) {
    const experiment = await this.experimentRepository.findById(tenantId, experimentId);
    if (!experiment) {
      throw experimentNotFoundError();
    }
    await this.experimentRepository.update(tenantId, experimentId, { label });
    const updated = await this.experimentRepository.findById(tenantId, experimentId);
    return toExperimentRecord(updated!);
  }

  async compareExperiments(tenantId: string, experimentIds: string[]) {
    const experiments = await this.experimentRepository.listByIds(tenantId, experimentIds);
    const records = experiments.map(toExperimentRecord);

    let bestExperimentId: string | null = null;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const record of records) {
      const accuracy = Number(record.metrics.accuracy ?? 0);
      const loss = Number(record.metrics.loss ?? record.metrics.finalLoss ?? Infinity);
      const score = Number.isFinite(accuracy) && accuracy > 0 ? accuracy : loss > 0 ? 1 / loss : 0;
      if (score > bestScore) {
        bestScore = score;
        bestExperimentId = record.id;
      }
    }

    return {
      experiments: records,
      bestExperimentId,
      comparison: records.map((record) => ({
        id: record.id,
        experimentName: record.experimentName,
        status: record.status,
        label: record.label,
        hyperparameters: record.hyperparameters,
        metrics: record.metrics,
        trainingCurve: record.trainingCurve,
        isBest: record.id === bestExperimentId,
      })),
    };
  }
}
