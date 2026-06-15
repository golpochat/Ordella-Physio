import type { NextFunction, Request, Response } from "express";

import { createCorrelationId } from "../modules/security/security-events.service";

export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.get("x-correlation-id");
  const correlationId = incoming?.trim() || createCorrelationId();
  req.correlationId = correlationId;
  res.setHeader("x-correlation-id", correlationId);
  next();
}
