import { Injectable } from "@nestjs/common";
import { randomBytes } from "node:crypto";

type CreatePosPaymentIntentInput = {
  tenantId: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
};

type PaymentIntentResponse = {
  id: string;
  stripeIntentId?: string;
  status: string;
  clientSecret?: string;
};

@Injectable()
export class PaymentServiceClient {
  private readonly baseUrl = process.env.PAYMENT_SERVICE_URL?.replace(/\/$/, "");

  async createPaymentIntent(
    input: CreatePosPaymentIntentInput,
    authHeader?: string,
  ): Promise<PaymentIntentResponse> {
    if (!this.baseUrl) {
      return {
        id: `mock_pi_${randomBytes(8).toString("hex")}`,
        stripeIntentId: `pi_mock_${randomBytes(6).toString("hex")}`,
        status: "REQUIRES_PAYMENT_METHOD",
        clientSecret: `mock_secret_${randomBytes(8).toString("hex")}`,
      };
    }

    const response = await fetch(`${this.baseUrl}/payments/intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
        "x-tenant-id": input.tenantId,
      },
      body: JSON.stringify({
        invoiceId: input.metadata?.sessionId ?? "pos-walk-in",
        patientId: input.metadata?.patientId ?? "pos-walk-in",
        amount: input.amount,
        currency: input.currency ?? "usd",
      }),
    });

    if (!response.ok) {
      throw new Error(`Payment service error: ${response.status}`);
    }

    const body = (await response.json()) as PaymentIntentResponse;
    return body;
  }
}
