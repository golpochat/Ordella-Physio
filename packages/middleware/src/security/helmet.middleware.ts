import type { HelmetOptions } from "helmet";
import helmet from "helmet";
import type { RequestHandler } from "express";

export type HelmetMiddlewareOptions = HelmetOptions;

export function createHelmetMiddleware(
  options: HelmetMiddlewareOptions = {},
): RequestHandler {
  return helmet(options);
}
