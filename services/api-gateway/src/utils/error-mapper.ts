import { HttpError, ERROR_CODES, normalizeZodError, type ErrorCode } from "@ordella/errors";
import type { ServiceEnvKey } from "@/constants";

export function mapUpstreamError(error: unknown, serviceEnvKey: ServiceEnvKey): HttpError {
  if (error instanceof HttpError) {
    return error;
  }

  return new HttpError({
    statusCode: 502,
    code: ERROR_CODES.SYSTEM.SERVICE_UNAVAILABLE,
    message: "Upstream service unavailable",
    metadata: {
      service: serviceEnvKey,
      detail: error instanceof Error ? error.message : "Unknown proxy error",
    },
  });
}

export function mapValidationError(error: unknown) {
  return normalizeZodError(error);
}

export function mapProxyResponseError(
  status: number,
  body: unknown,
  serviceEnvKey: ServiceEnvKey,
): HttpError | null {
  if (status < 400) {
    return null;
  }

  if (body && typeof body === "object" && "code" in (body as Record<string, unknown>)) {
    const payload = body as { code?: string; message?: string; statusCode?: number };
    return new HttpError({
      statusCode: payload.statusCode ?? status,
      code: (payload.code as ErrorCode | undefined) ?? ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR,
      message: payload.message ?? "Upstream request failed",
      metadata: { service: serviceEnvKey },
    });
  }

  return new HttpError({
    statusCode: status,
    code: ERROR_CODES.SYSTEM.INTERNAL_SERVER_ERROR,
    message: "Upstream request failed",
    metadata: { service: serviceEnvKey },
  });
}
