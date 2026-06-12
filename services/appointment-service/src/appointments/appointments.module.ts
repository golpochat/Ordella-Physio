import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AppointmentCalendarController } from "@/appointments/appointment-calendar.controller";
import { AppointmentReminderController } from "@/appointments/appointment-reminder.controller";
import { AppointmentsController } from "@/appointments/appointments.controller";
import { AppointmentsService } from "@/appointments/appointments.service";
import { AppointmentsRepository } from "@/appointments/appointments.repository";
import { AppointmentCreateService } from "@/services/appointment-create.service";
import { AppointmentUpdateService } from "@/services/appointment-update.service";
import { AppointmentListService } from "@/services/appointment-list.service";
import { AppointmentStatusService } from "@/services/appointment-status.service";
import { AppointmentCalendarService } from "@/services/appointment-calendar.service";
import { AppointmentReminderService } from "@/services/appointment-reminder.service";
import { AppointmentNotificationService } from "@/services/appointment-notification.service";
import { AppointmentMetricsService } from "@/services/appointment-metrics.service";
import { AppointmentReportService } from "@/services/appointment-report.service";
import { InternalAppointmentReportController } from "@/appointments/internal-appointment-report.controller";
import { AppointmentReminderRepository } from "@/repositories/appointment-reminder.repository";
import { AppointmentManageGuard } from "@/guards/appointment-manage.guard";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { SubscriptionBillingClient } from "@/integrations/subscription-billing.client";
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
  controllers: [
    AppointmentCalendarController,
    AppointmentReminderController,
    AppointmentsController,
    InternalAppointmentReportController,
  ],
  providers: [
    AppointmentsService,
    AppointmentsRepository,
    AppointmentCreateService,
    AppointmentUpdateService,
    AppointmentListService,
    AppointmentStatusService,
    AppointmentCalendarService,
    AppointmentReminderService,
    AppointmentNotificationService,
    AppointmentMetricsService,
    AppointmentReportService,
    AppointmentReminderRepository,
    AppointmentManageGuard,
    PatientServiceClient,
    StaffServiceClient,
    TenantServiceClient,
    AuditLogClient,
    SubscriptionBillingClient,
    UpdateAppointmentCommand,
    RescheduleAppointmentCommand,
    CancelAppointmentCommand,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [AppointmentsService, AppointmentsRepository],
})
export class AppointmentsModule {}
