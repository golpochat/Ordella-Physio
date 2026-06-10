import { Injectable } from "@nestjs/common";
import { CreatePaymentIntentCommand } from "@/payment-intents/commands/create-payment-intent.command";
import { ConfirmPaymentCommand } from "@/payment-intents/commands/confirm-payment.command";
import { CancelPaymentIntentCommand } from "@/payment-intents/commands/cancel-payment-intent.command";
import { PaymentIntentsRepository } from "@/payment-intents/payment-intents.repository";
import type { CreatePaymentIntentDto } from "@/payment-intents/dto/create-payment-intent.dto";
import type { ConfirmPaymentDto } from "@/payment-intents/dto/confirm-payment.dto";
import type { CancelPaymentIntentDto } from "@/payment-intents/dto/cancel-payment-intent.dto";
import {
  toPaymentIntentListResponse,
  toPaymentIntentResponse,
} from "@/payment-intents/payment-intents.mapper";

@Injectable()
export class PaymentIntentsService {
  constructor(
    private readonly createPaymentIntentCommand: CreatePaymentIntentCommand,
    private readonly confirmPaymentCommand: ConfirmPaymentCommand,
    private readonly cancelPaymentIntentCommand: CancelPaymentIntentCommand,
    private readonly paymentIntentsRepository: PaymentIntentsRepository,
  ) {}

  create(tenantId: string, dto: CreatePaymentIntentDto, correlationId?: string) {
    return this.createPaymentIntentCommand.execute({ tenantId, dto, correlationId });
  }

  confirm(tenantId: string, dto: ConfirmPaymentDto, correlationId?: string) {
    return this.confirmPaymentCommand.execute({ tenantId, dto, correlationId });
  }

  cancel(
    tenantId: string,
    paymentIntentId: string,
    dto: CancelPaymentIntentDto,
    correlationId?: string,
  ) {
    return this.cancelPaymentIntentCommand.execute({
      tenantId,
      paymentIntentId,
      dto,
      correlationId,
    });
  }

  async findById(tenantId: string, paymentIntentId: string) {
    const intent = await this.paymentIntentsRepository.findById(tenantId, paymentIntentId);
    return intent ? toPaymentIntentResponse(intent) : null;
  }

  async list(tenantId: string, invoiceId?: string) {
    const intents = await this.paymentIntentsRepository.list(
      tenantId,
      invoiceId ? { invoiceId } : {},
    );
    return toPaymentIntentListResponse(intents);
  }
}
