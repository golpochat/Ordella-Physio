import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma";
import { asyncHandler } from "../utils/async-handler";

const SENSITIVE_DETAIL_FIELDS = new Set([
  "password",
  "passwordHash",
  "currentPassword",
  "newPassword",
  "refreshToken",
  "accessToken",
  "token",
]);

export type AuditLogInput = {
  req: Request;
  action: string;
  entity: string;
  entityId?: string | null;
  details?: Prisma.InputJsonValue;
};

function sanitizeAuditDetails(body: unknown): Prisma.InputJsonValue {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {};
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (SENSITIVE_DETAIL_FIELDS.has(key)) {
      continue;
    }
    sanitized[key] = value;
  }

  return sanitized as Prisma.InputJsonValue;
}

function resolveEntityId(req: Request, responseEntityId?: string): string | null {
  const fromParams =
    req.params.id ??
    req.params.staffId ??
    req.params.patientId ??
    req.params.blockId ??
    req.params.userId;

  if (fromParams) {
    return String(fromParams);
  }

  if (responseEntityId) {
    return responseEntityId;
  }

  const bodyUserId = req.body?.userId;
  if (typeof bodyUserId === "string" && bodyUserId.length > 0) {
    return bodyUserId;
  }

  return null;
}

export async function auditLog({
  req,
  action,
  entity,
  entityId,
  details = {},
}: AuditLogInput): Promise<void> {
  const user = req.user;
  const tenantId = req.tenantId;

  if (!user?.id || !tenantId) {
    return;
  }

  await prisma.auditLog.create({
    data: {
      tenantId,
      userId: user.id,
      action,
      entity,
      entityId: entityId ?? undefined,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? "",
      metadata: details,
    },
  });
}

type AuditedHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

function installResponseCapture(res: Response): {
  getStatusCode: () => number;
  getResponseEntityId: () => string | undefined;
} {
  let statusCode = res.statusCode || 200;
  let responseEntityId: string | undefined;

  const originalStatus = res.status.bind(res);
  const originalJson = res.json.bind(res);

  res.status = function status(code: number) {
    statusCode = code;
    return originalStatus(code);
  };

  res.json = function json(body: unknown) {
    if (body && typeof body === "object" && !Array.isArray(body)) {
      const data = (body as { data?: unknown }).data;
      if (data && typeof data === "object" && data !== null && "id" in data) {
        const id = (data as { id?: unknown }).id;
        if (typeof id === "string") {
          responseEntityId = id;
        }
      }
    }

    return originalJson(body);
  };

  return {
    getStatusCode: () => statusCode,
    getResponseEntityId: () => responseEntityId,
  };
}

export function withAudit(action: string, entity: string): (handler: AuditedHandler) => RequestHandler {
  return (handler) =>
    asyncHandler(async (req, res, next) => {
      const capture = installResponseCapture(res);

      await handler(req, res, next);

      if (!res.headersSent) {
        return;
      }

      const statusCode = capture.getStatusCode();
      if (statusCode < 200 || statusCode >= 400) {
        return;
      }

      await auditLog({
        req,
        action,
        entity,
        entityId: resolveEntityId(req, capture.getResponseEntityId()),
        details: sanitizeAuditDetails(req.body),
      });
    });
}
