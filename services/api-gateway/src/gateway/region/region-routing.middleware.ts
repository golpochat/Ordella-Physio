import { Injectable, NestMiddleware } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { gatewayConfig, REGION_HEADER, TARGET_REGION_HEADER } from "@ordella/config";
import { firstValueFrom } from "rxjs";
import type { NextFunction, Request, Response } from "express";
import { PUBLIC_PATHS, SKIP_TENANT_PATHS, TENANT_HEADER, type GatewayUser } from "@/constants";
import { RegionRoutingService } from "@/gateway/region/region-routing.service";

type GatewayRequest = Request & { user?: GatewayUser };

@Injectable()
export class RegionRoutingMiddleware implements NestMiddleware {
  constructor(
    private readonly regionRoutingService: RegionRoutingService,
    private readonly httpService: HttpService,
  ) {}

  async use(request: GatewayRequest, response: Response, next: NextFunction): Promise<void> {
    if (!this.regionRoutingService.isRoutingEnabled()) {
      next();
      return;
    }

    const path = request.path;
    if (PUBLIC_PATHS.some((publicPath) => path.startsWith(publicPath))) {
      next();
      return;
    }

    if (SKIP_TENANT_PATHS.some((skipPath) => path.startsWith(skipPath))) {
      next();
      return;
    }

    const tenantId =
      request.user?.tenantId ??
      (typeof request.headers[TENANT_HEADER] === "string" ? request.headers[TENANT_HEADER] : undefined);

    if (!tenantId) {
      next();
      return;
    }

    const targetRegionHeader =
      typeof request.headers[TARGET_REGION_HEADER] === "string"
        ? request.headers[TARGET_REGION_HEADER]
        : undefined;

    if (this.regionRoutingService.shouldBypassRouting(request.user, targetRegionHeader)) {
      if (targetRegionHeader) {
        response.setHeader(REGION_HEADER, targetRegionHeader);
      }
      next();
      return;
    }

    const homeRegion = await this.regionRoutingService.resolveTenantHomeRegion(tenantId);
    const currentRegion = this.regionRoutingService.getCurrentRegion();

    if (!homeRegion || homeRegion === currentRegion) {
      response.setHeader(REGION_HEADER, currentRegion);
      next();
      return;
    }

    const remoteGateway = this.regionRoutingService.resolveRemoteGatewayUrl(homeRegion);
    if (!remoteGateway) {
      response.status(503).json({
        statusCode: 503,
        message: `Tenant home region ${homeRegion} is unavailable`,
        mode: "graceful-degradation",
      });
      return;
    }

    await this.forwardToRegion(request, response, remoteGateway, homeRegion);
  }

  private async forwardToRegion(
    request: GatewayRequest,
    response: Response,
    remoteGateway: string,
    homeRegion: string,
  ): Promise<void> {
    const config = gatewayConfig;
    const targetUrl = `${remoteGateway.replace(/\/$/, "")}${request.originalUrl}`;

    try {
      const upstream = await firstValueFrom(
        this.httpService.request<ArrayBuffer>({
          method: request.method,
          url: targetUrl,
          headers: this.buildForwardHeaders(request, homeRegion),
          data: this.resolveBody(request),
          params: request.query,
          responseType: "arraybuffer",
          validateStatus: () => true,
          timeout: config.gatewayTimeoutMs,
        }),
      );

      response.setHeader(REGION_HEADER, homeRegion);
      response.status(upstream.status);
      for (const [key, value] of Object.entries(upstream.headers)) {
        if (value === undefined || key.toLowerCase() === "transfer-encoding") {
          continue;
        }
        response.setHeader(key, value as string | string[]);
      }
      response.send(Buffer.from(upstream.data));
    } catch {
      response.status(503).json({
        statusCode: 503,
        message: "Cross-region routing failed",
        mode: "graceful-degradation",
      });
    }
  }

  private buildForwardHeaders(request: GatewayRequest, homeRegion: string): Record<string, string> {
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

    headers[REGION_HEADER] = homeRegion;
    return headers;
  }

  private resolveBody(request: GatewayRequest): unknown {
    const rawBody = (request as GatewayRequest & { rawBody?: Buffer }).rawBody;
    if (rawBody && rawBody.length > 0) {
      return rawBody;
    }
    return request.body;
  }
}
