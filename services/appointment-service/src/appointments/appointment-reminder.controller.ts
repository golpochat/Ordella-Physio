import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TenantGuard } from "@ordella/security";
import { AppointmentReminderService } from "@/services/appointment-reminder.service";
import { JwtGuard } from "@/appointments/guards/jwt.guard";
import { AppointmentManageGuard } from "@/guards/appointment-manage.guard";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import { CurrentUser } from "@/guards/current-user.decorator";

@Controller("appointments/:appointmentId/reminders")
export class AppointmentReminderController {
  constructor(private readonly appointmentReminderService: AppointmentReminderService) {}

  @Get()
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  listReminders(
    @Param("appointmentId") appointmentId: string,
    @CurrentUser() user: AuthenticatedAppointmentUser,
  ) {
    return this.appointmentReminderService.listReminders(appointmentId, user);
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  createReminder(
    @Param("appointmentId") appointmentId: string,
    @Body() payload: unknown,
    @CurrentUser() user: AuthenticatedAppointmentUser,
  ) {
    return this.appointmentReminderService.createReminder(appointmentId, payload, user);
  }

  @Put(":reminderId")
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  updateReminder(
    @Param("appointmentId") appointmentId: string,
    @Param("reminderId") reminderId: string,
    @Body() payload: unknown,
    @CurrentUser() user: AuthenticatedAppointmentUser,
  ) {
    return this.appointmentReminderService.updateReminder(
      appointmentId,
      reminderId,
      payload,
      user,
    );
  }
}
