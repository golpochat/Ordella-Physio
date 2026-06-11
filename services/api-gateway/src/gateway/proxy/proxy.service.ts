import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { gatewayConfig } from "@ordella/config";
import { HttpError } from "@ordella/errors";
import { firstValueFrom } from "rxjs";
import type { AxiosRequestConfig, Method } from "axios";
import type { Request, Response } from "express";
import {
  CORRELATION_ID_HEADER,
  TENANT_HEADER,
  USER_ID_HEADER,
  USER_PERMISSIONS_HEADER,
  USER_ROLE_HEADER,
  USER_ROLES_HEADER,
  type GatewayUser,
  type ServiceEnvKey,
} from "@/constants";
import { getServiceUrl } from "@/utils/service-map";
import { mapUpstreamError } from "@/utils/error-mapper";

export type ProxyRequestContext = {
  user?: GatewayUser;
  headers?: Record<string, string>;
  query?: Record<string, unknown>;
};

export type ProxyResponse<T = unknown> = {
  status: number;
  data: T;
  headers: Record<string, string | string[]>;
};

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  async request<T = unknown>(
    method: Method,
    serviceEnvKey: ServiceEnvKey,
    path: string,
    body?: unknown,
    context: ProxyRequestContext = {},
  ): Promise<ProxyResponse<T>> {
    const baseUrl = getServiceUrl(serviceEnvKey);
    const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    const config = gatewayConfig;
    const retries = Number(process.env.GATEWAY_RETRY_COUNT ?? 2);
    const retryDelayMs = Number(process.env.GATEWAY_RETRY_DELAY_MS ?? 250);

    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      headers: this.buildHeaders(context),
      params: context.query,
      data: body,
      timeout: config.gatewayTimeoutMs,
      validateStatus: () => true,
    };

    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const response = await firstValueFrom(this.httpService.request<T>(axiosConfig));
        return {
          status: response.status,
          data: response.data,
          headers: response.headers as Record<string, string | string[]>,
        };
      } catch (error) {
        lastError = error;
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
      }
    }

    throw mapUpstreamError(lastError, serviceEnvKey);
  }

  async forward(
    request: Request,
    response: Response,
    serviceEnvKey: ServiceEnvKey,
    user?: GatewayUser,
  ): Promise<void> {
    const baseUrl = getServiceUrl(serviceEnvKey);
    const requestPath = request.originalUrl.split("?")[0] ?? request.path;
    const targetUrl = `${baseUrl}${requestPath}`;
    const config = gatewayConfig;

    try {
      const upstream = await firstValueFrom(
        this.httpService.request<ArrayBuffer>({
          method: request.method,
          url: targetUrl,
          headers: this.buildForwardHeaders(request, user),
          data: this.resolveBody(request),
          params: request.query,
          responseType: "arraybuffer",
          validateStatus: () => true,
          timeout: config.gatewayTimeoutMs,
        }),
      );

      response.status(upstream.status);
      for (const [key, value] of Object.entries(upstream.headers)) {
        if (value === undefined || key.toLowerCase() === "transfer-encoding") {
          continue;
        }
        response.setHeader(key, value as string | string[]);
      }
      response.send(Buffer.from(upstream.data));
    } catch (error) {
      const normalized =
        error instanceof HttpError ? error : mapUpstreamError(error, serviceEnvKey);
      response.status(normalized.statusCode).json(normalized.serialize());
    }
  }

  private buildHeaders(context: ProxyRequestContext): Record<string, string> {
    const headers: Record<string, string> = { ...context.headers };
    this.applyUserHeaders(headers, context.user);
    return headers;
  }

  private buildForwardHeaders(request: Request, user?: GatewayUser): Record<string, string> {
    const headers: Record<string, string> = {};

    for (const [key, value] of Object.entries(request.headers)) {
      if (value === undefined) {
        continue;
      }
      const lowerKey = key.toLowerCase();
      if (lowerKey === "host" || lowerKey === "content-length") {
        continue;
      }
      headers[key] = Array.isArray(value) ? value.join(",") : value;
    }

    if (user?.role !== "SYSTEM") {
      const tenantHeader = request.headers[TENANT_HEADER] ?? request.headers[TENANT_HEADER.toLowerCase()];
      if (typeof tenantHeader === "string") {
        headers[TENANT_HEADER] = tenantHeader;
      }
    } else {
      delete headers[TENANT_HEADER];
    }

    const correlationId =
      request.headers[CORRELATION_ID_HEADER] ??
      request.headers[CORRELATION_ID_HEADER.toLowerCase()];
    if (typeof correlationId === "string") {
      headers[CORRELATION_ID_HEADER] = correlationId;
    }

    this.applyUserHeaders(headers, user);
    return headers;
  }

  private applyUserHeaders(headers: Record<string, string>, user?: GatewayUser): void {
    if (!user) {
      return;
    }

    if (user.role !== "SYSTEM") {
      headers[TENANT_HEADER] = user.tenantId;
    } else {
      delete headers[TENANT_HEADER];
    }

    headers[USER_ID_HEADER] = user.userId;
    headers[USER_ROLE_HEADER] = user.role;
    headers[USER_ROLES_HEADER] = user.roles.join(",");
    headers[USER_PERMISSIONS_HEADER] = user.permissions.join(",");

    if (user.email) {
      headers["x-user-email"] = user.email;
    }
  }

  private resolveBody(request: Request): unknown {
    const rawBody = (request as Request & { rawBody?: Buffer }).rawBody;
    if (rawBody && rawBody.length > 0) {
      return rawBody;
    }
    return request.body;
  }
}
