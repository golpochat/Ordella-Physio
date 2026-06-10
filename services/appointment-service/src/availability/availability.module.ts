import { Module } from "@nestjs/common";
import { AvailabilityService } from "@/availability/availability.service";
import { AvailabilityRepository } from "@/availability/availability.repository";
import { CreateAvailabilityCommand } from "@/availability/commands/create-availability.command";
import { UpdateAvailabilityCommand } from "@/availability/commands/update-availability.command";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [EventsModule],
  providers: [
    AvailabilityService,
    AvailabilityRepository,
    CreateAvailabilityCommand,
    UpdateAvailabilityCommand,
  ],
  exports: [AvailabilityService, AvailabilityRepository],
})
export class AvailabilityModule {}
