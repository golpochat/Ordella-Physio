import { Body, Controller, Post } from "@nestjs/common";
import { EnforcementService } from "@/services/enforcement.service";
import { UsageService } from "@/services/usage.service";

@Controller("internal")
export class InternalEnforcementController {
  constructor(
    private readonly enforcementService: EnforcementService,
    private readonly usageService: UsageService,
  ) {}

  @Post("enforce")
  enforce(@Body() body: Record<string, unknown>) {
    return this.enforcementService.enforce({
      tenantId: String(body.tenantId ?? ""),
      action: String(body.action ?? ""),
      featureKey: body.featureKey ? String(body.featureKey) : undefined,
      quantity: body.quantity !== undefined ? Number(body.quantity) : undefined,
    });
  }

  @Post("usage")
  recordUsage(@Body() body: Record<string, unknown>) {
    return this.usageService.recordUsage(
      String(body.tenantId ?? ""),
      String(body.metric ?? ""),
      Number(body.quantity ?? 1),
    );
  }
}
