import { Module } from "@nestjs/common";
import { AuditModule } from "@/audit/audit.module";
import { TokenService } from "@/services/token.service";
import { TokenBuilder } from "@/utils/token-builder";
import { TokensRepository } from "@/tokens/tokens.repository";
import { TokensService } from "@/tokens/tokens.service";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [UsersModule, AuditModule],
  providers: [TokensRepository, TokenBuilder, TokenService, TokensService],
  exports: [TokenService, TokensService, TokensRepository],
})
export class TokensModule {}
