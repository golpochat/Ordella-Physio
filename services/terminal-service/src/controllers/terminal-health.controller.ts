import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";

@Controller("terminals")
export class TerminalHealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "terminal-service" };
  }

  @Get("ready")
  async readiness() {
    try {
      await this.database.$queryRaw`SELECT 1`;
      return { status: "ready", service: "terminal-service" };
    } catch {
      throw new ServiceUnavailableException({
        status: "not_ready",
        service: "terminal-service",
      });
    }
  }
}
