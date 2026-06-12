import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { TenantGuard } from "@ordella/security";
import { AppointmentCalendarService } from "@/services/appointment-calendar.service";
import { JwtGuard } from "@/appointments/guards/jwt.guard";
import { AppointmentManageGuard } from "@/guards/appointment-manage.guard";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import { CurrentUser } from "@/guards/current-user.decorator";

@Controller("appointments")
export class AppointmentCalendarController {
  constructor(private readonly appointmentCalendarService: AppointmentCalendarService) {}

  @Get("calendar")
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  getCalendarEvents(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedAppointmentUser,
  ) {
    return this.appointmentCalendarService.getCalendarEvents(query, user);
  }
}
