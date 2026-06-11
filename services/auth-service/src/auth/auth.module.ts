import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SecurityGuardsModule } from "@ordella/security";
import { AuthController } from "@/auth/auth.controller";
import { PasswordController } from "@/controllers/password.controller";
import { VerificationController } from "@/controllers/verification.controller";
import { MfaController } from "@/controllers/mfa.controller";
import { TokenController } from "@/controllers/token.controller";
import { AuditController } from "@/controllers/audit.controller";
import { InternalUsersController } from "@/controllers/internal-users.controller";
import { UserController } from "@/controllers/user.controller";
import { UserManagementService } from "@/services/user.service";
import { PlatformSettingsController } from "@/auth/platform-settings.controller";
import { PlatformSettingsService } from "@/auth/platform-settings.service";
import { AuthService } from "@/auth/auth.service";
import { LoginCommand } from "@/auth/commands/login.command";
import { RegisterCommand } from "@/auth/commands/register.command";
import { RefreshTokenCommand } from "@/auth/commands/refresh-token.command";
import { JwtStrategy } from "@/auth/strategies/jwt.strategy";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { PermissionEnforcementGuard } from "@/auth/guards/permission-enforcement.guard";
import { RoleEnforcementGuard } from "@/auth/guards/role-enforcement.guard";
import { RefreshGuard } from "@/auth/guards/refresh.guard";
import { UsersModule } from "@/users/users.module";
import { TokensModule } from "@/tokens/tokens.module";
import { EmailModule } from "@/email/email.module";
import { EventsModule } from "@/events/events.module";
import { PasswordService } from "@/services/password.service";
import { VerificationService } from "@/services/verification.service";
import { MfaService } from "@/services/mfa.service";
import { TokenBuilder } from "@/utils/token-builder";
import { AuditModule } from "@/audit/audit.module";

@Module({
  imports: [
    SecurityGuardsModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    UsersModule,
    TokensModule,
    AuditModule,
    EmailModule,
    EventsModule,
  ],
  controllers: [
    AuthController,
    TokenController,
    PasswordController,
    VerificationController,
    MfaController,
    AuditController,
    InternalUsersController,
    PlatformSettingsController,
    UserController,
  ],
  providers: [
    UserManagementService,
    PlatformSettingsService,
    AuthService,
    PasswordService,
    VerificationService,
    MfaService,
    LoginCommand,
    RegisterCommand,
    RefreshTokenCommand,
    JwtStrategy,
    JwtGuard,
    RefreshGuard,
    RoleEnforcementGuard,
    PermissionEnforcementGuard,
    TokenBuilder,
  ],
  exports: [AuthService],
})
export class AuthModule {}
