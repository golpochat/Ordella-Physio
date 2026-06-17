import { Controller, Get, Param } from "@nestjs/common";
import { BillingContextService } from "@/billing/billing-context.service";

@Controller("tenants/internal")
export class InternalBillingContextController {
  constructor(private readonly billingContextService: BillingContextService) {}

  @Get("billing-context/:tenantId")
  getBillingContext(@Param("tenantId") tenantId: string) {
    return this.billingContextService.getBillingContext(tenantId);
  }
}
