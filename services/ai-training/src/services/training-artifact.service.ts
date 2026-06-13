import { Injectable } from "@nestjs/common";
import { trainingConfig } from "@/config/training.config";

@Injectable()
export class TrainingArtifactService {
  buildCheckpointPath(trainingJobId: string, checkpointNumber: number) {
    const storageRoot = process.env.TRAINING_ARTIFACT_ROOT ?? "local://training-artifacts";
    return `${storageRoot}/${trainingJobId}/checkpoint-${checkpointNumber}.bin`;
  }

  buildModelArtifactPath(trainingJobId: string, providerJobId: string) {
    const storageRoot = process.env.TRAINING_ARTIFACT_ROOT ?? "local://training-artifacts";
    return `${storageRoot}/${trainingJobId}/models/${providerJobId}.bin`;
  }

  async storeCheckpoint(fileLocation: string, _payload: Buffer) {
    return { stored: true, location: fileLocation, bytes: _payload.length || 0 };
  }

  getStorageBackend() {
    const root = process.env.TRAINING_ARTIFACT_ROOT ?? "local://training-artifacts";
    return root.startsWith("s3://") ? "S3" : "LOCAL";
  }

  getConfigSummary() {
    return {
      backend: this.getStorageBackend(),
      artifactRoot: process.env.TRAINING_ARTIFACT_ROOT ?? "local://training-artifacts",
      pollIntervalMs: trainingConfig.pollIntervalMs,
    };
  }
}
