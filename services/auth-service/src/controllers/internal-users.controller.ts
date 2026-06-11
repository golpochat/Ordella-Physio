import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { UsersRepository } from "@/users/users.repository";
import { sanitizeUser } from "@/utils/auth-helpers";

@Controller("auth/internal")
export class InternalUsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get("users/:userId")
  async getUserById(@Param("userId") userId: string) {
    const user = await this.usersRepository.findByIdGlobal(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return sanitizeUser(user);
  }
}
