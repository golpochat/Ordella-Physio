import cors, { type CorsOptions } from "cors";
import type { RequestHandler } from "express";

export type CorsMiddlewareOptions = CorsOptions;

export function createCorsMiddleware(
  options: CorsMiddlewareOptions = { origin: "*" },
): RequestHandler {
  return cors(options);
}
