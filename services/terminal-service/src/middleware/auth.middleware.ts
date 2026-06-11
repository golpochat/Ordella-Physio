import type { NextFunction, Request, Response } from "express";
import { HttpError } from "@ordella/errors";
import { resolveRequestUser } from "@/middleware/request-user";

function sendError(response: Response, error: HttpError): void {
  response.status(error.statusCode).json(error.serialize());
}

export function authMiddleware(request: Request, response: Response, next: NextFunction): void {
  const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);

  if (!user) {
    sendError(
      response,
      new HttpError({
        statusCode: 401,
        code: "AUTH_UNAUTHORIZED",
        message: "Authentication required.",
      }),
    );
    return;
  }

  next();
}
