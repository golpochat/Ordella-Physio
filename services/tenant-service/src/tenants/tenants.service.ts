import { Injectable } from "@nestjs/common";
import { CreateTenantCommand } from "@/tenants/commands/create-tenant.command";
import { UpdateTenantCommand } from "@/tenants/commands/update-tenant.command";
import { AddLocationCommand } from "@/tenants/commands/add-location.command";
import { UpdateLocationCommand } from "@/tenants/commands/update-location.command";
import { AddStaffCommand } from "@/tenants/commands/add-staff.command";
import { UpdateStaffRoleCommand } from "@/tenants/commands/update-staff-role.command";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { LocationsService } from "@/locations/locations.service";
import { StaffService } from "@/staff/staff.service";
import { BrandingService } from "@/branding/branding.service";
import { SubscriptionService } from "@/subscription/subscription.service";
import type { CreateTenantDto } from "@/tenants/dto/create-tenant.dto";
import type { UpdateTenantDto } from "@/tenants/dto/update-tenant.dto";
import type { CreateLocationDto } from "@/tenants/dto/create-location.dto";
import type { UpdateLocationDto } from "@/tenants/dto/update-location.dto";
import type { CreateStaffDto } from "@/tenants/dto/create-staff.dto";
import type { UpdateStaffRoleDto } from "@/tenants/dto/update-staff-role.dto";
import type { UpdateBrandingDto } from "@/branding/dto/update-branding.dto";
import type { UpdatePlanDto } from "@/subscription/dto/update-plan.dto";
import { toTenantResponse } from "@/tenants/tenants.mapper";

@Injectable()
export class TenantsService {
  constructor(
    private readonly createTenantCommand: CreateTenantCommand,
    private readonly updateTenantCommand: UpdateTenantCommand,
    private readonly addLocationCommand: AddLocationCommand,
    private readonly updateLocationCommand: UpdateLocationCommand,
    private readonly addStaffCommand: AddStaffCommand,
    private readonly updateStaffRoleCommand: UpdateStaffRoleCommand,
    private readonly tenantsRepository: TenantsRepository,
    private readonly locationsService: LocationsService,
    private readonly staffService: StaffService,
    private readonly brandingService: BrandingService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  create(dto: CreateTenantDto, correlationId?: string) {
    return this.createTenantCommand.execute({ dto, correlationId });
  }

  findAll(params?: { page?: number; limit?: number }) {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 20;
    return this.tenantsRepository
      .findMany({ skip: (page - 1) * limit, take: limit })
      .then((tenants) => tenants.map(toTenantResponse));
  }

  findById(tenantId: string) {
    return this.tenantsRepository.findById(tenantId).then((tenant) => {
      if (!tenant) {
        return null;
      }

      return toTenantResponse(tenant);
    });
  }

  async getHomeRegion(tenantId: string) {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      return null;
    }

    return {
      tenantId: tenant.id,
      homeRegion: tenant.homeRegion,
    };
  }

  update(tenantId: string, dto: UpdateTenantDto, correlationId?: string) {
    return this.updateTenantCommand.execute({ tenantId, dto, correlationId });
  }

  activate(tenantId: string) {
    return this.tenantsRepository.setActiveState(tenantId, true).then(toTenantResponse);
  }

  deactivate(tenantId: string) {
    return this.tenantsRepository.setActiveState(tenantId, false).then(toTenantResponse);
  }

  addLocation(tenantId: string, dto: CreateLocationDto, correlationId?: string) {
    return this.addLocationCommand.execute({ tenantId, dto, correlationId });
  }

  listLocations(tenantId: string) {
    return this.locationsService.listLocations(tenantId);
  }

  updateLocation(tenantId: string, locationId: string, dto: UpdateLocationDto) {
    return this.updateLocationCommand.execute({ tenantId, locationId, dto });
  }

  archiveLocation(tenantId: string, locationId: string) {
    return this.locationsService.archiveLocation(tenantId, locationId);
  }

  addStaff(tenantId: string, dto: CreateStaffDto, actorRole: string, correlationId?: string) {
    return this.addStaffCommand.execute({ tenantId, dto, actorRole, correlationId });
  }

  listStaff(tenantId: string) {
    return this.staffService.listStaff(tenantId);
  }

  updateStaffRole(tenantId: string, staffId: string, dto: UpdateStaffRoleDto, actorRole: string) {
    return this.updateStaffRoleCommand.execute({ tenantId, staffId, dto, actorRole });
  }

  removeStaff(tenantId: string, staffId: string, actorRole: string) {
    return this.staffService.removeStaff(tenantId, staffId, actorRole);
  }

  getBranding(tenantId: string) {
    return this.brandingService.getBranding(tenantId);
  }

  updateBranding(tenantId: string, dto: UpdateBrandingDto) {
    return this.brandingService.updateBranding(tenantId, dto);
  }

  getSubscription(tenantId: string) {
    return this.subscriptionService.getPlan(tenantId);
  }

  updateSubscription(tenantId: string, dto: UpdatePlanDto, correlationId?: string) {
    return this.subscriptionService.updatePlan(tenantId, dto, correlationId);
  }
}
