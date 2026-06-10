import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { gatewayConfig, ORDELLA_REGIONS } from "@ordella/config";
import { firstValueFrom } from "rxjs";
import { buildServiceMap } from "@/utils/service-map";

@Injectable()
export class GatewayService {
  private readonly startedAt = Date.now();

  constructor(private readonly httpService: HttpService) {}

  getHealth() {
    const config = gatewayConfig;

    return {
      status: "ok" as const,
      service: "api-gateway",
      uptime: Math.floor((Date.now() - this.startedAt) / 1000),
      timestamp: new Date().toISOString(),
      version: process.env.SERVICE_VERSION ?? "0.0.0",
      environment: config.nodeEnv,
      region: config.ordellaRegion,
      regionRoutingEnabled: config.regionRoutingEnabled,
    };
  }

  async getDownstreamHealth() {
    const config = gatewayConfig;
    const services = buildServiceMap();

    const checks = await Promise.all(
      services.map(async (service) => {
        const url = `${service.url}${service.healthPath}`;
        const started = Date.now();

        try {
          const response = await firstValueFrom(
            this.httpService.get(url, {
              timeout: config.gatewayTimeoutMs,
              validateStatus: () => true,
            }),
          );

          return {
            name: service.name,
            url: service.url,
            status: response.status >= 200 && response.status < 300 ? "up" : "degraded",
            statusCode: response.status,
            latencyMs: Date.now() - started,
          };
        } catch (error) {
          return {
            name: service.name,
            url: service.url,
            status: "down" as const,
            statusCode: 503,
            latencyMs: Date.now() - started,
            detail: error instanceof Error ? error.message : "Health check failed",
          };
        }
      }),
    );

    return {
      ...this.getHealth(),
      services: checks,
    };
  }

  async getRegionHealth() {
    const config = gatewayConfig;
    const started = Date.now();

    const infraChecks = await Promise.all([
      this.probeEndpoint("postgres", `${config.tenantServiceUrl}/tenants/health`),
      this.probeEndpoint("redis", `${config.messagingServiceUrl}/messaging/health`),
      this.probeEndpoint("nats", `${config.messagingServiceUrl}/messaging/health`),
      this.probeEndpoint("api-gateway", `http://127.0.0.1:${config.port}/health`),
      this.probeEndpoint("frontend", config.corsOrigin),
      this.probeEndpoint("ssl", config.corsOrigin),
    ]);

    const peerRegions = await Promise.all(
      Object.values(ORDELLA_REGIONS)
        .filter((region) => region.code !== config.ordellaRegion)
        .map(async (region) => {
          const endpoint = config.resolveRegionApiUrl(region.code);
          if (!endpoint) {
            return {
              region: region.code,
              status: "not-configured" as const,
            };
          }

          const probe = await this.probeEndpoint(region.code, `${endpoint}/health`);
          return {
            region: region.code,
            status: probe.status,
            latencyMs: probe.latencyMs,
          };
        }),
    );

    return {
      ...this.getHealth(),
      latencyMs: Date.now() - started,
      infrastructure: infraChecks,
      peerRegions,
      failoverMode: infraChecks.some((check) => check.status === "down") ? "degraded" : "normal",
    };
  }

  private async probeEndpoint(name: string, url?: string) {
    const started = Date.now();

    if (!url) {
      return {
        name,
        status: "not-configured" as const,
        latencyMs: 0,
      };
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          timeout: gatewayConfig.gatewayTimeoutMs,
          validateStatus: () => true,
        }),
      );

      return {
        name,
        status: response.status >= 200 && response.status < 300 ? ("up" as const) : ("degraded" as const),
        statusCode: response.status,
        latencyMs: Date.now() - started,
      };
    } catch (error) {
      return {
        name,
        status: "down" as const,
        statusCode: 503,
        latencyMs: Date.now() - started,
        detail: error instanceof Error ? error.message : "Health check failed",
      };
    }
  }
}
