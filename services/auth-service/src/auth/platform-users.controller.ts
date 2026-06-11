import { Controller, ForbiddenException, Get, Query, UseGuards } from "@nestjs/common";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { UsersRepository } from "@/users/users.repository";
import { CurrentUser, type AuthenticatedRequestUser, sanitizeUser } from "@/utils/auth-helpers";

@Controller("auth")
export class PlatformUsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get("users")
  @UseGuards(JwtGuard)
  async listUsers(
    @CurrentUser() user: AuthenticatedRequestUser,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    if (user.role !== "SYSTEM") {
      throw new ForbiddenException("Insufficient role");
    }
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 100;
    const safePage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const safeLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 200) : 100;

    const users = await this.usersRepository.findMany({
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    });

    return users.map((user) => sanitizeUser(user));
  }
}
