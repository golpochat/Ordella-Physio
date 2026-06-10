import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { gatewayConfig } from "@ordella/config";
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
}
