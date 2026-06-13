import { Controller, Get } from "@nestjs/common";

@Controller("gateway")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "ai-gateway-service" };
  }
}
