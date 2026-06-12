import { Body, Controller, Post } from "@nestjs/common";
import { DeliveryService } from "@/services/delivery.service";
import { providerValidationError } from "@/utils/provider-errors";

@Controller("internal")
export class InternalDeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post("deliver")
  deliverInternal(@Body() body: Record<string, unknown>) {
    const tenantId = typeof body.tenantId === "string" ? body.tenantId.trim() : "";

    if (!tenantId) {
      throw providerValidationError([
        { field: "tenantId", message: "tenantId is required." },
      ]);
    }

    const { tenantId: _ignored, ...payload } = body;
    return this.deliveryService.sendNotification(payload, tenantId);
  }
}
