import { Module } from "@nestjs/common";
import { LocationsService } from "@/locations/locations.service";
import { LocationsRepository } from "@/locations/locations.repository";
import { LocationController } from "@/locations/location.controller";
import { InternalLocationController } from "@/locations/internal-location.controller";
import { LocationConfigController } from "@/location-config/location-config.controller";
import { LocationConfigService } from "@/location-config/location-config.service";
import { LocationConfigRepository } from "@/location-config/location-config.repository";
import { LocationManageGuard } from "@/locations/guards/location-manage.guard";
import { LocationUpdateManageGuard } from "@/locations/guards/location-update-manage.guard";
import { LocationModifyGuard } from "@/locations/guards/location-modify.guard";
import { EventsModule } from "@/events/events.module";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { JwtGuard } from "@/tenants/guards/jwt.guard";
import { TenantMatchGuard } from "@/tenants/guards/tenant-match.guard";

@Module({
  imports: [EventsModule],
  controllers: [LocationController, LocationConfigController, InternalLocationController],
  providers: [
    LocationsService,
    LocationsRepository,
    LocationConfigService,
    LocationConfigRepository,
    LocationManageGuard,
    LocationUpdateManageGuard,
    LocationModifyGuard,
    AppointmentServiceClient,
    JwtGuard,
    TenantMatchGuard,
  ],
  exports: [LocationsService, LocationsRepository, LocationConfigService],
})
export class LocationsModule {}