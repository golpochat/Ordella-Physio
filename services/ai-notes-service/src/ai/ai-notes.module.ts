import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AiNotesController } from "@/ai/ai-notes.controller";
import { AiNotesRepository } from "@/ai/ai-notes.repository";
import { AiNotesService } from "@/ai/ai-notes.service";
import { ContextGathererService } from "@/ai/context/context-gatherer.service";
import { AiTenantGuard } from "@/ai/guards/ai-tenant.guard";
import { JwtGuard } from "@/ai/guards/jwt.guard";
import { AiProviderService } from "@/ai/providers/ai-provider.service";
import { JwtStrategy } from "@/ai/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [AiNotesController],
  providers: [
    AiNotesService,
    AiNotesRepository,
    ContextGathererService,
    AiProviderService,
    JwtStrategy,
    JwtGuard,
    AiTenantGuard,
  ],
})
export class AiNotesModule {}
