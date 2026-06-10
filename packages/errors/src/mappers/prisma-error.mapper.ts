import { HttpError } from "../base/http-error";
import { ERROR_CODES } from "../types/error-codes";
import type { NormalizedErrorPayload } from "../types/error-metadata";

export type PrismaLikeError = {
  code?: string;
  meta?: Record<string, unknown>;
  message?: string;
};

const NOT_FOUND_CODES = new Set(["P2025"]);
const UNIQUE_VIOLATION_CODES = new Set(["P2002"]);
const FOREIGN_KEY_CODES = new Set(["P2003", "P2014"]);

export type PrismaErrorMapperOptions = {
  notFoundCode?: string;
  notFoundMessage?: string;
  entityName?: string;
};

const ENTITY_NOT_FOUND_CODE_MAP: Record<string, string> = {
  Patient: ERROR_CODES.PATIENT.NOT_FOUND,
  Tenant: ERROR_CODES.TENANT.NOT_FOUND,
  Appointment: ERROR_CODES.APPOINTMENT.NOT_FOUND,
  Note: ERROR_CODES.NOTES.NOT_FOUND,
  Invoice: ERROR_CODES.BILLING.INVOICE_NOT_FOUND,
};

export function mapPrismaError(
  error: PrismaLikeError,
  options: PrismaErrorMapperOptions = {},
): HttpError {
  const code = error.code ?? "";
  const entity = options.entityName ?? "Resource";

  if (NOT_FOUND_CODES.has(code)) {
    const notFoundCode =
      options.notFoundCode ??
      ENTITY_NOT_FOUND_CODE_MAP[entity] ??
      ERROR_CODES.PATIENT.NOT_FOUND;

    return new HttpError({
      statusCode: 404,
      code: notFoundCode as never,
      message: options.notFoundMessage ?? `${entity} not found`,
      metadata: { prismaCode: code, ...(error.meta ?? {}) },
    });
  }

  if (UNIQUE_VIOLATION_CODES.has(code)) {
    return new HttpError({
      statusCode: 409,
      code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
      message: "Unique constraint violation",
      metadata: { prismaCode: code, ...(error.meta ?? {}) },
    });
  }

  if (FOREIGN_KEY_CODES.has(code)) {
    return new HttpError({
      statusCode: 400,
      code: ERROR_CODES.SYSTEM.VALIDATION_ERROR,
      message: "Invalid reference",
      metadata: { prismaCode: code, ...(error.meta ?? {}) },
    });
  }

  return new HttpError({
    statusCode: 500,
    code: ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR,
    message: error.message ?? "Database error",
    metadata: { prismaCode: code, ...(error.meta ?? {}) },
  });
}

export function isPrismaLikeError(error: unknown): error is PrismaLikeError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as PrismaLikeError).code === "string" &&
    (error as PrismaLikeError).code?.startsWith("P") === true
  );
}

export function normalizePrismaError(
  error: unknown,
  options?: PrismaErrorMapperOptions,
): NormalizedErrorPayload {
  if (!isPrismaLikeError(error)) {
    return {
      code: ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR,
      message: "Unexpected database error",
      statusCode: 500,
    };
  }

  const mapped = mapPrismaError(error, options);
  return {
    code: mapped.code,
    message: mapped.message,
    metadata: mapped.metadata,
    statusCode: mapped.statusCode,
  };
}
