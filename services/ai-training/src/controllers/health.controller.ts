import { Controller, Get } from "@nestjs/common";

@Controller("training")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "ai-training-service" };
  }
}
