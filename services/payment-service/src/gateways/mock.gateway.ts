import { Injectable, Logger } from "@nestjs/common";
import type {
  GatewayConfirmResult,
  GatewayPaymentIntentResult,
  GatewayRefundResult,
} from "@/gateways/stripe.gateway";

@Injectable()
export class MockGateway {
  private readonly logger = new Logger(MockGateway.name);

  async createPaymentIntent(
    amount: number,
    currency: string,
    metadata: Record<string, string>,
  ): Promise<GatewayPaymentIntentResult> {
    this.logger.log(`[mock] createPaymentIntent ${amount} ${currency}`, metadata);
    return {
      providerPaymentId: `pi_mock_${Date.now()}`,
      clientSecret: `cs_mock_${Date.now()}`,
      status: "requires_payment_method",
    };
  }

  async confirmPayment(providerPaymentId: string): Promise<GatewayConfirmResult> {
    this.logger.log(`[mock] confirmPayment ${providerPaymentId}`);
    return { status: "succeeded", providerPaymentId };
  }

  async refundPayment(providerPaymentId: string, amount: number): Promise<GatewayRefundResult> {
    this.logger.log(`[mock] refundPayment ${providerPaymentId} ${amount}`);
    return { providerRefundId: `re_mock_${Date.now()}`, status: "succeeded" };
  }
}
