import { Controller, Get } from "@nestjs/common";

@Controller("cost")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "ai-cost-service" };
  }
}
