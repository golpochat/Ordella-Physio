import { Injectable } from "@nestjs/common";
import { CreateRefundCommand } from "@/refunds/commands/create-refund.command";
import { RefundsRepository } from "@/refunds/refunds.repository";
import type { CreateRefundDto } from "@/refunds/dto/create-refund.dto";

@Injectable()
export class RefundsService {
  constructor(
    private readonly createRefundCommand: CreateRefundCommand,
    private readonly refundsRepository: RefundsRepository,
  ) {}

  create(tenantId: string, dto: CreateRefundDto, correlationId?: string) {
    return this.createRefundCommand.execute({ tenantId, dto, correlationId });
  }

  findById(tenantId: string, refundId: string) {
    return this.refundsRepository.findById(tenantId, refundId);
  }

  listByPaymentIntent(tenantId: string, paymentIntentId: string) {
    return this.refundsRepository.listByPaymentIntent(tenantId, paymentIntentId);
  }
}
