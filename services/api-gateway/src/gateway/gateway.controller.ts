import { Controller, Get, Header, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { getMetricsRegistry } from "@ordella/observability";
import { Public, SkipTenant } from "@/gateway/guards/public.decorator";
import { HealthCheckResponseDto } from "./dto/health-check.dto";
import { GatewayService } from "./gateway.service";

@ApiTags("health")
@Controller()
@Public()
@SkipTenant()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get("health")
  @ApiOkResponse({ type: HealthCheckResponseDto })
  health() {
    return this.gatewayService.getHealth();
  }

  @Get("health/services")
  serviceHealth() {
    return this.gatewayService.getDownstreamHealth();
  }

  @Get("health/region")
  regionHealth() {
    return this.gatewayService.getRegionHealth();
  }

  @Get("metrics")
  @Header("Content-Type", "text/plain; version=0.0.4; charset=utf-8")
  async metrics(@Res() response: Response) {
    const registry = getMetricsRegistry();
    response.send(await registry.registry.metrics());
  }
}
