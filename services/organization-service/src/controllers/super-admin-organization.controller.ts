import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import type { CreateOrganizationPayload } from "@/models/Organization";
import { OrganizationService } from "@/services/organization.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { OrganizationManageGuard } from "@/guards/organization-manage.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedOrganizationUser } from "@/utils/organization-helpers";

@Controller("super-admin/organizations")
export class SuperAdminOrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @UseGuards(JwtGuard, OrganizationManageGuard)
  create(
    @Body() payload: CreateOrganizationPayload,
    @CurrentUser() user: AuthenticatedOrganizationUser,
  ) {
    return this.organizationService.createOrganization(payload, user);
  }
}
