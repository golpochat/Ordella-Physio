import { Controller, Get } from "@nestjs/common";

@Controller("pharmacy")
export class PharmacyHealthController {
  @Get("health")
  health() {
    return { status: "ok", service: "pharmacy-service" };
  }
}
