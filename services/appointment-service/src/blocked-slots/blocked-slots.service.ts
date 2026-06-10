import { Injectable } from "@nestjs/common";
import { BlockedSlotsRepository } from "@/blocked-slots/blocked-slots.repository";
import type { CreateBlockedSlotDto } from "@/blocked-slots/dto/create-blocked-slot.dto";
import type { UpdateBlockedSlotDto } from "@/blocked-slots/dto/update-blocked-slot.dto";

@Injectable()
export class BlockedSlotsService {
  constructor(private readonly blockedSlotsRepository: BlockedSlotsRepository) {}

  async create(tenantId: string, dto: CreateBlockedSlotDto) {
    const blockedSlot = await this.blockedSlotsRepository.create(tenantId, {
      therapistId: dto.therapistId,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      reason: dto.reason,
    });

    return {
      id: blockedSlot.id,
      tenantId: blockedSlot.tenantId,
      therapistId: blockedSlot.therapistId,
      startTime: blockedSlot.startTime.toISOString(),
      endTime: blockedSlot.endTime.toISOString(),
      reason: blockedSlot.reason,
      createdAt: blockedSlot.createdAt.toISOString(),
      updatedAt: blockedSlot.updatedAt.toISOString(),
    };
  }

  listByTherapist(tenantId: string, therapistId: string) {
    return this.blockedSlotsRepository.findByTherapist(tenantId, therapistId);
  }

  async update(tenantId: string, blockedSlotId: string, dto: UpdateBlockedSlotDto) {
    const blockedSlot = await this.blockedSlotsRepository.update(tenantId, blockedSlotId, {
      startTime: dto.startTime ? new Date(dto.startTime) : undefined,
      endTime: dto.endTime ? new Date(dto.endTime) : undefined,
      reason: dto.reason,
    });

    return {
      id: blockedSlot.id,
      tenantId: blockedSlot.tenantId,
      therapistId: blockedSlot.therapistId,
      startTime: blockedSlot.startTime.toISOString(),
      endTime: blockedSlot.endTime.toISOString(),
      reason: blockedSlot.reason,
      updatedAt: blockedSlot.updatedAt.toISOString(),
    };
  }
}
