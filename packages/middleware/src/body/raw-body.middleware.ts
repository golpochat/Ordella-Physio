import express, { type RequestHandler } from "express";
import type { OrdellaRequest } from "../common/types";

export type RawBodyMiddlewareOptions = {
  limit?: string | number;
  type?: string | string[];
};

export function createRawBodyMiddleware(
  options: RawBodyMiddlewareOptions = {},
): RequestHandler {
  return express.raw({
    limit: options.limit ?? "1mb",
    type: options.type ?? "application/json",
    verify: (request, _response, buffer) => {
      (request as OrdellaRequest).rawBody = Buffer.from(buffer);
    },
  });
}

export function createStripeWebhookRawBodyMiddleware(
  options: Omit<RawBodyMiddlewareOptions, "type"> = {},
): RequestHandler {
  return createRawBodyMiddleware({
    ...options,
    type: "application/json",
  });
}

export function getRawBody(request: OrdellaRequest): Buffer | undefined {
  return request.rawBody;
}
