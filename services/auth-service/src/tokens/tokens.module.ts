import { Module } from "@nestjs/common";
import { TokensRepository } from "@/tokens/tokens.repository";
import { TokensService } from "@/tokens/tokens.service";

@Module({
  providers: [TokensRepository, TokensService],
  exports: [TokensService, TokensRepository],
})
export class TokensModule {}
