import { Injectable, Logger } from "@nestjs/common";

export type TrainingMilestone =
  | "JOB_QUEUED"
  | "JOB_STARTED"
  | "CHECKPOINT_SAVED"
  | "EXPERIMENT_COMPLETED"
  | "TUNING_COMPLETED"
  | "JOB_COMPLETED"
  | "JOB_FAILED";

@Injectable()
export class TrainingNotificationService {
  private readonly logger = new Logger(TrainingNotificationService.name);

  notifyMilestone(input: {
    tenantId: string;
    trainingJobId: string;
    milestone: TrainingMilestone;
    message: string;
    metadata?: Record<string, unknown>;
  }) {
    this.logger.log(
      `[${input.milestone}] job=${input.trainingJobId} tenant=${input.tenantId}: ${input.message}`,
    );
    return {
      delivered: true,
      channel: "log",
      milestone: input.milestone,
      message: input.message,
      metadata: input.metadata ?? {},
    };
  }
}
