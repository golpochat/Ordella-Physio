import type { NextFunction, Request, Response } from "express";

import { sanitizeValue } from "../utils/sanitize";

function sanitizePart(value: unknown): void {
  if (!value || typeof value !== "object") {
    return;
  }

  const record = value as Record<string, unknown>;
  for (const [key, nested] of Object.entries(record)) {
    record[key] = sanitizeValue(nested);
  }
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction): void {
  sanitizePart(req.body);
  sanitizePart(req.query);
  sanitizePart(req.params);
  next();
}
