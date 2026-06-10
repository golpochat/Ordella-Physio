import { Module } from "@nestjs/common";
import { UsersRepository } from "@/users/users.repository";
import { UsersService } from "@/users/users.service";

@Module({
  providers: [UsersRepository, UsersService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
