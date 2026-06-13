import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { EvaluationController } from "@/controllers/evaluation.controller";
import { ExperimentController } from "@/controllers/experiment.controller";
import { HealthController } from "@/controllers/health.controller";
import { ModelRegistryController } from "@/controllers/model-registry.controller";
import { PromotionController } from "@/controllers/promotion.controller";
import { TrainingController } from "@/controllers/training.controller";
import { TrainingDashboardController } from "@/controllers/training-dashboard.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { AiDatasetClient } from "@/integrations/ai-dataset.client";
import { AiInferenceRoutingClient } from "@/integrations/ai-inference-routing.client";
import {
  AiModelEvaluationRepository,
  AiModelPromotionRepository,
  AiModelRegistryRepository,
  AiTrainingCheckpointRepository,
  AiTrainingExperimentRepository,
  AiTrainingJobRepository,
} from "@/repositories/ai-training.repository";
import { AutoRetrainingService } from "@/services/auto-retraining.service";
import { BiasDetectionService } from "@/services/bias-detection.service";
import { CanaryRolloutService } from "@/services/canary-rollout.service";
import { CheckpointService } from "@/services/checkpoint.service";
import { DistributedTrainingService } from "@/services/distributed-training.service";
import { EvaluationSuiteService } from "@/services/evaluation-suite.service";
import { ExperimentTrackingService } from "@/services/experiment-tracking.service";
import { HyperparameterTuningService } from "@/services/hyperparameter-tuning.service";
import { ModelPromotionService } from "@/services/model-promotion.service";
import { ModelRegistryService } from "@/services/model-registry.service";
import { SafetyCheckService } from "@/services/safety-check.service";
import { TrainingArtifactService } from "@/services/training-artifact.service";
import { TrainingDashboardService } from "@/services/training-dashboard.service";
import { TrainingJobService } from "@/services/training-job.service";
import { TrainingLogStreamService } from "@/services/training-log-stream.service";
import { TrainingMetricsStreamService } from "@/services/training-metrics-stream.service";
import { TrainingNotificationService } from "@/services/training-notification.service";
import { TrainingOrchestratorService } from "@/services/training-orchestrator.service";
import { TrainingPreprocessorService } from "@/services/training-preprocessor.service";
import { TrainingProviderService } from "@/services/training-provider.service";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { TrainingQueueService } from "@/workers/training.worker";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [
    HealthController,
    ExperimentController,
    TrainingDashboardController,
    TrainingController,
    EvaluationController,
    PromotionController,
    ModelRegistryController,
  ],
  providers: [
    TrainingJobService,
    TrainingOrchestratorService,
    TrainingPreprocessorService,
    TrainingProviderService,
    TrainingLogStreamService,
    TrainingMetricsStreamService,
    TrainingDashboardService,
    ExperimentTrackingService,
    HyperparameterTuningService,
    DistributedTrainingService,
    CheckpointService,
    TrainingArtifactService,
    TrainingNotificationService,
    EvaluationSuiteService,
    SafetyCheckService,
    BiasDetectionService,
    ModelPromotionService,
    CanaryRolloutService,
    AutoRetrainingService,
    ModelRegistryService,
    TrainingQueueService,
    AiDatasetClient,
    AiInferenceRoutingClient,
    AiTrainingJobRepository,
    AiModelRegistryRepository,
    AiModelEvaluationRepository,
    AiModelPromotionRepository,
    AiTrainingExperimentRepository,
    AiTrainingCheckpointRepository,
    JwtStrategy,
    JwtGuard,
  ],
})
export class AiTrainingModule {}
