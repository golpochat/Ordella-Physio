import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SecurityGuardsModule } from "@ordella/security";
import { AuthController } from "@/auth/auth.controller";
import { PlatformSettingsController } from "@/auth/platform-settings.controller";
import { PlatformSettingsService } from "@/auth/platform-settings.service";
import { PlatformUsersController } from "@/auth/platform-users.controller";
import { AuthService } from "@/auth/auth.service";
import { LoginCommand } from "@/auth/commands/login.command";
import { RegisterCommand } from "@/auth/commands/register.command";
import { RefreshTokenCommand } from "@/auth/commands/refresh-token.command";
import { JwtStrategy } from "@/auth/strategies/jwt.strategy";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { RefreshGuard } from "@/auth/guards/refresh.guard";
import { UsersModule } from "@/users/users.module";
import { TokensModule } from "@/tokens/tokens.module";
import { EmailModule } from "@/email/email.module";
import { EventsModule } from "@/events/events.module";
import { TokenBuilder } from "@/utils/token-builder";

@Module({
  imports: [
    SecurityGuardsModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    UsersModule,
    TokensModule,
    EmailModule,
    EventsModule,
  ],
  controllers: [AuthController, PlatformUsersController, PlatformSettingsController],
  providers: [
    PlatformSettingsService,
    AuthService,
    LoginCommand,
    RegisterCommand,
    RefreshTokenCommand,
    JwtStrategy,
    JwtGuard,
    RefreshGuard,
    TokenBuilder,
  ],
  exports: [AuthService],
})
export class AuthModule {}
