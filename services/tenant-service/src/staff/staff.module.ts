import { Module } from "@nestjs/common";
import { StaffService } from "@/staff/staff.service";
import { StaffRepository } from "@/staff/staff.repository";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [EventsModule],
  providers: [StaffService, StaffRepository],
  exports: [StaffService, StaffRepository],
})
export class StaffModule {}
