import { Controller, Get } from "@nestjs/common";

@Controller("flags")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "feature-flags-service" };
  }
}
