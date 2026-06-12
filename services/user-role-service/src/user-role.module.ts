import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { InternalRoleController } from "@/controllers/internal-role.controller";
import { RoleController } from "@/controllers/role.controller";
import { RoleService } from "@/services/role.service";
import { RoleRepository } from "@/repositories/role.repository";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";
import { RoleManageGuard } from "@/guards/role-manage.guard";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [RoleController, InternalRoleController],
  providers: [RoleService, RoleRepository, JwtStrategy, JwtGuard, RoleManageGuard],
  exports: [RoleService],
})
export class UserRoleModule {}
