import { Controller, Get } from "@nestjs/common";

@Controller("agents")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "ai-agents-service" };
  }
}
