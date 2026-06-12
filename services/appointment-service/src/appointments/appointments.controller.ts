import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  createAvailabilitySchema,
  createBlockedSlotSchema,
  listAppointmentsSchema,
  rescheduleAppointmentSchema,
  updateAppointmentSchema,
  updateAvailabilitySchema,
  updateBlockedSlotSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { AppointmentsService } from "@/appointments/appointments.service";
import { JwtGuard } from "@/appointments/guards/jwt.guard";
import { AppointmentManageGuard } from "@/guards/appointment-manage.guard";
import { TenantId } from "@/appointments/guards/tenant-id.decorator";
import type { AuthenticatedAppointmentUser } from "@/appointments/strategies/jwt.strategy";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { UpdateAppointmentDto } from "@/appointments/dto/update-appointment.dto";
import type { RescheduleAppointmentDto } from "@/appointments/dto/reschedule-appointment.dto";
import type { ListAppointmentsDto } from "@/appointments/dto/list-appointments.dto";
import type { CreateAvailabilityDto } from "@/availability/dto/create-availability.dto";
import type { UpdateAvailabilityDto } from "@/availability/dto/update-availability.dto";
import type { CreateBlockedSlotDto } from "@/blocked-slots/dto/create-blocked-slot.dto";
import type { UpdateBlockedSlotDto } from "@/blocked-slots/dto/update-blocked-slot.dto";

@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "appointment-service" };
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  create(
    @TenantId() tenantId: string,
    @Body() payload: unknown,
    @CurrentUser() user: AuthenticatedAppointmentUser,
  ) {
    return this.appointmentsService.create(tenantId, payload, user);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  list(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedAppointmentUser,
  ) {
    return this.appointmentsService.listAppointments(query, user);
  }

  @Get("calendar/:therapistId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.read")
  getCalendar(@TenantId() tenantId: string, @Param("therapistId") therapistId: string) {
    return this.appointmentsService.getTherapistCalendar(tenantId, therapistId);
  }

  @Post("availability")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.write")
  @UseZodValidation(createAvailabilitySchema)
  createAvailability(
    @TenantId() tenantId: string,
    @Body() dto: CreateAvailabilityDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.appointmentsService.createAvailability(tenantId, dto, request.correlationId);
  }

  @Get("availability/:therapistId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.read")
  listAvailability(@TenantId() tenantId: string, @Param("therapistId") therapistId: string) {
    return this.appointmentsService.listAvailability(tenantId, therapistId);
  }

  @Patch("availability/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.write")
  @UseZodValidation(updateAvailabilitySchema)
  updateAvailability(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateAvailabilityDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.appointmentsService.updateAvailability(tenantId, id, dto, request.correlationId);
  }

  @Post("blocked-slots")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.write")
  @UseZodValidation(createBlockedSlotSchema)
  createBlockedSlot(@TenantId() tenantId: string, @Body() dto: CreateBlockedSlotDto) {
    return this.appointmentsService.createBlockedSlot(tenantId, dto);
  }

  @Get("blocked-slots/:therapistId")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.read")
  listBlockedSlots(@TenantId() tenantId: string, @Param("therapistId") therapistId: string) {
    return this.appointmentsService.listBlockedSlots(tenantId, therapistId);
  }

  @Patch("blocked-slots/:id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.write")
  @UseZodValidation(updateBlockedSlotSchema)
  updateBlockedSlot(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateBlockedSlotDto,
  ) {
    return this.appointmentsService.updateBlockedSlot(tenantId, id, dto);
  }

  @Get("internal/metrics")
  getAppointmentMetrics(
    @Query("tenantId") tenantId: string,
    @Query("start") start: string,
    @Query("end") end: string,
  ) {
    return this.appointmentsService.getAppointmentMetrics(tenantId, start, end);
  }

  @Get("internal/locations/:locationId/has-active")
  hasActiveAppointmentsByLocation(
    @Query("tenantId") tenantId: string,
    @Param("locationId") locationId: string,
  ) {
    return this.appointmentsService.hasActiveAppointmentsForLocation(tenantId, locationId);
  }

  @Get("internal/staff/:staffId/has-active")
  hasActiveAppointmentsByStaff(
    @Query("tenantId") tenantId: string,
    @Param("staffId") staffId: string,
  ) {
    return this.appointmentsService.hasActiveAppointmentsForStaff(tenantId, staffId);
  }

  @Get("internal/patients/:patientId/has-active")
  hasActiveAppointmentsByPatient(
    @Query("tenantId") tenantId: string,
    @Param("patientId") patientId: string,
  ) {
    return this.appointmentsService.hasActiveAppointmentsForPatient(tenantId, patientId);
  }

  @Get("internal/patients/:patientId/history")
  getPatientAppointmentHistory(
    @Query("tenantId") tenantId: string,
    @Param("patientId") patientId: string,
    @Query("limit") limit?: string,
  ) {
    return this.appointmentsService.getPatientAppointmentHistory(
      tenantId,
      patientId,
      limit ? Number(limit) : 10,
    );
  }

  @Get("internal/:appointmentId")
  async getAppointmentInternal(
    @Query("tenantId") tenantId: string,
    @Param("appointmentId") appointmentId: string,
  ) {
    const appointment = await this.appointmentsService.getAppointmentInternal(
      tenantId,
      appointmentId,
    );

    if (!appointment) {
      throw new NotFoundException();
    }

    return appointment;
  }

  @Get(":id/ai-context")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("ai.use")
  async getAiContext(@TenantId() tenantId: string, @Param("id") id: string) {
    const context = await this.appointmentsService.getAiContext(tenantId, id);
    if (!context) {
      throw new NotFoundException();
    }
    return context;
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.appointmentsService.findById(tenantId, id);
  }

  @Put(":id")
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() payload: unknown,
    @CurrentUser() user: AuthenticatedAppointmentUser,
  ) {
    return this.appointmentsService.update(tenantId, id, payload, user);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.write")
  @UseZodValidation(updateAppointmentSchema)
  patch(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateAppointmentDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.appointmentsService.patch(tenantId, id, dto, request.correlationId);
  }

  @Post(":id/reschedule")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.write")
  @UseZodValidation(rescheduleAppointmentSchema)
  reschedule(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: RescheduleAppointmentDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.appointmentsService.reschedule(tenantId, id, dto, request.correlationId);
  }

  @Post(":id/cancel")
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  cancel(@Param("id") id: string, @CurrentUser() user: AuthenticatedAppointmentUser) {
    return this.appointmentsService.cancelAppointment(id, user);
  }

  @Post(":id/complete")
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  complete(@Param("id") id: string, @CurrentUser() user: AuthenticatedAppointmentUser) {
    return this.appointmentsService.completeAppointment(id, user);
  }

  @Post(":id/no-show")
  @UseGuards(JwtGuard, TenantGuard, AppointmentManageGuard)
  markNoShow(@Param("id") id: string, @CurrentUser() user: AuthenticatedAppointmentUser) {
    return this.appointmentsService.markNoShow(id, user);
  }
}
