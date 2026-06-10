import { Logger } from "@nestjs/common";
import type { ErrorMetadata } from "../types/error-metadata";

export type ErrorLogLevel = "error" | "warn" | "debug";

export type ErrorLogInput = {
  level?: ErrorLogLevel;
  message: string;
  stack?: string;
  metadata?: ErrorMetadata;
  correlationId?: string;
  context?: string;
};

const defaultLogger = new Logger("ErrorLogger");

export function errorLogger(input: ErrorLogInput, logger: Logger = defaultLogger): void {
  const level = input.level ?? "error";
  const context = input.context ? `[${input.context}] ` : "";
  const correlation = input.correlationId ?? "n/a";
  const metadataText =
    input.metadata && Object.keys(input.metadata).length > 0
      ? ` metadata=${JSON.stringify(input.metadata)}`
      : "";

  const logMessage = `${context}${input.message} correlation=${correlation}${metadataText}`;

  if (level === "warn") {
    logger.warn(logMessage, input.stack);
    return;
  }

  if (level === "debug") {
    logger.debug(logMessage, input.stack);
    return;
  }

  logger.error(logMessage, input.stack);
}

export function logUnknownError(
  error: unknown,
  options: Omit<ErrorLogInput, "message" | "stack"> = {},
  logger?: Logger,
): void {
  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";

  errorLogger(
    {
      ...options,
      message,
      stack: error instanceof Error ? error.stack : undefined,
    },
    logger,
  );
}
