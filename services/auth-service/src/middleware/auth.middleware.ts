import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "@/utils/jwt";
import { invalidTokenError } from "@/utils/auth-errors";
import type { AuthenticatedUserContext } from "@/types/auth.types";

export type AuthenticatedRequest = Request & {
  user?: AuthenticatedUserContext;
};

export function authMiddleware(request: AuthenticatedRequest, _response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) {
    next(invalidTokenError());
    return;
  }

  const token = authorization.slice("Bearer ".length).trim();

  try {
    const payload = verifyAccessToken(token);
    request.user = {
      userId: payload.userId ?? payload.sub,
      tenantId: payload.tenantId,
      role: payload.role,
      email: payload.email,
    };
    next();
  } catch {
    next(invalidTokenError());
  }
}
