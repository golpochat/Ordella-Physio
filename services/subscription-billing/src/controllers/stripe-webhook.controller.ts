import { Controller, Headers, Post, Req } from "@nestjs/common";
import type { Request } from "express";
import { StripeWebhookService } from "@/services/stripe-webhook.service";
import { StripeService } from "@/services/stripe.service";
import { stripeError } from "@/utils/subscription-errors";

@Controller("stripe")
export class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly stripeWebhookService: StripeWebhookService,
  ) {}

  @Post("webhook")
  async handleWebhook(
    @Req() request: Request & { rawBody?: Buffer },
    @Headers("stripe-signature") signature?: string,
  ) {
    const rawBody = request.rawBody ?? Buffer.from(JSON.stringify(request.body ?? {}));

    try {
      const event = this.stripeService.constructWebhookEvent(
        rawBody,
        signature ?? "dev-signature",
      );
      return this.stripeWebhookService.handleEvent(event);
    } catch (error) {
      throw stripeError(
        error instanceof Error ? error.message : "Webhook processing failed.",
      );
    }
  }
}
