import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  createTemplateSchema,
  updateTemplateSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { TemplatesService } from "@/templates/templates.service";
import { JwtGuard } from "@/notifications/guards/jwt.guard";
import { TenantId } from "@/notifications/guards/tenant-id.decorator";
import type { CreateTemplateDto } from "@/templates/dto/create-template.dto";
import type { UpdateTemplateDto } from "@/templates/dto/update-template.dto";

@Controller("communication/templates")
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  @UseZodValidation(createTemplateSchema)
  create(@TenantId() tenantId: string, @Body() dto: CreateTemplateDto) {
    return this.templatesService.create(tenantId, dto);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  list(@TenantId() tenantId: string) {
    return this.templatesService.list(tenantId);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  findById(@TenantId() tenantId: string, @Param("id") id: string) {
    return this.templatesService.findById(tenantId, id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  @UseZodValidation(updateTemplateSchema)
  update(@TenantId() tenantId: string, @Param("id") id: string, @Body() dto: UpdateTemplateDto) {
    return this.templatesService.update(tenantId, id, dto);
  }

  @Post(":id/preview")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions("communication.send")
  preview(
    @TenantId() tenantId: string,
    @Param("id") id: string,
    @Body() variables?: Record<string, unknown>,
  ) {
    return this.templatesService.preview(tenantId, id, variables);
  }
}
