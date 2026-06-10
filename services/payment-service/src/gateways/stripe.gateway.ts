import { Injectable, Logger } from "@nestjs/common";

export type GatewayPaymentIntentResult = {
  providerPaymentId: string;
  clientSecret?: string;
  status: string;
};

export type GatewayConfirmResult = {
  status: string;
  providerPaymentId: string;
};

export type GatewayRefundResult = {
  providerRefundId: string;
  status: string;
};

@Injectable()
export class StripeGateway {
  private readonly logger = new Logger(StripeGateway.name);

  async createPaymentIntent(
    amount: number,
    currency: string,
    metadata: Record<string, string>,
  ): Promise<GatewayPaymentIntentResult> {
    this.logger.log(`[placeholder] Stripe createPaymentIntent ${amount} ${currency}`, metadata);
    return {
      providerPaymentId: `pi_stripe_${Date.now()}`,
      clientSecret: `cs_placeholder_${Date.now()}`,
      status: "requires_payment_method",
    };
  }

  async confirmPayment(providerPaymentId: string): Promise<GatewayConfirmResult> {
    this.logger.log(`[placeholder] Stripe confirmPayment ${providerPaymentId}`);
    return { status: "succeeded", providerPaymentId };
  }

  async refundPayment(providerPaymentId: string, amount: number): Promise<GatewayRefundResult> {
    this.logger.log(`[placeholder] Stripe refundPayment ${providerPaymentId} ${amount}`);
    return { providerRefundId: `re_stripe_${Date.now()}`, status: "succeeded" };
  }
}
