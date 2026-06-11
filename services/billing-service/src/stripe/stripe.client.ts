import { Injectable, Logger } from "@nestjs/common";
import { billingConfig } from "@ordella/config";
import Stripe from "stripe";

@Injectable()
export class StripeClient {
  private readonly logger = new Logger(StripeClient.name);
  private stripe: Stripe | null = null;

  getClient(): Stripe {
    if (!this.stripe) {
      const secretKey = billingConfig.stripeSecretKey ?? process.env.STRIPE_SECRET_KEY;
      if (!secretKey) {
        throw new Error("STRIPE_SECRET_KEY is not configured");
      }
      this.stripe = new Stripe(secretKey);
    }
    return this.stripe;
  }

  getPriceIdForPlan(plan: string): string {
    const map: Record<string, string | undefined> = {
      STARTER: billingConfig.stripePriceStarter ?? process.env.STRIPE_PRICE_STARTER,
      PROFESSIONAL: billingConfig.stripePricePro ?? process.env.STRIPE_PRICE_PRO,
      ENTERPRISE: billingConfig.stripePriceEnterprise ?? process.env.STRIPE_PRICE_ENTERPRISE,
    };
    const priceId = map[plan];
    if (!priceId) {
      throw new Error(`Stripe price ID not configured for plan: ${plan}`);
    }
    return priceId;
  }

  getWebhookSecret(): string {
    const secret = billingConfig.stripeWebhookSecret ?? process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }
    return secret;
  }

  getFrontendUrl(): string {
    return billingConfig.frontendUrl ?? process.env.FRONTEND_URL ?? "http://localhost:3010";
  }
}
