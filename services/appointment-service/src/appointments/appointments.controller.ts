import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  cancelAppointmentSchema,
  createAppointmentSchema,
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
import { TenantId } from "@/appointments/guards/tenant-id.decorator";
import type { CreateAppointmentDto } from "@/appointments/dto/create-appointment.dto";
import type { UpdateAppointmentDto } from "@/appointments/dto/update-appointment.dto";
import type { RescheduleAppointmentDto } from "@/appointments/dto/reschedule-appointment.dto";
import type { CancelAppointmentDto } from "@/appointments/dto/cancel-appointment.dto";
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
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.write")
  @UseZodValidation(createAppointmentSchema)
  create(
    @TenantId() tenantId: string,
    @Body() dto: CreateAppointmentDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.appointmentsService.create(tenantId, dto, request.correlationId);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.read")
  @UseZodValidation(listAppointmentsSchema, "query")
  list(@TenantId() tenantId: string, @Query() query: ListAppointmentsDto) {
    return this.appointmentsService.list(tenantId, query);
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

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.read")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.appointmentsService.findById(tenantId, id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.write")
  @UseZodValidation(updateAppointmentSchema)
  update(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: UpdateAppointmentDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.appointmentsService.update(tenantId, id, dto, request.correlationId);
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
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("appointment.write")
  @UseZodValidation(cancelAppointmentSchema)
  cancel(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() dto: CancelAppointmentDto,
    @Req() request: OrdellaRequest,
  ) {
    return this.appointmentsService.cancel(tenantId, id, dto, request.correlationId);
  }
}
