import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import type { Request, Response } from "express";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { loadStorageConfig } from "@/config/storage.config";
import { FileStorageService } from "@/services/file-storage.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedFileUser } from "@/utils/file-user";
import type { UploadFilePayload } from "@/validators/file.types";

@Controller("files")
export class FileController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "file-storage-service" };
  }

  @Get("access")
  async accessByToken(@Query("token") token: string | undefined, @Res() response: Response) {
    if (!token) {
      response.status(400).json({ success: false, error: { message: "token is required." } });
      return;
    }

    await this.fileStorageService.streamFileBySignedToken(token, response);
  }

  @Post()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_UPLOAD)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: loadStorageConfig().maxFileBytes },
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Req() request: Request,
    @CurrentUser() user: AuthenticatedFileUser,
  ) {
    const body = request.body as UploadFilePayload;
    const uploadFile = file
      ? {
          buffer: file.buffer,
          mimetype: file.mimetype,
          size: file.size,
          originalname: file.originalname,
        }
      : undefined;

    return this.fileStorageService.uploadFile(body, uploadFile, user);
  }

  @Get()
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_VIEW)
  listFiles(
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedFileUser,
  ) {
    return this.fileStorageService.listFiles(query, user);
  }

  @Delete(":id/hard")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_DELETE_HARD)
  hardDelete(@Param("id") id: string, @CurrentUser() user: AuthenticatedFileUser) {
    return this.fileStorageService.hardDeleteFile(id, user);
  }

  @Post(":id/thumbnail")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_GENERATE_THUMBNAIL)
  generateThumbnail(@Param("id") id: string, @CurrentUser() user: AuthenticatedFileUser) {
    return this.fileStorageService.generateThumbnails(id, user);
  }

  @Get(":id/versions")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_VIEW)
  getVersions(@Param("id") id: string, @CurrentUser() user: AuthenticatedFileUser) {
    return this.fileStorageService.getFileVersions(id, user);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_DELETE)
  softDelete(@Param("id") id: string, @CurrentUser() user: AuthenticatedFileUser) {
    return this.fileStorageService.softDeleteFile(id, user);
  }

  @Get(":id/access-url")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_VIEW)
  getAccessUrl(
    @Param("id") id: string,
    @Query() query: Record<string, string | string[] | undefined>,
    @CurrentUser() user: AuthenticatedFileUser,
  ) {
    return this.fileStorageService.getFileAccessUrl(id, query, user);
  }

  @Get(":id")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_VIEW)
  getMetadata(@Param("id") id: string, @CurrentUser() user: AuthenticatedFileUser) {
    return this.fileStorageService.getFileMetadata(id, user);
  }
}
