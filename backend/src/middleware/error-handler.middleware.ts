import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { AccountLockedError, TooManyRequestsError } from "../utils/security-errors";

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof TooManyRequestsError) {
    if (error.retryAfterSeconds) {
      res.setHeader("Retry-After", String(error.retryAfterSeconds));
    }
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof AccountLockedError) {
    if (error.retryAfterSeconds) {
      res.setHeader("Retry-After", String(error.retryAfterSeconds));
    }
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined ? { details: error.details } : {}),
      },
    });
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    console.error(
      JSON.stringify({
        level: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        correlationId: req.correlationId,
      }),
    );
  }

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
  });
}
