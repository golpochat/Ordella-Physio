import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { TenantGuard as SecurityTenantGuard } from "@ordella/security";

import { JwtGuard } from "@/auth/guards/jwt.guard";
import { PermissionEnforcementGuard, RequireAuthPermission } from "@/auth/guards/permission-enforcement.guard";
import { CurrentUser, type AuthenticatedRequestUser } from "@/utils/auth-helpers";
import { MAX_AVATAR_BYTES } from "@/utils/fileUpload";
import { UserManagementService } from "@/services/user.service";

@Controller("auth/users")
@UseGuards(JwtGuard, SecurityTenantGuard)
export class UserController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Get("me")
  getMyProfile(@CurrentUser() user: AuthenticatedRequestUser) {
    return this.userManagementService.getMyProfile(user.userId, user.tenantId);
  }

  @Put("me")
  selfUpdate(@Body() payload: unknown, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.userManagementService.selfUpdate(user.userId, user.tenantId, payload);
  }

  @Post("me/avatar")
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: memoryStorage(),
      limits: { fileSize: MAX_AVATAR_BYTES },
    }),
  )
  updateAvatar(
    @UploadedFile() file: Express.Multer.File | undefined,
    @CurrentUser() user: AuthenticatedRequestUser,
  ) {
    const uploadFile = file
      ? {
          buffer: file.buffer,
          mimetype: file.mimetype,
          size: file.size,
          originalname: file.originalname,
        }
      : undefined;

    return this.userManagementService.updateAvatar(user.userId, user.tenantId, uploadFile);
  }

  @Delete("me/avatar")
  removeAvatar(@CurrentUser() user: AuthenticatedRequestUser) {
    return this.userManagementService.removeAvatar(user.userId, user.tenantId);
  }

  @Post("change-password")
  changePassword(@Body() payload: unknown, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.userManagementService.changePassword(user.userId, user.tenantId, payload);
  }

  @Get()
  @UseGuards(PermissionEnforcementGuard)
  @RequireAuthPermission("user.manage")
  listUsers(@Query() query: Record<string, string | string[] | undefined>, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.userManagementService.listUsers(query, user);
  }

  @Post()
  @UseGuards(PermissionEnforcementGuard)
  @RequireAuthPermission("user.manage")
  createUser(@Body() payload: unknown, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.userManagementService.createUser(payload, user);
  }

  @Get(":id")
  @UseGuards(PermissionEnforcementGuard)
  @RequireAuthPermission("user.manage")
  getUser(@Param("id") id: string, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.userManagementService.getUser(id, user);
  }

  @Put(":id")
  @UseGuards(PermissionEnforcementGuard)
  @RequireAuthPermission("user.manage")
  updateUser(
    @Param("id") id: string,
    @Body() payload: unknown,
    @CurrentUser() user: AuthenticatedRequestUser,
  ) {
    return this.userManagementService.updateUser(id, payload, user);
  }

  @Post(":id/disable")
  @UseGuards(PermissionEnforcementGuard)
  @RequireAuthPermission("user.manage")
  disableUser(@Param("id") id: string, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.userManagementService.disableUser(id, user);
  }

  @Post(":id/activate")
  @UseGuards(PermissionEnforcementGuard)
  @RequireAuthPermission("user.manage")
  activateUser(@Param("id") id: string, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.userManagementService.activateUser(id, user);
  }

  @Post(":id/reset-password")
  @UseGuards(PermissionEnforcementGuard)
  @RequireAuthPermission("user.manage")
  adminResetPassword(
    @Param("id") id: string,
    @Body() payload: unknown,
    @CurrentUser() user: AuthenticatedRequestUser,
  ) {
    return this.userManagementService.adminResetPassword(id, payload, user);
  }

  @Post(":id/change-role")
  @UseGuards(PermissionEnforcementGuard)
  @RequireAuthPermission("user.manage")
  changeUserRole(
    @Param("id") id: string,
    @Body() payload: unknown,
    @CurrentUser() user: AuthenticatedRequestUser,
  ) {
    return this.userManagementService.changeUserRole(id, payload, user);
  }
}
