import { DB_ERROR_CODES, PRISMA_ERROR_CODE_MAP, type DbErrorCode } from "../constants/db-errors";

export type NormalizedDbError = {
  code: DbErrorCode;
  message: string;
  prismaCode?: string;
  metadata?: Record<string, unknown>;
};

export type PrismaLikeError = {
  code?: string;
  meta?: Record<string, unknown>;
  message?: string;
};

export function normalizeDbError(error: unknown): NormalizedDbError {
  if (isPrismaLikeError(error)) {
    const code = error.code ? PRISMA_ERROR_CODE_MAP[error.code] : undefined;

    return {
      code: code ?? DB_ERROR_CODES.INVALID_INPUT,
      message: error.message ?? "Database error",
      prismaCode: error.code,
      metadata: error.meta,
    };
  }

  if (error instanceof Error) {
    return {
      code: DB_ERROR_CODES.INVALID_INPUT,
      message: error.message,
    };
  }

  return {
    code: DB_ERROR_CODES.INVALID_INPUT,
    message: "Unknown database error",
  };
}

export function isPrismaLikeError(error: unknown): error is PrismaLikeError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as PrismaLikeError).code === "string"
  );
}

export function isRecordNotFoundError(error: unknown): boolean {
  return isPrismaLikeError(error) && error.code === "P2025";
}

export function isUniqueConstraintError(error: unknown): boolean {
  return isPrismaLikeError(error) && error.code === "P2002";
}
