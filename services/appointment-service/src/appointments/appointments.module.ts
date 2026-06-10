import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AppointmentsController } from "@/appointments/appointments.controller";
import { AppointmentsService } from "@/appointments/appointments.service";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { CreateAppointmentCommand } from "@/appointments/commands/create-appointment.command";
import { UpdateAppointmentCommand } from "@/appointments/commands/update-appointment.command";
import { RescheduleAppointmentCommand } from "@/appointments/commands/reschedule-appointment.command";
import { CancelAppointmentCommand } from "@/appointments/commands/cancel-appointment.command";
import { JwtStrategy } from "@/appointments/strategies/jwt.strategy";
import { JwtGuard } from "@/appointments/guards/jwt.guard";
import { AvailabilityModule } from "@/availability/availability.module";
import { BlockedSlotsModule } from "@/blocked-slots/blocked-slots.module";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    EventsModule,
    AvailabilityModule,
    BlockedSlotsModule,
  ],
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    AppointmentsRepository,
    CreateAppointmentCommand,
    UpdateAppointmentCommand,
    RescheduleAppointmentCommand,
    CancelAppointmentCommand,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [AppointmentsService, AppointmentsRepository],
})
export class AppointmentsModule {}
