import { Controller, Get } from "@nestjs/common";

@Controller("security")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "ai-security-service" };
  }
}
