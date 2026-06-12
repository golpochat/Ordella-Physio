import { Controller, Get } from "@nestjs/common";

@Controller("platform")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "ai-service" };
  }
}
