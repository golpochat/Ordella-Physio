import { ERROR_CODES, HttpError } from "@ordella/errors";

export function trainingValidationError(fields: Array<{ field: string; message: string }>) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { error: "VALIDATION_ERROR", fields },
  });
}

export function trainingJobNotFoundError(message = "Training job not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.AI.TRAINING_JOB_NOT_FOUND,
    message,
    metadata: { error: "TRAINING_JOB_NOT_FOUND" },
  });
}

export function modelNotFoundError(message = "Model not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.AI.MODEL_NOT_FOUND,
    message,
    metadata: { error: "MODEL_NOT_FOUND" },
  });
}

export function experimentNotFoundError(message = "Experiment not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.AI.TRAINING_JOB_NOT_FOUND,
    message,
    metadata: { error: "EXPERIMENT_NOT_FOUND" },
  });
}

export function checkpointNotFoundError(message = "Checkpoint not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.AI.TRAINING_JOB_NOT_FOUND,
    message,
    metadata: { error: "CHECKPOINT_NOT_FOUND" },
  });
}

export function evaluationNotFoundError(message = "Evaluation not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.AI.MODEL_NOT_FOUND,
    message,
    metadata: { error: "EVALUATION_NOT_FOUND" },
  });
}

export function promotionNotFoundError(message = "Promotion record not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.AI.MODEL_NOT_FOUND,
    message,
    metadata: { error: "PROMOTION_NOT_FOUND" },
  });
}

export function trainingForbiddenError(message = "Missing training permission.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
    metadata: { error: "FORBIDDEN" },
  });
}
