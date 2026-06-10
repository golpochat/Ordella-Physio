import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  aiAcceptOutputSchema,
  aiGenerateNoteSchema,
  aiSummarizeNoteSchema,
  aiTreatmentPlanSchema,
  UseZodValidation,
} from "@ordella/validation";
import { PermissionGuard, RequirePermissions } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { AiNotesService } from "@/ai/ai-notes.service";
import { AiTenantGuard } from "@/ai/guards/ai-tenant.guard";
import { JwtGuard } from "@/ai/guards/jwt.guard";
import { TenantId } from "@/ai/guards/tenant-id.decorator";
import type { AuthenticatedAiUser } from "@/utils/ai-helpers";
import type {
  AiAcceptOutputInput,
  AiGenerateNoteInput,
  AiSummarizeNoteInput,
  AiTreatmentPlanInput,
} from "@ordella/validation";

@Controller("ai")
export class AiNotesController {
  constructor(private readonly aiNotesService: AiNotesService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "ai-notes-service" };
  }

  @Post("notes/generate")
  @UseGuards(JwtGuard, AiTenantGuard, PermissionGuard)
  @RequirePermissions("ai.notes.write")
  @UseZodValidation(aiGenerateNoteSchema)
  generate(
    @TenantId() tenantId: string,
    @Body() dto: AiGenerateNoteInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedAiUser;
    const authorization = request.headers.authorization;
    return this.aiNotesService.generateNote(
      tenantId,
      user,
      dto,
      typeof authorization === "string" ? authorization : undefined,
      request.correlationId,
    );
  }

  @Post("notes/summarize")
  @UseGuards(JwtGuard, AiTenantGuard, PermissionGuard)
  @RequirePermissions("ai.notes.write")
  @UseZodValidation(aiSummarizeNoteSchema)
  summarize(
    @TenantId() tenantId: string,
    @Body() dto: AiSummarizeNoteInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedAiUser;
    const authorization = request.headers.authorization;
    return this.aiNotesService.summarizeAppointment(
      tenantId,
      user,
      dto,
      typeof authorization === "string" ? authorization : undefined,
      request.correlationId,
    );
  }

  @Post("notes/treatment-plan")
  @UseGuards(JwtGuard, AiTenantGuard, PermissionGuard)
  @RequirePermissions("ai.notes.write")
  @UseZodValidation(aiTreatmentPlanSchema)
  treatmentPlan(
    @TenantId() tenantId: string,
    @Body() dto: AiTreatmentPlanInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedAiUser;
    const authorization = request.headers.authorization;
    return this.aiNotesService.suggestTreatmentPlan(
      tenantId,
      user,
      dto,
      typeof authorization === "string" ? authorization : undefined,
      request.correlationId,
    );
  }

  @Post("notes/transcribe")
  @UseGuards(JwtGuard, AiTenantGuard, PermissionGuard)
  @RequirePermissions("ai.notes.write")
  @UseInterceptors(FileInterceptor("audio"))
  async transcribe(
    @TenantId() tenantId: string,
    @Body() body: Record<string, string>,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Req() request: OrdellaRequest,
  ) {
    if (!file?.buffer?.length) {
      return { message: "Audio file is required" };
    }

    const dto = aiGenerateNoteSchema.parse({
      patientId: body.patientId,
      therapistId: body.therapistId,
      appointmentId: body.appointmentId || undefined,
      rawText: body.rawText || undefined,
    });

    const user = request.user as AuthenticatedAiUser;
    const authorization = request.headers.authorization;
    return this.aiNotesService.transcribeAndGenerate(
      tenantId,
      user,
      dto,
      file.buffer,
      file.originalname || "recording.webm",
      typeof authorization === "string" ? authorization : undefined,
      request.correlationId,
    );
  }

  @Post("notes/accept")
  @UseGuards(JwtGuard, AiTenantGuard, PermissionGuard)
  @RequirePermissions("ai.notes.write")
  @UseZodValidation(aiAcceptOutputSchema)
  acceptOutput(
    @TenantId() tenantId: string,
    @Body() dto: AiAcceptOutputInput,
    @Req() request: OrdellaRequest,
  ) {
    const user = request.user as AuthenticatedAiUser;
    return this.aiNotesService.recordAcceptance(tenantId, user, dto);
  }
}
