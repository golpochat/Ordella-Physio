import type { StandardErrorResponse } from "../types/error-metadata";

export type ErrorResponseInput = {
  code: string;
  message: string;
  metadata?: Record<string, unknown>;
  correlationId?: string;
  timestamp?: string;
};

export function errorResponse(input: ErrorResponseInput): StandardErrorResponse {
  return {
    success: false,
    error: {
      code: input.code,
      message: input.message,
      ...(input.metadata ? { metadata: input.metadata } : {}),
    },
    ...(input.correlationId ? { correlationId: input.correlationId } : {}),
    timestamp: input.timestamp ?? new Date().toISOString(),
  };
}

export function validationErrorResponse(
  message: string,
  details: Record<string, unknown>[] = [],
  correlationId?: string,
): StandardErrorResponse {
  return errorResponse({
    code: "VALIDATION_ERROR",
    message,
    metadata: { details },
    correlationId,
  });
}
