import { Injectable } from "@nestjs/common";
import { discountMustBelongToTenant } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreateDiscountDto } from "@/discounts/dto/create-discount.dto";
import type { UpdateDiscountDto } from "@/discounts/dto/update-discount.dto";
import { DiscountsRepository } from "@/discounts/discounts.repository";

@Injectable()
export class DiscountsService {
  constructor(private readonly discountsRepository: DiscountsRepository) {}

  async create(tenantId: string, dto: CreateDiscountDto) {
    return this.discountsRepository.create(tenantId, {
      id: randomString(24),
      name: dto.name,
      type: dto.type,
      value: dto.value,
    });
  }

  list(tenantId: string) {
    return this.discountsRepository.list(tenantId);
  }

  findById(tenantId: string, discountId: string) {
    return this.discountsRepository.findById(tenantId, discountId);
  }

  async update(tenantId: string, discountId: string, dto: UpdateDiscountDto) {
    const existing = await this.discountsRepository.findById(tenantId, discountId);
    if (!existing) {
      throw new Error("Discount not found");
    }

    const tenantCheck = discountMustBelongToTenant(existing.tenantId, tenantId);
    if (tenantCheck.isFailure) {
      throw new Error(String(tenantCheck.error));
    }

    return this.discountsRepository.update(tenantId, discountId, {
      name: dto.name,
      type: dto.type,
      value: dto.value,
      isActive: dto.isActive,
    });
  }
}
