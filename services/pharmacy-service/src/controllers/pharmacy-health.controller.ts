import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";

@Controller("pharmacy")
export class PharmacyHealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "pharmacy-service" };
  }

  @Get("ready")
  async readiness() {
    try {
      await this.database.$queryRaw`SELECT 1`;
      return { status: "ready", service: "pharmacy-service" };
    } catch {
      throw new ServiceUnavailableException({
        status: "not_ready",
        service: "pharmacy-service",
      });
    }
  }
}
