import express, { type RequestHandler } from "express";
import { DEFAULT_JSON_BODY_LIMIT } from "../common/constants";

export type JsonLimitMiddlewareOptions = {
  limit?: string | number;
  verify?: (request: express.Request, _response: express.Response, buffer: Buffer) => void;
};

export function createJsonLimitMiddleware(
  options: JsonLimitMiddlewareOptions = {},
): RequestHandler {
  return express.json({
    limit: options.limit ?? DEFAULT_JSON_BODY_LIMIT,
    ...(options.verify ? { verify: options.verify } : {}),
  });
}

export function parseBodyLimit(limit: string): string | number {
  return limit;
}
