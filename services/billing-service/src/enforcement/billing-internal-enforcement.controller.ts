import { Body, Controller, Post } from "@nestjs/common";
import { BillingEnforcementService } from "@/enforcement/billing-enforcement.service";

@Controller("billing/internal")
export class BillingInternalEnforcementController {
  constructor(private readonly enforcementService: BillingEnforcementService) {}

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
    return this.enforcementService.recordUsage(
      String(body.tenantId ?? ""),
      String(body.metric ?? ""),
      Number(body.quantity ?? 1),
    );
  }
}
