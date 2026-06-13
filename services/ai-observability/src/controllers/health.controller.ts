import { Controller, Get } from "@nestjs/common";

@Controller("observability")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "ai-observability-service" };
  }
}
