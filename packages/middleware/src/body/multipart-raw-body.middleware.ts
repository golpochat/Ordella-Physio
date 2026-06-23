import express, { type RequestHandler } from "express";
import type { IncomingMessage } from "http";
import { DEFAULT_JSON_BODY_LIMIT } from "../common/constants";
import type { OrdellaRequest } from "../common/types";

export type MultipartRawBodyMiddlewareOptions = {
  limit?: string | number;
};

function isMultipartRequest(request: IncomingMessage): boolean {
  const contentType = request.headers["content-type"];
  return typeof contentType === "string" && contentType.includes("multipart/form-data");
}

export function createMultipartRawBodyMiddleware(
  options: MultipartRawBodyMiddlewareOptions = {},
): RequestHandler {
  return express.raw({
    limit: options.limit ?? DEFAULT_JSON_BODY_LIMIT,
    type: (request) => isMultipartRequest(request),
    verify: (request, _response, buffer) => {
      (request as OrdellaRequest).rawBody = Buffer.from(buffer);
    },
  });
}
