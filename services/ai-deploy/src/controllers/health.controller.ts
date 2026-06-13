import { Controller, Get } from "@nestjs/common";

@Controller("deploy")
export class HealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "ai-deploy-service" };
  }
}
