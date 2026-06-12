import { Injectable, Logger } from "@nestjs/common";

export type InvoicePaidNotification = {
  tenantId: string;
  invoiceId: string;
  invoiceNumber: string;
  patientId: string;
  total: number;
  currency: string;
  paymentReference?: string | null;
  paidAt: string;
};

@Injectable()
export class PaymentServiceClient {
  private readonly logger = new Logger(PaymentServiceClient.name);

  private get baseUrl(): string {
    return process.env.PAYMENT_SERVICE_URL ?? "http://payment-service:3057";
  }

  /**
   * Hook point for PaymentService integration.
   * Publishes invoice payment metadata when payment-service webhook support is wired.
   */
  async notifyInvoicePaid(payload: InvoicePaidNotification): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/internal/invoice-paid`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        this.logger.warn(
          `Payment service invoice-paid hook returned HTTP ${response.status} for invoice ${payload.invoiceId}`,
        );
      }
    } catch (error) {
      this.logger.warn(
        `Payment service invoice-paid hook unavailable for invoice ${payload.invoiceId}`,
        error,
      );
    }
  }
}
