import { Module } from "@nestjs/common";
import { BlockedSlotsService } from "@/blocked-slots/blocked-slots.service";
import { BlockedSlotsRepository } from "@/blocked-slots/blocked-slots.repository";

@Module({
  providers: [BlockedSlotsService, BlockedSlotsRepository],
  exports: [BlockedSlotsService, BlockedSlotsRepository],
})
export class BlockedSlotsModule {}
