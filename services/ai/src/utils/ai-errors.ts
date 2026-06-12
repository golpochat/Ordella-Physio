import { ERROR_CODES, HttpError } from "@ordella/errors";

export function aiValidationError(fields: Array<{ field: string; message: string }>) {
  return new HttpError({
    statusCode: 400,
    code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
    message: "Validation failed.",
    metadata: { error: "VALIDATION_ERROR", fields },
  });
}

export function aiProviderFailedError(
  message = "All AI providers failed to generate a response.",
) {
  return new HttpError({
    statusCode: 502,
    code: ERROR_CODES.AI.PROVIDER_FAILED,
    message,
    metadata: { error: "AI_PROVIDER_FAILED" },
  });
}

export function invalidSchemaError(message = "Structured output does not match schema.") {
  return new HttpError({
    statusCode: 422,
    code: ERROR_CODES.AI.INVALID_SCHEMA,
    message,
    metadata: { error: "INVALID_SCHEMA" },
  });
}

export function aiProviderNotFoundError(message = "AI provider configuration not found.") {
  return new HttpError({
    statusCode: 404,
    code: ERROR_CODES.AI.PROVIDER_NOT_FOUND,
    message,
    metadata: { error: "AI_PROVIDER_NOT_FOUND" },
  });
}

export function aiForbiddenError(message = "You do not have permission to use AI features.") {
  return new HttpError({
    statusCode: 403,
    code: ERROR_CODES.AUTH.FORBIDDEN,
    message,
    metadata: { error: "FORBIDDEN" },
  });
}
