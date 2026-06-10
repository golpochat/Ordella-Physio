import { Injectable } from "@nestjs/common";
import { taxRateMustBelongToTenant } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateTaxRateDto } from "@/tax-rates/dto/create-tax-rate.dto";
import type { UpdateTaxRateDto } from "@/tax-rates/dto/update-tax-rate.dto";
import { TaxRatesRepository } from "@/tax-rates/tax-rates.repository";
import { BillingEventPublisher } from "@/events/billing-event.publisher";

@Injectable()
export class TaxRatesService {
  constructor(
    private readonly taxRatesRepository: TaxRatesRepository,
    private readonly eventPublisher: BillingEventPublisher,
  ) {}

  async create(tenantId: string, dto: CreateTaxRateDto, correlationId?: string) {
    const taxRate = await this.taxRatesRepository.create(tenantId, {
      id: randomString(24),
      name: dto.name,
      percentage: dto.percentage,
      taxType: dto.taxType,
    });

    await this.eventPublisher.publishTaxRateCreated(
      {
        tenantId,
        taxRateId: taxRate.id,
        name: taxRate.name,
        percentage: Number(taxRate.percentage),
        taxType: taxRate.taxType,
        createdAt: taxRate.createdAt.toISOString(),
      },
      correlationId,
    );

    return taxRate;
  }

  list(tenantId: string) {
    return this.taxRatesRepository.list(tenantId);
  }

  findById(tenantId: string, taxRateId: string) {
    return this.taxRatesRepository.findById(tenantId, taxRateId);
  }

  async update(
    tenantId: string,
    taxRateId: string,
    dto: UpdateTaxRateDto,
    correlationId?: string,
  ) {
    const existing = await this.taxRatesRepository.findById(tenantId, taxRateId);
    if (!existing) {
      throw new Error("Tax rate not found");
    }

    const tenantCheck = taxRateMustBelongToTenant(existing.tenantId, tenantId);
    if (tenantCheck.isFailure) {
      throw new Error(String(tenantCheck.error));
    }

    const taxRate = await this.taxRatesRepository.update(tenantId, taxRateId, {
      name: dto.name,
      percentage: dto.percentage,
      taxType: dto.taxType,
    });

    await this.eventPublisher.publishTaxRateUpdated(
      {
        tenantId,
        taxRateId: taxRate.id,
        changes: dto as Record<string, unknown>,
        updatedAt: taxRate.updatedAt.toISOString(),
      },
      correlationId,
    );

    return taxRate;
  }
}
