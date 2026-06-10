import { Controller, Headers, Post, Req, BadRequestException } from "@nestjs/common";
import type { Request } from "express";
import { StripeClient } from "@/stripe/stripe.client";
import { StripeBillingService } from "@/stripe/stripe-billing.service";

@Controller("billing")
export class StripeWebhookController {
  constructor(
    private readonly stripeClient: StripeClient,
    private readonly stripeBillingService: StripeBillingService,
  ) {}

  @Post("webhook")
  async handleWebhook(
    @Req() request: Request & { rawBody?: Buffer },
    @Headers("stripe-signature") signature?: string,
  ) {
    if (!signature) {
      throw new BadRequestException("Missing stripe-signature header");
    }

    const rawBody = request.rawBody ?? Buffer.from(JSON.stringify(request.body));
    const stripe = this.stripeClient.getClient();

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        this.stripeClient.getWebhookSecret(),
      );
    } catch (error) {
      throw new BadRequestException(
        `Webhook signature verification failed: ${error instanceof Error ? error.message : "invalid"}`,
      );
    }

    return this.stripeBillingService.handleWebhookEvent(event);
  }
}
