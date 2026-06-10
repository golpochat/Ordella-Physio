import { Module } from "@nestjs/common";
import { LocationsService } from "@/locations/locations.service";
import { LocationsRepository } from "@/locations/locations.repository";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [EventsModule],
  providers: [LocationsService, LocationsRepository],
  exports: [LocationsService, LocationsRepository],
})
export class LocationsModule {}
