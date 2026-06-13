import { Controller, Get } from "@nestjs/common";

@Controller("drift")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "ai-monitoring-service" };
  }
}
