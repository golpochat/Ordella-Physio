import { gatewayConfig } from "@ordella/config";
import express, { type RequestHandler } from "express";
import type { IncomingMessage } from "http";

function isMultipartRequest(request: IncomingMessage): boolean {
  const contentType = request.headers["content-type"];
  return typeof contentType === "string" && contentType.includes("multipart/form-data");
}

export function createGatewayMultipartRawBodyMiddleware(): RequestHandler {
  return express.raw({
    limit: gatewayConfig.gatewayBodyLimit,
    type: (request) => isMultipartRequest(request),
    verify: (request, _response, buffer) => {
      (request as express.Request & { rawBody?: Buffer }).rawBody = Buffer.from(buffer);
    },
  });
}
