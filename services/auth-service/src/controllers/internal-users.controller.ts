import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { UsersRepository } from "@/users/users.repository";
import { InternalOwnerService } from "@/services/internal-owner.service";
import { sanitizeUser } from "@/utils/auth-helpers";

@Controller("auth/internal")
export class InternalUsersController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly internalOwnerService: InternalOwnerService,
  ) {}

  @Get("users/:userId")
  async getUserById(@Param("userId") userId: string) {
    const user = await this.usersRepository.findByIdGlobal(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return sanitizeUser(user);
  }

  @Get("users/by-email/:email")
  async getUserByEmail(@Param("email") email: string) {
    const user = await this.internalOwnerService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  @Post("users/invited-owner")
  createInvitedOwner(@Body() body: { tenantId?: string; email?: string }) {
    const tenantId = body.tenantId?.trim() ?? "";
    const email = body.email?.trim() ?? "";

    if (!tenantId || !email) {
      throw new NotFoundException("tenantId and email are required.");
    }

    return this.internalOwnerService.createInvitedOwner({ tenantId, email });
  }

  @Patch("users/:userId/assign-tenant")
  assignUserToTenant(
    @Param("userId") userId: string,
    @Body() body: { tenantId?: string; role?: "OWNER" },
  ) {
    const tenantId = body.tenantId?.trim() ?? "";
    if (!tenantId) {
      throw new NotFoundException("tenantId is required.");
    }

    return this.internalOwnerService.assignUserToTenant({
      userId,
      tenantId,
      role: body.role ?? "OWNER",
    });
  }

  @Delete("users/:userId/provisioning-rollback")
  rollbackProvisionedUser(
    @Param("userId") userId: string,
    @Query("invitedOnly") invitedOnly?: string,
  ) {
    return this.internalOwnerService.rollbackProvisionedUser(userId, {
      invitedOnly: invitedOnly !== "false",
    });
  }

  @Patch("users/:userId/revert-tenant")
  revertUserTenant(
    @Param("userId") userId: string,
    @Body() body: { tenantId?: string },
  ) {
    const tenantId = body.tenantId?.trim() ?? "";
    if (!tenantId) {
      throw new NotFoundException("tenantId is required.");
    }

    return this.internalOwnerService.revertUserTenantAssignment(userId, tenantId);
  }
}
