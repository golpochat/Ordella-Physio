import type { NextFunction, Request, Response } from "express";

import { env } from "../config";

export function enforceHttps(req: Request, res: Response, next: NextFunction): void {
  if (!env.FORCE_HTTPS || env.NODE_ENV !== "production") {
    next();
    return;
  }

  const forwardedProto = req.get("x-forwarded-proto");
  if (forwardedProto && forwardedProto !== "https") {
    const host = req.get("host");
    if (host) {
      res.redirect(301, `https://${host}${req.originalUrl}`);
      return;
    }
  }

  next();
}
