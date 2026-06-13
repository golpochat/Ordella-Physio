import { Injectable, Logger } from "@nestjs/common";
import type { TrainingJobRecord, TrainingProvider } from "@/models/AITrainingJob";
import type { PreprocessedTrainingFile } from "@/services/training-preprocessor.service";

type ProviderJobState = {
  providerJobId: string;
  status: "running" | "completed" | "failed";
  logs: Array<{ timestamp: string; level: "info" | "warn" | "error"; message: string }>;
  metrics: Record<string, unknown>;
  modelLocation?: string;
  error?: string;
};

@Injectable()
export class TrainingProviderService {
  private readonly logger = new Logger(TrainingProviderService.name);
  private readonly jobs = new Map<string, ProviderJobState>();

  async startTrainingJob(
    job: TrainingJobRecord,
    trainingFile: PreprocessedTrainingFile,
  ): Promise<{ providerJobId: string }> {
    const providerJobId = `${job.trainingProvider.toLowerCase()}-${job.id}-${Date.now()}`;

    this.jobs.set(providerJobId, {
      providerJobId,
      status: "running",
      logs: [
        {
          timestamp: new Date().toISOString(),
          level: "info",
          message: `Started ${job.trainingProvider} training for ${job.baseModel}`,
        },
        {
          timestamp: new Date().toISOString(),
          level: "info",
          message: `Uploaded training file ${trainingFile.fileName} (${trainingFile.recordCount} records)`,
        },
      ],
      metrics: {
        epochs: 0,
        loss: null,
        accuracy: null,
        recordCount: trainingFile.recordCount,
      },
    });

    if (job.trainingProvider === "OPENAI") {
      this.logger.log(`[OpenAI stub] Fine-tuning job queued: ${providerJobId}`);
    } else if (job.trainingProvider === "AZURE") {
      this.logger.log(`[Azure stub] Fine-tuning job queued: ${providerJobId}`);
    } else {
      this.logger.log(`[Local stub] Training job queued: ${providerJobId}`);
    }

    void this.simulateProgress(providerJobId, job.trainingProvider);

    return { providerJobId };
  }

  private async simulateProgress(providerJobId: string, provider: TrainingProvider) {
    const state = this.jobs.get(providerJobId);
    if (!state) {
      return;
    }

    for (let epoch = 1; epoch <= 3; epoch += 1) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const current = this.jobs.get(providerJobId);
      if (!current || current.status !== "running") {
        return;
      }
      current.logs.push({
        timestamp: new Date().toISOString(),
        level: "info",
        message: `Epoch ${epoch}/3 completed`,
      });
      current.metrics = {
        ...current.metrics,
        epochs: epoch,
        loss: Number((1 / epoch).toFixed(4)),
        accuracy: Number((0.6 + epoch * 0.1).toFixed(4)),
        perplexity: Number((12 / epoch).toFixed(2)),
      };
    }

    const current = this.jobs.get(providerJobId);
    if (!current) {
      return;
    }

    current.status = "completed";
    current.modelLocation = `${provider.toLowerCase()}://models/${providerJobId}`;
    current.logs.push({
      timestamp: new Date().toISOString(),
      level: "info",
      message: "Training completed successfully",
    });
    current.metrics = {
      ...current.metrics,
      finalLoss: current.metrics.loss,
      trainingDurationSec: 5,
    };
  }

  getTrainingStatus(providerJobId: string) {
    const state = this.jobs.get(providerJobId);
    if (!state) {
      return { status: "failed" as const, error: "Provider job not found" };
    }
    return { status: state.status, error: state.error };
  }

  fetchTrainingLogs(providerJobId: string) {
    return this.jobs.get(providerJobId)?.logs ?? [];
  }

  fetchTrainingMetrics(providerJobId: string) {
    return this.jobs.get(providerJobId)?.metrics ?? {};
  }

  downloadModel(providerJobId: string) {
    const state = this.jobs.get(providerJobId);
    if (!state?.modelLocation) {
      throw new Error("Model artifact not available.");
    }
    return {
      location: state.modelLocation,
      sizeBytes: 1024 * 1024,
    };
  }
}
