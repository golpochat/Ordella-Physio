import { Injectable } from "@nestjs/common";
import { PaymentAggregate, amountMustMatchInvoiceTotal, invoiceMustExist, paymentRules } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreatePaymentIntentDto } from "@/payment-intents/dto/create-payment-intent.dto";
import { PaymentIntentsRepository } from "@/payment-intents/payment-intents.repository";
import { PaymentEventPublisher } from "@/events/payment-event.publisher";
import { MockGateway } from "@/gateways/mock.gateway";
import { StripeGateway } from "@/gateways/stripe.gateway";
import { DEFAULT_CURRENCY } from "@/constants";
import { resolvePaymentGateway, validateInvoicePlaceholder } from "@/utils/payment-helpers";
import { toPaymentIntentResponse } from "@/payment-intents/payment-intents.mapper";

export type CreatePaymentIntentCommandInput = {
  tenantId: string;
  dto: CreatePaymentIntentDto;
  correlationId?: string;
};

@Injectable()
export class CreatePaymentIntentCommand {
  constructor(
    private readonly paymentIntentsRepository: PaymentIntentsRepository,
    private readonly eventPublisher: PaymentEventPublisher,
    private readonly stripeGateway: StripeGateway,
    private readonly mockGateway: MockGateway,
  ) {}

  async execute(input: CreatePaymentIntentCommandInput) {
    const invoice = await validateInvoicePlaceholder(input.dto.invoiceId);
    const existsCheck = invoiceMustExist(invoice.exists);
    if (existsCheck.isFailure) {
      throw new Error(String(existsCheck.error));
    }

    const paidCheck = paymentRules.invoiceCannotBePaidTwice(invoice.status);
    if (paidCheck.isFailure) {
      throw new Error(String(paidCheck.error));
    }

    const amount = input.dto.amount ?? invoice.total;
    const currency = input.dto.currency ?? invoice.currency ?? DEFAULT_CURRENCY;

    const amountCheck = amountMustMatchInvoiceTotal(amount, invoice.total || amount);
    if (amountCheck.isFailure && invoice.total > 0) {
      throw new Error(String(amountCheck.error));
    }

    const paymentIntentId = randomString(24);
    const provider = resolvePaymentGateway() === "stripe" ? "STRIPE" : "MOCK";

    const aggregateResult = PaymentAggregate.create({
      id: paymentIntentId,
      tenantId: input.tenantId,
      invoiceId: input.dto.invoiceId,
      patientId: input.dto.patientId,
      amount,
      currency,
      provider,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const gateway = provider === "STRIPE" ? this.stripeGateway : this.mockGateway;
    const gatewayResult = await gateway.createPaymentIntent(amount, currency, {
      invoiceId: input.dto.invoiceId,
      tenantId: input.tenantId,
    });

    const intent = await this.paymentIntentsRepository.create(input.tenantId, {
      id: paymentIntentId,
      invoiceId: input.dto.invoiceId,
      patientId: input.dto.patientId,
      amount,
      currency,
      status: "REQUIRES_PAYMENT_METHOD",
      provider: provider as "STRIPE" | "MOCK",
      providerPaymentId: gatewayResult.providerPaymentId,
    });

    await this.eventPublisher.publishPaymentIntentCreated(
      {
        tenantId: input.tenantId,
        paymentIntentId: intent.id,
        invoiceId: intent.invoiceId,
        patientId: intent.patientId,
        amount,
        currency: intent.currency,
        provider: intent.provider,
        status: intent.status,
        createdAt: intent.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return toPaymentIntentResponse(intent);
  }
}
