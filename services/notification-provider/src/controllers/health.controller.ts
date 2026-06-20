import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";

@Controller()
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "notification-provider-service" };
  }

  @Get("ready")
  async readiness() {
    try {
      await this.database.$queryRaw`SELECT 1`;
      return { status: "ready", service: "notification-provider-service" };
    } catch {
      throw new ServiceUnavailableException({
        status: "not_ready",
        service: "notification-provider-service",
      });
    }
  }
}
